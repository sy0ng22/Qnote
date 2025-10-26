# Vercel 환경변수 설정 가이드

## 🎯 Monthly 페이지에 Q 표시가 안 뜨는 이유

**Neynar API 키가 Vercel에 설정되지 않았기 때문입니다!**

---

## ✅ 해결 방법 (5분 소요)

### 1. Vercel 대시보드 접속
```
https://vercel.com
```
- 로그인
- 배포한 프로젝트 클릭 (base_vibe)

### 2. 환경변수 설정 페이지로 이동
```
상단 탭: Settings → 왼쪽 메뉴: Environment Variables
```

### 3. 새 환경변수 추가
**Add New** 버튼 클릭:

#### 필수 환경변수:

| Key | Value | Environments |
|-----|-------|--------------|
| `VITE_NEYNAR_API_KEY` | 네이나 API 키 | All 체크 ✓ |
| `VITE_APP_URL` | https://your-app.vercel.app | All 체크 ✓ |

#### 선택 환경변수 (NFT 민팅용):

| Key | Value | Environments |
|-----|-------|--------------|
| `VITE_NFT_STORAGE_API_KEY` | NFT.Storage API 키 | All 체크 ✓ |

### 4. 저장 및 재배포
- **Save** 버튼 클릭
- 자동으로 재배포 시작 (1-2분)
- **Deployments** 탭에서 진행 상황 확인

---

## 🔑 API 키 얻는 방법

### Neynar API 키:
1. https://neynar.com 접속
2. 로그인 (Farcaster 계정으로)
3. **Dashboard** → **API Keys**
4. **Create New API Key** 클릭
5. 키 복사

### NFT.Storage API 키 (선택):
1. https://nft.storage 접속
2. 로그인
3. **API Keys** → **New Key**
4. 키 복사

---

## 🐛 확인 방법

### 환경변수가 제대로 설정되었는지 확인:

1. **Vercel 대시보드**:
   - Settings → Environment Variables
   - `VITE_NEYNAR_API_KEY` 항목이 보이면 ✅

2. **배포된 앱에서**:
   - Warpcast에서 미니앱 열기
   - Monthly 페이지 이동
   - 브라우저 Console 열기 (개발자 도구)
   - 에러 메시지 확인:
     - ❌ `Neynar API key not found` → 환경변수 없음
     - ❌ `Failed to fetch casts: 402` → API 한도 초과
     - ✅ `Fetched casts: 10` → 정상 작동!

---

## ❓ 자주 묻는 질문

### Q1. 환경변수를 추가했는데도 안 돼요!
**A:** 재배포가 완료되었는지 확인하세요. Vercel → Deployments 탭에서 **"Ready"** 상태 확인.

### Q2. Neynar API 402 에러가 나요!
**A:** 무료 플랜 한도(월 1000 requests) 초과. 새 API 키 발급 필요.

### Q3. 로컬에서는 어떻게 테스트하나요?
**A:** 프로젝트 루트에 `.env` 파일 생성:
```env
VITE_NEYNAR_API_KEY=your_api_key_here
VITE_APP_URL=http://localhost:5173
VITE_NFT_STORAGE_API_KEY=your_nft_storage_key
```

---

## 🎉 설정 완료 체크리스트

- [ ] Vercel 대시보드 접속
- [ ] Environment Variables 페이지 이동
- [ ] `VITE_NEYNAR_API_KEY` 추가
- [ ] `VITE_APP_URL` 추가
- [ ] All Environments 체크
- [ ] Save 클릭
- [ ] 재배포 완료 (Ready)
- [ ] 미니앱에서 Monthly 페이지 테스트
- [ ] Q 표시 확인 ✅

---

**문제가 계속되면 Console 에러 메시지를 알려주세요!** 🔍

