import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Health / Status check for Sarthi AI
app.get('/api/chat', (_req, res) => {
  res.json({ status: 'ok', service: 'Sarthi AI Copilot Server', timestamp: Date.now() });
});

// Initialize GoogleGenAI server-side with required telemetry User-Agent
function getAiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  return new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Endpoint: Student Life AI Chatbot (PlanZo Coach / Sarthi AI)
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, attachment, context } = req.body;
    const userMessage = (messages?.[messages.length - 1]?.content || '').trim();

    if (!userMessage && !attachment?.data) {
      return res.status(400).json({ error: 'Message or attachment is required' });
    }

    const ai = getAiClient();

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

    if (ai) {
      // Build conversation contents for Gemini ensuring valid multiturn format
      const contents: any[] = [];

      // Include previous turns for context (up to last 6 messages)
      if (Array.isArray(messages) && messages.length > 1) {
        const history = messages.slice(-7, -1);
        for (const msg of history) {
          if (msg.content && typeof msg.content === 'string') {
            const role = msg.sender === 'user' ? 'user' : 'model';
            // Gemini strictly requires conversation contents to start with 'user'
            if (contents.length === 0 && role === 'model') {
              continue; // Skip initial welcome or assistant greetings
            }
            // Gemini strictly requires alternating roles: user -> model -> user -> model
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

      // Build the latest turn
      const currentParts: any[] = [];
      if (userMessage) {
        currentParts.push({ text: userMessage });
      }

      // Include image / document attachment if provided
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

      // Fallback text if user only uploaded an attachment
      if (currentParts.length === 1 && currentParts[0].inlineData) {
        currentParts.unshift({
          text: 'Please carefully analyze this uploaded image/document, identify what it contains, explain the concepts, and solve or answer any problems shown.',
        });
      }

      if (currentParts.length === 0) {
        currentParts.push({ text: 'Hello, please help me with my B.Tech studies.' });
      }

      // Append final turn as 'user'
      if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
        contents[contents.length - 1].parts.push(...currentParts);
      } else {
        contents.push({
          role: 'user',
          parts: currentParts,
        });
      }

      // Try modern models with gemini-3.8-flash first for fast and reliable responses
      const candidateModels = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
      let generatedText = '';
      let lastError: any = null;

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
        } catch (err: any) {
          console.warn(`Model ${model} attempt error:`, err?.message?.slice(0, 150) || err);
          lastError = err;
        }
      }

      if (generatedText) {
        return res.json({ reply: generatedText });
      }

      console.error('All Gemini candidate models failed:', lastError);
      return res.status(503).json({
        error: 'AI service is temporarily busy. Please retry in a few seconds.',
      });
    }

    return res.status(500).json({ error: 'Gemini API is not configured on this server.' });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat response' });
  }
});

// Endpoint: Dynamic Schedule Recalibration
app.post('/api/recalibrate', async (req, res) => {
  try {
    const { items, missedItemTitle, reason } = req.body;
    const ai = getAiClient();

    if (ai) {
      const prompt = `You are a dynamic scheduler for an engineering student.
The student missed or wants to shift this task: "${missedItemTitle}" (Reason: ${reason || 'Fatigue / schedule clash'}).
Current remaining daily tasks: ${JSON.stringify(items)}

Task: Suggest how to quietly rearrange their schedule without guilt.
Return ONLY valid JSON matching this schema:
{
  "summary": "Short 1-sentence reassuring summary of the adjustment",
  "bufferAddedMinutes": 20,
  "suggestedAction": "Shifted to tomorrow morning and inserted a 20-min Chill Block"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json(parsed);
    }

    return res.json({
      summary: `Schedule quietly adjusted. "${missedItemTitle || 'Missed task'}" shifted to a lighter time slot.`,
      bufferAddedMinutes: 20,
      suggestedAction: 'Inserted a restorative buffer zone and preserved your evening wind-down.',
    });
  } catch (error) {
    console.error('Recalibrate error:', error);
    res.json({
      summary: 'Schedule quietly adjusted. Buffer zone added.',
      bufferAddedMinutes: 20,
      suggestedAction: 'Postponed task to tomorrow morning.',
    });
  }
});

// Endpoint: Academic Syllabus Deep Dive & Study Chunk Planner
app.post('/api/syllabus-planner', async (req, res) => {
  try {
    const { subject, daysRemaining, currentLevel } = req.body;
    const ai = getAiClient();

    if (ai) {
      const prompt = `For the engineering subject "${subject}", generate an accelerated study roadmap for a student with ${daysRemaining || 7} days remaining who is currently at "${currentLevel || 'Beginner'}" level.
Return JSON with:
{
  "studyPlan": [
    { "phase": "string", "focusTopics": ["string"], "recommendedVideo": "string", "estimatedHours": 2 }
  ],
  "highYieldTip": "string"
}`;
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      return res.json(JSON.parse(response.text || '{}'));
    }

    return res.json({
      studyPlan: [
        {
          phase: 'Phase 1: Core Definitions & High-Yield Units',
          focusTopics: ['Module 1 Foundational Concepts', 'Standard Derivations & Diagrams'],
          recommendedVideo: `Neso Academy & Gate Smashers - ${subject} Playlist`,
          estimatedHours: 2,
        },
        {
          phase: 'Phase 2: Numerical Problems & Previous Year Questions',
          focusTopics: ['University PYQs (2022-2025)', 'Solved Examples from Standard Text'],
          recommendedVideo: `Abdul Bari / 3Blue1Brown - Intuitive Problem Solving`,
          estimatedHours: 2.5,
        },
        {
          phase: 'Phase 3: Formula Sheet & Mock Paper Review',
          focusTopics: ['Summary Cheat Sheet', '1 Timed Exam Paper Simulation'],
          recommendedVideo: `High-Yield Quick Revision Lecture`,
          estimatedHours: 1.5,
        },
      ],
      highYieldTip: `Focus on the 3 questions that appear consistently in the last 5 semester papers.`,
    });
  } catch (error) {
    console.error('Syllabus planner error:', error);
    res.status(500).json({ error: 'Failed to generate study plan' });
  }
});

// Vite Middleware integration for development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PlanZo server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
