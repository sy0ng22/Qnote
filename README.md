# Qnote 🌿

**Daily Question Mini App** - Answer a daily question, create a card, and share it on Farcaster

## ✨ Key Features

- 📝 **Daily Question**: Date-based fixed daily question
- 💬 **Write Answer**: Record your day with simple text
- 🎨 **Card Generation**: Transform your answer into a beautiful image card
- 🔗 **Farcaster Share**: Easy sharing with automatic tagging
- 🎭 **NFT Minting**: Mint your daily cards as NFTs on Zora/Base network
- 📅 **Weekly Board**: View this week's records at a glance

## 🚀 Getting Started

### 1. Development Environment Setup

```bash
# Install packages
npm install

# Environment variable setup
# Create a .env file in the root directory with the following:
# VITE_NEYNAR_API_KEY=your_neynar_api_key
# VITE_NFT_STORAGE_API_KEY=your_nft_storage_api_key (optional)
# VITE_APP_URL=http://localhost:5173

# Run development server
npm run dev
```

### 2. Environment Variables

Set the following variables in the `.env` file:

```env
VITE_NEYNAR_API_KEY=your_api_key_here
VITE_NFT_STORAGE_API_KEY=your_nft_storage_key_here  # Optional
VITE_NFT_CONTRACT_ADDRESS=0x...  # Optional
VITE_APP_URL=http://localhost:5173
```

- **VITE_NEYNAR_API_KEY**: API key from [Neynar](https://neynar.com) (Required)
- **VITE_NFT_STORAGE_API_KEY**: API key from [NFT.Storage](https://nft.storage) (Optional - for IPFS upload)
- **VITE_NFT_CONTRACT_ADDRESS**: Your deployed NFT contract on Base (Optional - see `DEPLOY_CONTRACT.md`)
- **VITE_APP_URL**: Deployed app URL (localhost for local development)

> **Note**: 
> - Without `VITE_NFT_STORAGE_API_KEY`: Manual image download and upload to Zora
> - Without `VITE_NFT_CONTRACT_ADDRESS`: Redirects to Zora for minting
> - With both: Full in-app minting using Farcaster wallet!

### 🚀 API Cost Optimization

**Server-side caching** is implemented to minimize Neynar API calls:
- All users share a single server cache (10-minute duration)
- API calls reduced by **90%+** compared to client-side calls
- **Scalable**: 1000+ users can use the app without hitting API limits
- Example: 1000 users/day = only ~144 API requests (vs 3000+ without caching)

## 📱 How to Use

### Step 1: Answer the Question
- Check today's question and write your answer
- Answers are automatically saved locally

### Step 2: Card Generation
- Your answer is automatically converted to an image card
- You can regenerate or edit the card

### Step 3: Farcaster Share
- Click "Share on Farcaster" button
- Opens Warpcast composer directly
- Write and publish your cast!

### Step 4: Mint as NFT (Optional)
- Click "Mint as NFT" button on the card page
- **Best Experience (Farcaster Frame + IPFS)**: 
  - Uses your Farcaster wallet directly
  - Auto-uploads to IPFS
  - Mints NFT on Base network within the app
- **Fallback Options**:
  - With IPFS key: Uploads and redirects to Zora
  - Without key: Downloads image for manual upload
- NFT is minted on Base network (low gas fees!)

### Step 5: Weekly Board
- View this week's Monday-Sunday records at a glance
- Local storage + automatic Farcaster cast lookup
- Click empty spaces to write immediately

## 🎨 Design Concept

- **Minimal Apple Style**: Clean and intuitive UI
- **Pretendard Font**: Optimized Korean readability
- **Responsive Design**: Mobile-first design

## 🛠 Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Build Tool**: Vite
- **Libraries**:
  - `dayjs`: Date handling
  - `html2canvas`: Card image generation
  - `@farcaster/frame-sdk`: Farcaster integration
  - `nft.storage`: IPFS upload for NFT minting
  - `viem`: Web3 utilities
- **APIs**: 
  - Neynar Read API (Query Farcaster data)
  - NFT.Storage API (IPFS upload - optional)
- **Blockchain**: Base Network (Ethereum L2)
- **NFT Platform**: Direct minting or Zora fallback
- **Storage**: 
  - LocalStorage (Client-side storage)
  - IPFS via NFT.Storage (for NFTs)

## 📦 Build & Deploy

### Local Build

```bash
npm run build
```

### Vercel Deploy

1. Connect GitHub repository
2. Set environment variables:
   - `VITE_NEYNAR_API_KEY` (Required)
   - `VITE_NFT_STORAGE_API_KEY` (Optional but recommended)
   - `VITE_NFT_CONTRACT_ADDRESS` (Optional - for direct minting)
   - `VITE_APP_URL`
3. Automatic deployment complete!

## 🔒 Privacy

- All data is stored in browser's LocalStorage
- No server or database used
- Neynar API only queries public Farcaster data

## 📝 Data Structure

### LocalStorage Keys

```
dq:YYYY-MM-DD = {
  question: "Question content",
  text: "Answer content",
  date: "YYYY-MM-DD",
  imgUrl: "data:image/png;base64,...",
  ipfsUrl: "https://ipfs.io/ipfs/...",  // Optional: IPFS image URL
  metadataUrl: "https://ipfs.io/ipfs/..."  // Optional: IPFS metadata URL
}

qnote:fid = "12345"
```

### Farcaster Share Format

```
Daily Question 🌿
[Question content]
→ [Answer content]

#Qnote #DailyQuestion DQ:YYYY-MM-DD
https://qnote.app/card-view.html?date=YYYY-MM-DD
```

## 🤝 Contributing

Issues and PRs are always welcome!

## 📄 License

MIT License

---

Made with 🌿 by Qnote Team
