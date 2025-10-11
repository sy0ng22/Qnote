// Dynamic card view page with OG tags
export const config = {
  runtime: 'edge',
};

// Question list (same as questions.js)
const questions = [
  "What made you smile today?",
  "Who are you most grateful for?",
  "What was the most beautiful moment today?",
  "What decision am I postponing?",
  "What am I afraid of right now?"
];

function getQuestionForDate(dateString) {
  const seed = dateString.split('-').join('');
  const index = parseInt(seed) % questions.length;
  return questions[index];
}

export default async function handler(request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const answer = searchParams.get('answer') || '';
    
    if (!date) {
      // Redirect to today's date
      const today = new Date().toISOString().split('T')[0];
      return Response.redirect(`${request.url.split('?')[0]}?date=${today}`, 302);
    }

    const question = getQuestionForDate(date);
    const appUrl = 'https://qnote-two.vercel.app';
    
    // Build OG image URL with answer parameter
    const ogImageUrl = `${appUrl}/api/og?date=${date}${answer ? `&answer=${encodeURIComponent(answer)}` : ''}`;
    
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Qnote">
  <meta property="og:title" content="Qnote - ${formattedDate}">
  <meta property="og:description" content="${question}">
  <meta property="og:image" content="${ogImageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:url" content="${request.url}">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Qnote - ${formattedDate}">
  <meta name="twitter:description" content="${question}">
  <meta name="twitter:image" content="${ogImageUrl}">
  
  <!-- Farcaster Frame -->
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:image" content="${ogImageUrl}">
  <meta property="fc:frame:button:1" content="Answer Question">
  <meta property="fc:frame:button:1:action" content="link">
  <meta property="fc:frame:button:1:target" content="${appUrl}">
  
  <title>Qnote - ${formattedDate}</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <div class="container">
    <!-- Navigation -->
    <nav class="nav-bar">
      <button class="nav-button" onclick="location.href='/'">← Home</button>
      <div class="nav-title">View Card</div>
      <button class="nav-button" onclick="location.href='/week.html'">Week</button>
    </nav>

    <!-- Main Content -->
    <main class="content">
      <div style="padding: 24px; background: var(--bg-secondary); border-radius: 12px; margin-bottom: 24px;">
        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">
          ${formattedDate}
        </div>
        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">
          TODAY'S QUESTION
        </div>
        <div style="font-size: 20px; font-weight: 600; margin-bottom: 16px;">
          ${question}
        </div>
        ${answer ? `
        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">
          Your Answer
        </div>
        <div style="font-size: 18px; font-weight: 500;">
          ${answer}
        </div>
        ` : `
        <div style="text-align: center; color: var(--text-secondary); padding: 24px 0;">
          No answer has been written for this date yet.
        </div>
        `}
      </div>

      <!-- Preview Card Image -->
      <div style="margin-bottom: 24px;">
        <img src="${ogImageUrl}" style="width: 100%; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.1);" alt="Card preview" />
      </div>

      <!-- Actions -->
      <button class="button" onclick="location.href='/'">
        Answer Today's Question ✍️
      </button>
    </main>
  </div>
</body>
</html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=300',
      },
    });
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate page: ${e.message}`, {
      status: 500,
    });
  }
}

