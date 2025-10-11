import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

// LocalStorage 키 생성
export function getStorageKey(date) {
  return `dq:${date}`;
}

// 주간 키 생성
export function getWeekKey(date) {
  const week = dayjs(date).week();
  const year = dayjs(date).year();
  return `dq:week:${year}-${String(week).padStart(2, '0')}`;
}

// 데이터 저장
export function saveAnswer(date, data) {
  const key = getStorageKey(date);
  localStorage.setItem(key, JSON.stringify(data));
}

// 데이터 불러오기
export function loadAnswer(date) {
  const key = getStorageKey(date);
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// 이번 주 날짜 배열 가져오기 (월요일 시작)
export function getWeekDates() {
  const today = dayjs();
  
  // 이번 주 월요일 찾기
  const dayOfWeek = today.day(); // 0(일) ~ 6(토)
  const monday = dayOfWeek === 0 
    ? today.subtract(6, 'day') // 일요일이면 지난 월요일
    : today.subtract(dayOfWeek - 1, 'day'); // 아니면 이번 주 월요일
  
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = monday.add(i, 'day');
    dates.push({
      date: date.format('YYYY-MM-DD'),
      dayName: date.format('ddd'),
      dayNum: date.format('D'),
      isToday: date.isSame(today, 'day')
    });
  }
  
  return dates;
}

// 날짜 포맷팅
export function formatDate(dateString) {
  return dayjs(dateString).format('YYYY년 M월 D일');
}

export function formatDateShort(dateString) {
  return dayjs(dateString).format('M/D');
}

// FID 저장/불러오기
export function saveFID(fid) {
  localStorage.setItem('qnote:fid', fid);
}

export function loadFID() {
  return localStorage.getItem('qnote:fid') || '';
}

// Generate Farcaster share text
export function generateShareText(question, answer, date) {
  const appUrl = import.meta.env.VITE_APP_URL || 'https://qnote.app';
  return `Daily Question 🌿
${question}
→ ${answer}

#Qnote #DailyQuestion DQ:${date}
${appUrl}/card-view.html?date=${date}`;
}

// Neynar API 호출
export async function fetchUserCasts(fid) {
  const apiKey = import.meta.env.VITE_NEYNAR_API_KEY;
  
  if (!apiKey) {
    console.warn('Neynar API key not found');
    return [];
  }
  
  try {
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
      throw new Error('Failed to fetch casts');
    }
    
    const data = await response.json();
    return data.casts || [];
  } catch (error) {
    console.error('Error fetching casts:', error);
    return [];
  }
}

// 캐스트에서 Daily Question 데이터 추출
export function parseDailyCast(cast) {
  const text = cast.text || '';
  
  // #DailyQuestion과 DQ:YYYY-MM-DD 패턴 확인
  if (!text.includes('#DailyQuestion')) {
    return null;
  }
  
  const dateMatch = text.match(/DQ:(\d{4}-\d{2}-\d{2})/);
  if (!dateMatch) {
    return null;
  }
  
  const date = dateMatch[1];
  
  // 질문과 답변 추출 (기본 패턴)
  const lines = text.split('\n').filter(line => line.trim());
  let question = '';
  let answer = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('→')) {
      answer = line.split('→')[1].trim();
    } else if (!line.startsWith('#') && !line.includes('DQ:') && !line.includes('https://')) {
      if (!question) {
        question = line.replace('오늘의 질문', '').replace('🌿', '').trim();
      }
    }
  }
  
  // 이미지 URL 추출
  const imgUrl = cast.embeds && cast.embeds[0] ? cast.embeds[0].url : null;
  
  return {
    date,
    question,
    text: answer,
    imgUrl,
    castHash: cast.hash
  };
}

// 클립보드에 복사
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Clipboard copy failed:', error);
    return false;
  }
}

// 이미지 다운로드
export function downloadImage(dataUrl, filename) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

