import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const MAX_INPUT_CHARS = 34000; // Caps input at ~8.5K tokens so total input + output stays well under 30K tokens

const studyKitSchema = {
  type: Type.OBJECT,
  properties: {
    courseTitle: {
      type: Type.STRING,
      description: "Clear academic title derived strictly from the uploaded study material.",
    },
    sourceSummary: {
      type: Type.STRING,
      description: "2-sentence overview of the uploaded study material.",
    },
    studySchedule: {
      type: Type.ARRAY,
      description: "5-phase personalized study schedule to achieve a Distinction rank in this unit.",
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.STRING, description: "e.g., Day 1–2" },
          phase: { type: Type.STRING, description: "Phase title, e.g., Concept Encoding & First-Principles" },
          focusConcepts: { type: Type.STRING, description: "Specific concepts from the material to cover" },
          actionItems: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "2-3 concrete study tasks",
          },
          targetMilestone: { type: Type.STRING, description: "Measurable mastery benchmark" },
        },
        required: ["day", "phase", "focusConcepts", "actionItems", "targetMilestone"],
      },
    },
    keyConcepts: {
      type: Type.ARRAY,
      description: "Extract 5 to 7 core concepts strictly from the provided material.",
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING, description: "Core concept name from the material" },
          summary: { type: Type.STRING, description: "1-sentence plain-language overview" },
          points: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "4 to 5 concise points explaining the concept in plain, easy-to-understand language.",
          },
        },
        required: ["id", "title", "summary", "points"],
      },
    },
    practiceQuestions: {
      type: Type.OBJECT,
      properties: {
        mcq: {
          type: Type.ARRAY,
          description: "6 Multiple Choice Questions strictly from the material at the requested difficulty.",
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              question: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Exactly 4 options.",
              },
              correctAnswerIndex: {
                type: Type.INTEGER,
                description: "0-based index (0, 1, 2, or 3) of the correct option.",
              },
              correctAnswer: {
                type: Type.STRING,
                description: "The exact text of the correct option.",
              },
              explanation: {
                type: Type.STRING,
                description: "Concise explanation referencing the uploaded material.",
              },
            },
            required: ["id", "question", "options", "correctAnswerIndex", "correctAnswer", "explanation"],
          },
        },
        shortAnswer: {
          type: Type.ARRAY,
          description: "5 Short Answer Questions with concise, high-scoring answers.",
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              question: { type: Type.STRING },
              conciseHighScoringAnswer: {
                type: Type.STRING,
                description: "Concise, high-scoring model answer strictly based on the uploaded material.",
              },
              scoringChecklist: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "3 key marking points examiners look for.",
              },
            },
            required: ["id", "question", "conciseHighScoringAnswer", "scoringChecklist"],
          },
        },
        applicationBased: {
          type: Type.ARRAY,
          description: "4 Application Based Questions where the student applies learned concepts to real-world scenarios.",
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              realWorldScenario: {
                type: Type.STRING,
                description: "Practical scenario grounded in the concepts of the material.",
              },
              question: { type: Type.STRING },
              applicationModelAnswer: {
                type: Type.STRING,
                description: "High-scoring structured application answer.",
              },
              conceptApplied: { type: Type.STRING },
            },
            required: ["id", "realWorldScenario", "question", "applicationModelAnswer", "conceptApplied"],
          },
        },
      },
      required: ["mcq", "shortAnswer", "applicationBased"],
    },
    flashcards: {
      type: Type.ARRAY,
      description: "Maximum of 10 flashcards strictly from the uploaded material.",
      items: {
        type: Type.OBJECT,
        properties: {
          front: { type: Type.STRING, description: "Term or Question" },
          back: { type: Type.STRING, description: "Definition or Answer" },
        },
        required: ["front", "back"],
      },
    },
    exams: {
      type: Type.ARRAY,
      description: "Exactly 2 complete Model Question Papers.",
      items: {
        type: Type.OBJECT,
        properties: {
          paperNumber: { type: Type.INTEGER },
          title: { type: Type.STRING },
          duration: { type: Type.STRING },
          totalMarks: { type: Type.INTEGER },
          mcqQuestions: {
            type: Type.ARRAY,
            description: "10 Multiple Choice Questions (1 mark each) with 4 options.",
            items: {
              type: Type.OBJECT,
              properties: {
                questionNumber: { type: Type.INTEGER },
                question: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Exactly 4 options.",
                },
                correctAnswer: { type: Type.STRING },
              },
              required: ["questionNumber", "question", "options", "correctAnswer"],
            },
          },
          shortAnswerQuestions: {
            type: Type.ARRAY,
            description: "10 Short Answer Questions (5 marks each) from the uploaded material.",
            items: {
              type: Type.OBJECT,
              properties: {
                questionNumber: { type: Type.INTEGER },
                question: { type: Type.STRING },
                modelAnswer: { type: Type.STRING, description: "Concise 5-mark high-scoring answer key." },
              },
              required: ["questionNumber", "question", "modelAnswer"],
            },
          },
          longAnswerQuestions: {
            type: Type.ARRAY,
            description: "5 Long Answer / Application Based Questions (8 marks each) from the uploaded material.",
            items: {
              type: Type.OBJECT,
              properties: {
                questionNumber: { type: Type.INTEGER },
                question: { type: Type.STRING },
                modelAnswer: { type: Type.STRING, description: "Structured 8-mark distinction-level answer key." },
              },
              required: ["questionNumber", "question", "modelAnswer"],
            },
          },
        },
        required: [
          "paperNumber",
          "title",
          "duration",
          "totalMarks",
          "mcqQuestions",
          "shortAnswerQuestions",
          "longAnswerQuestions",
        ],
      },
    },
  },
  required: [
    "courseTitle",
    "sourceSummary",
    "studySchedule",
    "keyConcepts",
    "practiceQuestions",
    "flashcards",
    "exams",
  ],
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "25mb" }));

  app.post("/api/generate-study-kit", async (req, res) => {
    try {
      const { textContent, fileData, difficulty = "medium", courseTitle } = req.body;

      if (!textContent && !fileData) {
        res.status(400).json({
          error: "Please upload a study document or paste your study notes to generate a kit.",
        });
        return;
      }

      const validDifficulty = ["easy", "medium", "hard"].includes(difficulty)
        ? difficulty
        : "medium";

      const difficultyGuidance: Record<string, string> = {
        easy: "EASY LEVEL: Focus on foundational definitions, direct recall of core facts, straightforward comprehension, and single-step applications directly stated in the material.",
        medium: "MEDIUM LEVEL: Focus on conceptual relationships, comparing mechanisms, multi-step synthesis, and standard exam-style analytical questions grounded in the material.",
        hard: "HARD LEVEL (Distinction Challenge): Focus on nuanced edge cases, synthesis of multiple concepts within the text, rigorous critical analysis, and complex real-world problem solving strictly using principles from the uploaded material.",
      };

      const systemInstruction = `You are an expert academic tutor and teacher who helps college and high school students prepare for exams and achieve a Distinction rank.
Transform the provided study material into a comprehensive, structured Study Kit.

CRITICAL CONSTRAINTS (NON-NEGOTIABLE):
1. Create all summaries, flashcards, practice questions, and exam papers STRICTLY from the material uploaded. Do NOT reference outside facts or external curriculum not present in the provided source.
2. Do NOT hallucinate concepts. If a concept is not in the uploaded material, do not include it in summaries, flashcards, or quizzes.
3. Key Concepts & Summaries: Extract 5 to 7 core concepts from the provided material. Explain each concept in 4 to 5 concise points using plain, easy-to-understand language.
4. Practice Questions for Exam (${validDifficulty.toUpperCase()} difficulty — ${difficultyGuidance[validDifficulty]}):
   - Multiple Choice Questions (MCQ): Provide 6 questions with 4 options per question and indicate the correct answer.
   - Short Answer Questions: Provide 5 questions with a concise, high-scoring answer.
   - Application Based Questions: Provide 4 real-world application questions where the student applies the learned concepts from the material.
5. Flashcards: Provide key terms and definitions as a clean JSON array of objects with "front" and "back" keys. Strictly limit the total number of flashcards to a MAXIMUM of 10.
6. Exams: Create 2 complete Model Question Papers (Paper 1 and Paper 2) calibrated to ${validDifficulty.toUpperCase()} level:
   - MCQ Section: Exactly 10 questions with 4 options for each question (1 mark each).
   - Short Answer Questions Section: Exactly 10 questions about concepts from the material uploaded (5 marks each).
   - Long Answer / Application Based Questions Section: Exactly 5 questions about concepts from the material uploaded (8 marks each).
7. Keep explanations crisp, high-yield, and concise so total token usage stays well under 30K tokens.`;

      const parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [];

      if (fileData && fileData.base64 && fileData.mimeType) {
        // If it's a text-based MIME type, decode and truncate to stay strictly within token budget
        if (
          fileData.mimeType.startsWith("text/") ||
          fileData.mimeType === "application/json"
        ) {
          const decodedText = Buffer.from(fileData.base64, "base64")
            .toString("utf-8")
            .slice(0, MAX_INPUT_CHARS);
          parts.push({
            text: `Uploaded Document (${fileData.fileName || "Study Material"}):\n\n${decodedText}`,
          });
        } else {
          parts.push({
            inlineData: {
              mimeType: fileData.mimeType,
              data: fileData.base64,
            },
          });
        }
      }

      if (textContent && typeof textContent === "string" && textContent.trim().length > 0) {
        const trimmedText = textContent.trim().slice(0, MAX_INPUT_CHARS);
        parts.push({
          text: `Study Material Notes${courseTitle ? ` (${courseTitle})` : ""}:\n\n${trimmedText}`,
        });
      }

      parts.push({
        text: `Generate the complete Distinction Study Kit in JSON format for difficulty level: "${validDifficulty.toUpperCase()}". Remember: use ONLY concepts present in the provided study material, limit flashcards to at most 10 items, extract 5-7 core concepts with 4-5 points each, and generate 2 full model exam papers (10 MCQs @ 1 mark, 10 Short Answer @ 5 marks, 5 Long/Application @ 8 marks per paper).`,
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: { parts },
        config: {
          systemInstruction,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          responseMimeType: "application/json",
          responseSchema: studyKitSchema,
          temperature: 0.3,
        },
      });

      const rawText = response.text;
      if (!rawText) {
        throw new Error("The tutor engine returned an empty response. Please try again with clearer study notes.");
      }

      const parsed = JSON.parse(rawText);

      // Enforce hard constraints defensively on the backend
      const flashcards = Array.isArray(parsed.flashcards)
        ? parsed.flashcards.slice(0, 10).map((card: { front?: string; back?: string }) => ({
            front: String(card.front || ""),
            back: String(card.back || ""),
          }))
        : [];

      const keyConcepts = Array.isArray(parsed.keyConcepts)
        ? parsed.keyConcepts.slice(0, 7)
        : [];

      const studyKit = {
        id: `kit-${Date.now()}`,
        courseTitle: courseTitle?.trim() || parsed.courseTitle || "Uploaded Study Material",
        sourceSummary: parsed.sourceSummary || "Structured study kit generated strictly from your uploaded material.",
        difficulty: validDifficulty,
        createdAt: new Date().toISOString(),
        studySchedule: Array.isArray(parsed.studySchedule) ? parsed.studySchedule : [],
        keyConcepts,
        practiceQuestions: {
          mcq: parsed.practiceQuestions?.mcq || [],
          shortAnswer: parsed.practiceQuestions?.shortAnswer || [],
          applicationBased: parsed.practiceQuestions?.applicationBased || [],
        },
        flashcards,
        exams: Array.isArray(parsed.exams) ? parsed.exams.slice(0, 2) : [],
      };

      res.json(studyKit);
    } catch (error: unknown) {
      console.error("Error generating study kit:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Failed to parse study material and generate study kit.";
      res.status(500).json({ error: message });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*all", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Academic Study Kit Server running on http://localhost:${PORT}`);
  });
}

startServer();
