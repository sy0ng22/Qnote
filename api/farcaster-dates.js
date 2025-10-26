// Vercel Serverless Function: 서버 캐싱으로 API 호출 최소화
// 모든 사용자가 같은 캐시를 공유하므로 API 비용 절감

let cache = null;
let cacheTime = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10분

export default async function handler(req, res) {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fid } = req.query;

  if (!fid) {
    return res.status(400).json({ error: 'FID is required' });
  }

  const apiKey = process.env.VITE_NEYNAR_API_KEY;

  if (!apiKey) {
    console.error('VITE_NEYNAR_API_KEY not configured');
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const now = Date.now();
    const cacheKey = `fid:${fid}`;

    // 캐시 확인 (10분 이내면 캐시 사용)
    if (cache && cache[cacheKey] && (now - cacheTime) < CACHE_DURATION) {
      console.log(`📦 Cache hit for FID ${fid} (API call skipped)`);
      return res.status(200).json({
        dates: cache[cacheKey],
        cached: true,
        cacheAge: Math.floor((now - cacheTime) / 1000) // seconds
      });
    }

    console.log(`🌐 Cache miss for FID ${fid}, fetching from Neynar API...`);

    // Neynar API 호출
    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/feed/user/${fid}/casts?limit=50`,
      {
        headers: {
          'accept': 'application/json',
          'api_key': apiKey
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Neynar API error (${response.status}):`, errorText);
      
      if (response.status === 402) {
        return res.status(402).json({ 
          error: 'Neynar API limit exceeded. Please upgrade your plan or wait for the monthly reset.' 
        });
      }
      
      throw new Error(`Neynar API error: ${response.status}`);
    }

    const data = await response.json();
    const casts = data.casts || [];

    console.log(`✅ Fetched ${casts.length} casts from Neynar API`);

    // #DailyQuestion 캐스트 필터링 및 날짜 추출
    const dates = [];
    
    casts.forEach(cast => {
      const text = cast.text || '';
      
      // #DailyQuestion과 DQ:YYYY-MM-DD 패턴 확인
      if (text.includes('#DailyQuestion') || text.includes('DQ:')) {
        const dateMatch = text.match(/DQ:(\d{4}-\d{2}-\d{2})/);
        if (dateMatch) {
          const date = dateMatch[1];
          if (!dates.includes(date)) {
            dates.push(date);
          }
        }
      }
    });

    console.log(`📅 Found ${dates.length} unique Daily Question dates`);

    // 캐시 저장
    if (!cache) cache = {};
    cache[cacheKey] = dates;
    cacheTime = now;

    return res.status(200).json({
      dates,
      cached: false,
      cacheAge: 0
    });

  } catch (error) {
    console.error('Error in farcaster-dates function:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch Farcaster data',
      details: error.message 
    });
  }
}

