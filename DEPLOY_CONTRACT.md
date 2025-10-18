# NFT 스마트 컨트랙트 배포 가이드

현재 NFT 민팅 기능을 완전히 작동시키려면 Base 네트워크에 NFT 컨트랙트를 배포해야 합니다.

## 옵션 1: 기존 Zora Protocol 사용 (추천)

Zora Protocol의 컨트랙트를 그대로 사용하면 별도 배포 없이 바로 작동합니다.

**장점:**
- 이미 감사된(audited) 컨트랙트
- 무료 민팅 가능
- 로열티 설정 가능

**단점:**
- 컨트랙트 커스터마이징 불가

## 옵션 2: 간단한 NFT 컨트랙트 직접 배포

### 2.1 컨트랙트 코드 (Solidity)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract QnoteNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    constructor() ERC721("Qnote Daily Question", "QNOTE") Ownable(msg.sender) {}

    function safeMint(address to, string memory uri) public {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter += 1;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
```

### 2.2 Remix를 통한 배포

1. [Remix IDE](https://remix.ethereum.org) 접속
2. 새 파일 생성: `QnoteNFT.sol`
3. 위 코드 복사-붙여넣기
4. Solidity 컴파일러 버전: `0.8.20` 선택
5. 컴파일
6. Deploy & Run Transactions 탭:
   - Environment: `Injected Provider - MetaMask`
   - 네트워크를 Base로 변경
   - Deploy 버튼 클릭
7. 배포된 컨트랙트 주소 복사

### 2.3 코드에 주소 업데이트

`nft-contract.js` 파일 수정:

```javascript
export const QNOTE_NFT_ADDRESS = '0x배포된_컨트랙트_주소';
```

## 옵션 3: Hardhat/Foundry로 배포

프로페셔널한 방법:

```bash
# Hardhat 설치
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# Hardhat 프로젝트 초기화
npx hardhat init

# 컨트랙트 작성 후 배포
npx hardhat run scripts/deploy.js --network base
```

## Base 네트워크 정보

**Base Mainnet:**
- Chain ID: 8453
- RPC URL: https://mainnet.base.org
- Block Explorer: https://basescan.org

**Base Sepolia Testnet (테스트용):**
- Chain ID: 84532
- RPC URL: https://sepolia.base.org
- Block Explorer: https://sepolia.basescan.org
- Faucet: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet

## 테스트 순서

1. **테스트넷에서 먼저 테스트**
   - Base Sepolia에 배포
   - 테스트 민팅
   - 모든 기능 확인

2. **메인넷 배포**
   - 충분한 ETH 확보 (가스비용)
   - Base 메인넷에 배포
   - 프로덕션 환경에서 테스트

## 비용 예상

- **컨트랙트 배포**: ~$5-10 (Base 메인넷)
- **NFT 민팅 (각)**: ~$0.01-0.05
- **총 초기 비용**: ~$10 내외

## 대안: MintClub 사용

MintClub을 사용하면 코드 없이 NFT를 발행할 수 있습니다:

1. [MintClub](https://mint.club) 방문
2. "Create Token" 선택
3. Base 네트워크 선택
4. NFT 설정 후 생성
5. 생성된 컨트랙트 주소를 코드에 추가

## 도움말

- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Base Network Docs](https://docs.base.org/)
- [Remix IDE](https://remix.ethereum.org/)
- [Hardhat](https://hardhat.org/)

---

궁금한 점이 있으시면 Discord나 GitHub Issues를 통해 문의해주세요!

