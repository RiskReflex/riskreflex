import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Normalize messages
    const safeMessages = (body.messages || []).map((msg: any) => ({
      role: msg.role,
      content: msg.content || ''
    }));

    const result = streamText({
      // Point to a currently active Google model alias
      model: google('gemini-3.5-flash'),
      messages: safeMessages,
      system: "You are RIX CORE, an advanced AI Governance and Cyber Risk terminal. Keep your responses concise, professional, and formatted in a way that suits a high-tech terminal interface."
    });

    return new Response(result.textStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
    
  } catch (error) {
    console.error("API Route Error:", error);
    return new Response(String(error), { status: 500 });
  }
}