import { ImageResponse } from '@vercel/og';

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
      return new Response('Missing date parameter', { status: 400 });
    }

    const question = getQuestionForDate(date);
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F5F5F7',
            padding: '60px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '60px 48px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
              maxWidth: '800px',
              width: '100%',
            }}
          >
            <div
              style={{
                fontSize: '28px',
                color: '#86868B',
                marginBottom: '24px',
                letterSpacing: '0.5px',
              }}
            >
              {formattedDate}
            </div>
            <div
              style={{
                fontSize: '18px',
                color: '#86868B',
                marginBottom: '16px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              TODAY'S QUESTION
            </div>
            <div
              style={{
                fontSize: '40px',
                fontWeight: '600',
                color: '#1d1d1f',
                marginBottom: '48px',
                textAlign: 'center',
                lineHeight: 1.3,
              }}
            >
              {question}
            </div>
            <div
              style={{
                fontSize: '18px',
                color: '#86868B',
                marginBottom: '12px',
                letterSpacing: '0.5px',
              }}
            >
              Your Answer
            </div>
            <div
              style={{
                fontSize: '36px',
                fontWeight: '500',
                color: '#1d1d1f',
                textAlign: 'center',
                lineHeight: 1.4,
              }}
            >
              {answer || '...'}
            </div>
            <div
              style={{
                marginTop: '48px',
                fontSize: '24px',
                color: '#86868B',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              🌿 Qnote
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

