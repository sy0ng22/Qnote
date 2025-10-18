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

// Convert data URL to Blob
export function dataURLtoBlob(dataURL) {
  const parts = dataURL.split(',');
  const mime = parts[0].match(/:(.*?);/)[1];
  const bstr = atob(parts[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

// Upload image to IPFS using NFT.Storage (free)
export async function uploadToIPFS(imageDataUrl, metadata) {
  try {
    // NFT.Storage API 키 필요
    const apiKey = import.meta.env.VITE_NFT_STORAGE_API_KEY;
    
    if (!apiKey) {
      throw new Error('NFT.Storage API key not configured');
    }

    // 이미지를 Blob으로 변환
    const imageBlob = dataURLtoBlob(imageDataUrl);
    
    // NFT.Storage에 업로드
    const formData = new FormData();
    formData.append('file', imageBlob, 'card.png');
    
    const uploadResponse = await fetch('https://api.nft.storage/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: imageBlob
    });

    if (!uploadResponse.ok) {
      throw new Error('Failed to upload to IPFS');
    }

    const uploadData = await uploadResponse.json();
    const imageUrl = `https://ipfs.io/ipfs/${uploadData.value.cid}`;

    // 메타데이터 생성
    const nftMetadata = {
      name: metadata.name || 'Qnote Daily Question Card',
      description: metadata.description || `Daily Question: ${metadata.question}`,
      image: imageUrl,
      attributes: [
        {
          trait_type: 'Date',
          value: metadata.date
        },
        {
          trait_type: 'Question',
          value: metadata.question
        },
        {
          trait_type: 'Type',
          value: 'Daily Reflection'
        }
      ]
    };

    // 메타데이터도 IPFS에 업로드
    const metadataBlob = new Blob([JSON.stringify(nftMetadata)], { 
      type: 'application/json' 
    });
    
    const metadataResponse = await fetch('https://api.nft.storage/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: metadataBlob
    });

    if (!metadataResponse.ok) {
      throw new Error('Failed to upload metadata to IPFS');
    }

    const metadataData = await metadataResponse.json();
    const metadataUrl = `https://ipfs.io/ipfs/${metadataData.value.cid}`;

    return {
      imageUrl,
      metadataUrl,
      metadata: nftMetadata
    };
  } catch (error) {
    console.error('IPFS upload error:', error);
    throw error;
  }
}

// 이 함수는 더 이상 사용하지 않음 - MintClub으로 대체됨

// MintClub을 통한 NFT 직접 민팅 (Farcaster 지갑 사용)
export async function mintNFTWithMintClub(sdk, imageUrl, metadata) {
  try {
    // 1. Farcaster context 가져오기
    const context = await sdk.context;
    
    if (!context || !context.user) {
      throw new Error('Farcaster wallet not connected');
    }

    // 2. 사용자 지갑 주소
    const userAddress = context.user.verifiedAddresses?.[0] || context.user.custodyAddress;
    
    if (!userAddress) {
      throw new Error('Please connect a wallet in Farcaster settings');
    }

    // 3. MintClub SDK를 통한 NFT 민팅
    // MintClub은 bonding curve 기반으로 토큰/NFT를 생성
    const { encodeFunctionData } = await import('viem');
    
    // MintClub의 NFT 생성 컨트랙트 호출
    // Base 네트워크의 MintClub Factory
    const MINTCLUB_FACTORY = '0x...'; // MintClub Base 컨트랙트
    
    const calldata = encodeFunctionData({
      abi: [{
        name: 'createNFT',
        type: 'function',
        stateMutability: 'payable',
        inputs: [
          { name: 'name', type: 'string' },
          { name: 'symbol', type: 'string' },
          { name: 'tokenURI', type: 'string' }
        ],
        outputs: [{ name: 'nftAddress', type: 'address' }]
      }],
      functionName: 'createNFT',
      args: [
        metadata.name,
        'QNOTE',
        imageUrl // IPFS URL
      ]
    });

    // 4. Farcaster SDK로 트랜잭션 전송
    const txData = {
      chainId: 'eip155:8453', // Base network
      method: 'eth_sendTransaction',
      params: {
        to: MINTCLUB_FACTORY,
        value: '0',
        data: calldata
      }
    };

    const result = await sdk.actions.sendTransaction(txData);
    
    return {
      success: true,
      txHash: result.transactionHash,
      userAddress,
      network: 'Base'
    };
  } catch (error) {
    console.error('MintClub minting error:', error);
    throw error;
  }
}

// Warpcast에서 NFT 공유
export function shareNFTOnWarpcast(nftUrl, description) {
  const text = encodeURIComponent(`${description}\n\n🎨 Minted on Base with MintClub`);
  const embedUrl = encodeURIComponent(nftUrl);
  const composeUrl = `https://warpcast.com/~/compose?text=${text}&embeds[]=${embedUrl}`;
  window.open(composeUrl, '_blank');
}

