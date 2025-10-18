# Qnote NFT 발행 기능 사용법 🎭

## ✨ 완성된 기능

카드를 Farcaster 내에서 NFT로 발행할 수 있는 기능이 추가되었습니다!

## 🎯 작동 방식

### 1️⃣ 간단한 방법 (API 키 없이)

**별도 설정 없이 바로 사용 가능합니다!**

1. 카드 생성 페이지에서 "Mint as NFT on Zora" 버튼 클릭
2. 카드 이미지가 자동으로 다운로드됨
3. Zora 웹사이트가 새 탭으로 열림
4. Zora에서:
   - 다운로드된 이미지 업로드
   - NFT 이름과 설명 입력
   - MetaMask 등의 지갑 연결
   - 민팅 버튼 클릭 (Base 네트워크 사용)

### 2️⃣ 자동 업로드 방법 (API 키 사용 - 추천)

더 편리한 경험을 원하시면:

**설정:**
1. [NFT.Storage](https://nft.storage) 가입 (무료)
2. API 키 발급
3. 프로젝트 루트에 `.env` 파일 생성:
   ```
   VITE_NEYNAR_API_KEY=기존_키
   VITE_NFT_STORAGE_API_KEY=발급받은_NFT_Storage_키
   VITE_APP_URL=http://localhost:5173
   ```

**사용:**
1. "Mint as NFT on Zora" 버튼 클릭
2. 자동으로 IPFS에 업로드됨 (진행 상황 표시)
3. IPFS URL이 표시됨 (확인 가능)
4. Zora 페이지가 자동으로 열림
5. 지갑 연결 후 바로 민팅!

## 💡 주요 기능

- ✅ **이미지 자동 생성**: html2canvas로 카드를 이미지로 변환
- ✅ **IPFS 업로드**: NFT.Storage를 통한 영구 보관
- ✅ **메타데이터 생성**: 날짜, 질문, 답변이 포함된 메타데이터
- ✅ **Zora 통합**: Base 네트워크에서 저렴하게 민팅
- ✅ **사용자 친화적 UI**: 상태 메시지와 안내 포함

## 💰 비용

- **IPFS 업로드**: 무료 (NFT.Storage)
- **민팅 가스비**: 약 $0.01~0.10 (Base 네트워크 사용으로 저렴!)

## 🔧 기술 구현

### 추가된 파일/기능:

1. **utils.js** - NFT 관련 함수:
   - `dataURLtoBlob()` - 데이터 URL을 Blob으로 변환
   - `uploadToIPFS()` - NFT.Storage API를 통한 IPFS 업로드
   - `openZoraMintPage()` - Zora 페이지 열기
   
2. **card.html** - NFT 버튼 기능:
   - API 키 유무에 따른 자동/수동 모드 전환
   - 진행 상황 표시
   - 에러 처리 및 안내 메시지

3. **package.json** - 추가된 패키지:
   - `nft.storage`: IPFS 업로드
   - `viem`: Web3 유틸리티

## 📱 테스트 방법

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 localhost:5173 접속
# 1. Daily Question 작성
# 2. 카드 생성
# 3. "Mint as NFT on Zora" 버튼 클릭
# 4. 작동 확인!
```

## 🎨 UI 개선사항

- 버튼 텍스트가 진행 상황에 따라 변경됨
- 성공/에러 메시지를 명확하게 표시
- IPFS URL 링크 제공 (업로드 성공 시)
- NFT 민팅 가이드 정보 박스 추가

## 🔗 관련 링크

- [NFT.Storage](https://nft.storage) - 무료 IPFS 스토리지
- [Zora](https://zora.co/create) - NFT 민팅 플랫폼
- [Base Network](https://base.org) - 저렴한 L2 네트워크
- [MetaMask](https://metamask.io) - Web3 지갑

## 🚀 다음 단계

사용자가 원하시면 추가할 수 있는 기능들:

1. **직접 민팅**: 스마트 컨트랙트와 직접 통신
2. **컬렉션 생성**: 모든 일일 질문을 하나의 컬렉션으로
3. **가격 설정**: NFT에 가격을 붙여 판매
4. **에디션**: 여러 장 발행 가능하게
5. **Farcaster 프레임**: NFT를 직접 Farcaster에서 확인

## 📝 참고사항

- Base 네트워크를 지갑에 추가해야 합니다
- 가스비를 위한 소량의 ETH가 필요합니다 (Base 네트워크)
- NFT.Storage는 완전 무료이며 영구 보관을 보장합니다

---

궁금한 점이 있으시면 언제든지 물어보세요! 🌿

