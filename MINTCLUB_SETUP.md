# MintClub NFT 민팅 설정 가이드

Qnote에서 MintClub을 사용하여 NFT를 발행하는 방법입니다.

## 🎯 MintClub이란?

MintClub은 **bonding curve** 기반으로 토큰과 NFT를 쉽게 생성할 수 있는 플랫폼입니다.
- Base 네트워크 지원
- Farcaster 생태계 친화적
- 간단한 API
- 저렴한 가스비

## ✅ 현재 구현 상태

### 완료된 것:
- ✅ Farcaster 지갑 연동
- ✅ IPFS 업로드 (NFT.Storage)
- ✅ MintClub 트랜잭션 생성 코드
- ✅ Base 네트워크 민팅
- ✅ 블록체인에 직접 발행 (다운로드 없음!)

### 필요한 것:
1. **NFT.Storage API 키** (무료)
2. **MintClub 컨트랙트 주소** (Base 네트워크)

## 🚀 설정 방법

### 1단계: NFT.Storage API 키 발급

```bash
# 1. https://nft.storage 방문
# 2. 무료 계정 생성
# 3. API Key 발급
# 4. .env 파일에 추가
```

`.env` 파일:
```env
VITE_NFT_STORAGE_API_KEY=your_nft_storage_api_key
```

### 2단계: MintClub 컨트랙트 주소 확인

MintClub의 Base 네트워크 컨트랙트 주소를 확인해야 합니다.

**방법 1: MintClub 공식 문서 확인**
- [MintClub Docs](https://docs.mint.club)
- Base 네트워크 컨트랙트 주소 찾기

**방법 2: MintClub에서 직접 생성**
- [MintClub 앱](https://mint.club) 방문
- "Create NFT" 선택
- Base 네트워크에 컬렉션 생성
- 생성된 주소를 사용

**방법 3: 직접 컨트랙트 배포**
- MintClub SDK 사용
- 자체 NFT 컨트랙트 배포

### 3단계: 코드에 주소 추가

`utils.js` 파일의 `mintNFTWithMintClub` 함수에서:

```javascript
// 현재:
const MINTCLUB_FACTORY = '0x...'; // MintClub Base 컨트랙트

// 실제 주소로 변경:
const MINTCLUB_FACTORY = '0x실제MintClub주소';
```

또는 환경 변수로:
```env
VITE_MINTCLUB_CONTRACT_ADDRESS=0x실제주소
```

## 🔍 MintClub 컨트랙트 주소 찾는 방법

### 방법 A: MintClub SDK 사용

```javascript
import { MintClubSDK } from '@mint.club/sdk';

const sdk = new MintClubSDK({
  chain: 'base'
});

// NFT 컨트랙트 주소 가져오기
const factoryAddress = sdk.nft.factoryAddress;
console.log(factoryAddress);
```

### 방법 B: BaseScan에서 확인

1. [BaseScan](https://basescan.org) 방문
2. "MintClub" 검색
3. 공식 컨트랙트 확인

### 방법 C: Farcaster 커뮤니티에 물어보기

Farcaster에서 MintClub 팀이나 개발자 커뮤니티에 물어보세요.

## 💻 테스트 방법

### 로컬 테스트:

```bash
# 1. 환경 변수 설정
# .env 파일에 NFT.Storage 키 추가

# 2. 서버 실행
npm run dev

# 3. Warpcast에서 앱 열기
# (Farcaster Frame으로 실행해야 함)

# 4. 질문 작성 후 "Mint as NFT" 클릭
```

### 예상 플로우:

```
1. "Mint as NFT" 버튼 클릭
   ↓
2. Farcaster 지갑 확인 중...
   ↓
3. IPFS에 업로드 중...
   ↓
4. ✓ IPFS 업로드 완료 (링크 표시)
   ↓
5. MintClub으로 민팅 중...
   ↓
6. Farcaster 지갑에서 트랜잭션 승인 요청
   ↓
7. 승인 후 트랜잭션 전송
   ↓
8. 🎉 NFT 발행 완료!
   ↓
9. BaseScan 링크로 확인 가능
```

## 📝 작동 원리

### 1. 이미지 → IPFS
```javascript
// html2canvas로 카드 이미지 생성
const imgUrl = canvas.toDataURL('image/png');

// NFT.Storage에 업로드
const ipfsUrl = await uploadToIPFS(imgUrl, metadata);
// 결과: https://ipfs.io/ipfs/Qm...
```

### 2. IPFS → MintClub
```javascript
// MintClub 컨트랙트 호출
const calldata = encodeFunctionData({
  functionName: 'createNFT',
  args: [name, symbol, ipfsUrl]
});

// Farcaster 지갑으로 트랜잭션 전송
const result = await sdk.actions.sendTransaction(txData);
```

### 3. 블록체인에 영구 저장
- IPFS: 이미지와 메타데이터 영구 보관
- Base: NFT 소유권 기록
- MintClub: bonding curve로 가치 생성

## ⚠️ 주의사항

1. **Farcaster Frame에서만 작동**
   - 일반 브라우저에서는 Farcaster 지갑 접근 불가
   - Warpcast 앱에서 열어야 함

2. **Base 네트워크 가스비**
   - 소량의 ETH 필요 (~$0.01-0.05)
   - Base 네트워크는 매우 저렴함

3. **IPFS 업로드**
   - NFT.Storage는 완전 무료
   - 영구 보관 보장

4. **트랜잭션 승인**
   - 사용자가 직접 승인해야 함
   - 자동으로 처리되지 않음

## 🐛 트러블슈팅

### "Farcaster wallet not connected"
→ Warpcast 앱에서 열어야 합니다

### "NFT.Storage API key is required"
→ `.env` 파일에 `VITE_NFT_STORAGE_API_KEY` 추가

### "IPFS upload failed"
→ API 키 확인 또는 이미지 크기 확인

### "Transaction failed"
→ Base 네트워크 ETH 잔액 확인

## 📚 참고 자료

- [MintClub 공식 사이트](https://mint.club)
- [MintClub Docs](https://docs.mint.club)
- [Base Network](https://base.org)
- [NFT.Storage](https://nft.storage)
- [Farcaster Docs](https://docs.farcaster.xyz)

## 🎉 완료!

이제 Qnote에서:
- ❌ Zora 외부 사이트 없음
- ❌ 이미지 다운로드 없음
- ✅ MintClub 직접 민팅
- ✅ Farcaster 지갑 사용
- ✅ 앱 내에서 모든 과정 완료!

**진짜 NFT가 블록체인에 영구히 저장됩니다!** 🚀

