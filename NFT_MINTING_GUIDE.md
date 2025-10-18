# NFT Minting Guide 🎭

Qnote에서 만든 일일 질문 카드를 NFT로 발행하는 방법을 안내합니다.

## 🚀 Quick Start

### Option 1: 자동 IPFS 업로드 (추천)

NFT.Storage API 키를 설정하면 이미지가 자동으로 IPFS에 업로드되고 Zora로 이동합니다.

**설정 방법:**

1. [NFT.Storage](https://nft.storage) 방문
2. 무료 계정 생성
3. API 키 발급
4. `.env` 파일에 추가:
   ```
   VITE_NFT_STORAGE_API_KEY=your_api_key_here
   ```

**사용법:**
1. 카드 페이지에서 "Mint as NFT on Zora" 버튼 클릭
2. 자동으로 IPFS에 업로드됨
3. Zora 페이지가 열리면 지갑 연결 후 민팅 완료

### Option 2: 수동 업로드 (API 키 불필요)

API 키가 없어도 NFT를 발행할 수 있습니다.

**사용법:**
1. 카드 페이지에서 "Mint as NFT on Zora" 버튼 클릭
2. 이미지가 자동으로 다운로드됨
3. Zora 페이지가 열리면:
   - 다운로드된 이미지 업로드
   - NFT 정보 입력
   - 지갑 연결 후 민팅 완료

## 🎨 NFT 메타데이터

자동 업로드 시 다음 정보가 NFT 메타데이터에 포함됩니다:

```json
{
  "name": "Qnote Daily Question - 2025-10-18",
  "description": "Daily Question: [질문 내용]\nAnswer: [답변 내용]",
  "image": "https://ipfs.io/ipfs/...",
  "attributes": [
    {
      "trait_type": "Date",
      "value": "2025-10-18"
    },
    {
      "trait_type": "Question",
      "value": "오늘의 질문"
    },
    {
      "trait_type": "Type",
      "value": "Daily Reflection"
    }
  ]
}
```

## 💰 비용 안내

- **IPFS 업로드**: 무료 (NFT.Storage 사용)
- **NFT 민팅**: 가스비 발생 (Base 네트워크 사용으로 저렴함)
- **Zora 수수료**: 무료 (민팅 시 가스비만 발생)

## 🔧 기술 스택

- **스토리지**: IPFS via NFT.Storage
- **블록체인**: Base (Ethereum L2)
- **민팅 플랫폼**: Zora
- **필요 도구**: Web3 지갑 (MetaMask, Coinbase Wallet 등)

## ❓ FAQ

### Q: NFT 발행에 비용이 드나요?
A: IPFS 업로드는 무료이며, 민팅 시 Base 네트워크의 가스비만 발생합니다 (보통 $0.01~0.10 정도).

### Q: 어떤 지갑을 사용할 수 있나요?
A: MetaMask, Coinbase Wallet, WalletConnect 등 대부분의 Web3 지갑을 사용할 수 있습니다.

### Q: Base 네트워크란?
A: Coinbase가 만든 Ethereum Layer 2 네트워크로, 빠르고 저렴한 거래가 가능합니다.

### Q: NFT를 민팅한 후 어떻게 되나요?
A: NFT는 당신의 지갑에 저장되며, OpenSea 등에서 거래하거나 Farcaster에서 공유할 수 있습니다.

### Q: API 키 없이도 민팅할 수 있나요?
A: 네, 이미지를 다운로드한 후 Zora에서 수동으로 업로드하여 민팅할 수 있습니다.

## 🔗 유용한 링크

- [NFT.Storage](https://nft.storage) - 무료 IPFS 스토리지
- [Zora](https://zora.co) - NFT 민팅 플랫폼
- [Base Network](https://base.org) - Ethereum L2 네트워크
- [MetaMask](https://metamask.io) - Web3 지갑

## 🎯 팁

1. **가스비 절약**: Base 네트워크는 Ethereum 메인넷보다 훨씬 저렴합니다
2. **IPFS 영구성**: NFT.Storage는 무료로 영구 스토리지를 제공합니다
3. **메타데이터 확인**: 민팅 전에 IPFS 링크를 클릭하여 이미지를 확인하세요
4. **지갑 준비**: 미리 Base 네트워크를 지갑에 추가하고 소량의 ETH를 준비하세요

---

Made with 🌿 by Qnote Team

