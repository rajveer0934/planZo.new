import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  const origin = req.headers?.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      service: 'Sarthi AI Copilot Serverless Endpoint',
      timestamp: Date.now(),
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { messages, attachment, context } = body;
    const userMessage = (messages?.[messages.length - 1]?.content || '').trim();

    if (!userMessage && !attachment?.data) {
      return res.status(400).json({ error: 'Message or attachment is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `You are Sarthi, an expert, empathetic, and exceptionally practical senior B.Tech mentor & academic copilot on PlanZo.
Student Academic Context:
- College / Institute: ${context?.college || 'B.Tech Engineering College'}
- Engineering Branch: ${context?.branch || 'Computer Science & Engineering'}
- Current Semester: Semester ${context?.semester || '1'}
- Current Schedule Load: ${context?.bandwidth || 'Balanced'}

Core Principles:
1. Provide direct, rigorous, and intelligent answers to whatever specific question the student asks—whether it is solving mathematics equations, explaining physics/chemistry concepts, writing and debugging code (C, C++, Python, Java, JS), breaking down syllabus topics, explaining engineering drawing principles, or advising on 75% attendance rules.
2. If an image or file is attached (e.g. photos of exam question papers, textbook pages, circuit diagrams, code screenshots, handwritten notes, or lab manuals), thoroughly analyze and explain it step-by-step.
3. Keep formatting clean, highly readable, and structured. Use clear section titles, clean numbered steps (1., 2., 3.), clean bullet points, and code blocks with syntax highlighting for code snippets. Avoid dumping messy raw symbols or excessive asterisks.
4. Never give robotic generic boilerplate, never repeat pre-fed canned answers, and never give a generic placeholder. Answer specifically and dynamically to the student's exact query.`;

    const contents: any[] = [];

    if (Array.isArray(messages) && messages.length > 1) {
      const history = messages.slice(-7, -1);
      for (const msg of history) {
        if (msg.content && typeof msg.content === 'string') {
          const role = msg.sender === 'user' ? 'user' : 'model';
          if (contents.length === 0 && role === 'model') {
            continue;
          }
          if (contents.length > 0 && contents[contents.length - 1].role === role) {
            contents[contents.length - 1].parts.push({ text: msg.content });
          } else {
            contents.push({
              role,
              parts: [{ text: msg.content }],
            });
          }
        }
      }
    }

    const currentParts: any[] = [];
    if (userMessage) {
      currentParts.push({ text: userMessage });
    }

    if (attachment && attachment.data && attachment.mimeType) {
      const cleanBase64 = attachment.data.includes(',')
        ? attachment.data.split(',')[1]
        : attachment.data;
      currentParts.push({
        inlineData: {
          mimeType: attachment.mimeType,
          data: cleanBase64,
        },
      });
    }

    if (currentParts.length === 1 && currentParts[0].inlineData) {
      currentParts.unshift({
        text: 'Please carefully analyze this uploaded image/document, identify what it contains, explain the concepts, and solve or answer any problems shown.',
      });
    }

    if (currentParts.length === 0) {
      currentParts.push({ text: 'Hello, please help me with my B.Tech studies.' });
    }

    if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
      contents[contents.length - 1].parts.push(...currentParts);
    } else {
      contents.push({
        role: 'user',
        parts: currentParts,
      });
    }

    const candidateModels = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
    let generatedText = '';

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction,
          },
        });
        if (response && response.text) {
          generatedText = response.text;
          break;
        }
      } catch (err) {
        console.warn(`Model ${model} attempt failed:`, err);
      }
    }

    if (generatedText) {
      return res.status(200).json({ reply: generatedText });
    }

    return res.status(503).json({
      error: 'AI service is temporarily busy. Please retry in a few seconds.',
    });
  } catch (err: any) {
    console.error('Vercel /api/chat error:', err);
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
}
