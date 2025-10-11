# Qnote 🌿

**Daily Question Mini App** - Answer a daily question, create a card, and share it on Farcaster

## ✨ Key Features

- 📝 **Daily Question**: Date-based fixed daily question
- 💬 **Write Answer**: Record your day with simple text
- 🎨 **Card Generation**: Transform your answer into a beautiful image card
- 🔗 **Farcaster Share**: Easy sharing with automatic tagging
- 📅 **Weekly Board**: View this week's records at a glance

## 🚀 Getting Started

### 1. Development Environment Setup

```bash
# Install packages
npm install

# Environment variable setup
cp .env.example .env
# Enter VITE_NEYNAR_API_KEY in .env file

# Run development server
npm run dev
```

### 2. Environment Variables

Set the following variables in the `.env` file:

```env
VITE_NEYNAR_API_KEY=your_api_key_here
VITE_APP_URL=http://localhost:5173
```

- **VITE_NEYNAR_API_KEY**: API key issued from [Neynar](https://neynar.com)
- **VITE_APP_URL**: Deployed app URL (localhost for local development)

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

### Step 4: Weekly Board
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
- **API**: Neynar Read API (Query Farcaster data)
- **Storage**: LocalStorage (Client-side storage without server)

## 📦 Build & Deploy

### Local Build

```bash
npm run build
```

### Vercel Deploy

1. Connect GitHub repository
2. Set environment variables:
   - `VITE_NEYNAR_API_KEY`
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
  imgUrl: "data:image/png;base64,..."
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
