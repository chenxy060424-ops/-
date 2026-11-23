import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === "production";

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function createServer() {
  const app = express();
  app.use(express.json({ limit: "1mb" }));

  app.post("/api/practice-feedback", async (req, res) => {
    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        error: "Practice feedback AI service is not configured.",
      });
      return;
    }

    const {
      scenarioTitle,
      role,
      goals,
      roundNumber,
      counterpartLine,
      feedbackFocus,
      sampleReply,
      userReply,
    } = req.body ?? {};

    if (!userReply || typeof userReply !== "string" || !userReply.trim()) {
      res.status(400).json({ error: "请输入你的回复内容。" });
      return;
    }

    try {
      const prompt = [
        `情景名称：${scenarioTitle ?? ""}`,
        `对方角色：${role ?? ""}`,
        `本场景练习目标：${Array.isArray(goals) ? goals.join("、") : ""}`,
        `当前轮次：第 ${roundNumber ?? 1} 轮`,
        `对方刚才说：「${counterpartLine ?? ""}」`,
        `本轮反馈重点：${feedbackFocus ?? ""}`,
        `参考示例（仅作标准参考，不要照抄）：${sampleReply ?? ""}`,
        `用户实际写下的回复：「${userReply.trim()}」`,
        "",
        "请用温和、平实、具体的中文评价用户刚写下的这一句：",
        "1. clearPoints（你说清楚了什么）：先肯定用户这句里已经说清楚的部分；如果用户的回复已经覆盖本轮重点，请明确表扬具体哪里做得好。",
        "2. nextToAdd（还可以补哪一句）：指出如果还要更稳妥或更有文字留痕，下一句可以补充什么；若已经很完整，可给出一句微调建议或确认这样发已经很好。",
        "3. isClearEnough：布尔值，判断用户的回答是否已经清楚覆盖本轮沟通要点。",
        "注意：每段控制在 1-2 句、45-85 字以内，适合大学生在手机端快速阅读，不使用法律术语或说教口吻。",
      ].join("\n");

      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents: prompt,
        config: {
          systemInstruction:
            "你是「知险」App 的情景沟通陪练教练，帮助第一次租房、实习、做兼职的大学生把难开口的话说清楚。你的语气温和、务实、平等，不吓唬人，也不使用空洞鼓励。",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              clearPoints: {
                type: Type.STRING,
                description: "你说清楚了什么（1-2句具体肯定的反馈）",
              },
              nextToAdd: {
                type: Type.STRING,
                description: "还可以补哪一句（1-2句具体补充建议）",
              },
              isClearEnough: {
                type: Type.BOOLEAN,
                description: "用户的回复是否已经清楚覆蓋本轮核心要点",
              },
            },
            required: ["clearPoints", "nextToAdd", "isClearEnough"],
          },
        },
      });

      const parsed = JSON.parse((response.text ?? "{}").trim());
      if (
        typeof parsed.clearPoints === "string" &&
        typeof parsed.nextToAdd === "string"
      ) {
        res.json({
          clearPoints: parsed.clearPoints,
          nextToAdd: parsed.nextToAdd,
          isClearEnough: Boolean(parsed.isClearEnough),
          source: "ai",
        });
        return;
      }

      res.status(502).json({ error: "Invalid AI feedback format." });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to generate feedback";
      res.status(502).json({ error: message });
    }
  });

  app.post("/api/practice-summary", async (req, res) => {
    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        error: "Practice summary AI service is not configured.",
      });
      return;
    }

    const { scenarioTitle, role, goals, submissions, defaultTemplate } =
      req.body ?? {};

    if (!Array.isArray(submissions) || submissions.length === 0) {
      res.status(400).json({ error: "缺少练习内容。" });
      return;
    }

    try {
      const transcript = submissions
        .map(
          (item: {
            roundNumber: number;
            counterpartLine: string;
            userReply: string;
          }) =>
            `第${item.roundNumber}轮\n对方：「${item.counterpartLine}」\n用户：「${item.userReply}」`
        )
        .join("\n\n");

      const prompt = [
        `情景：${scenarioTitle ?? ""}（对方：${role ?? ""}）`,
        `练习目标：${Array.isArray(goals) ? goals.join("、") : ""}`,
        `对话记录：\n${transcript}`,
        `默认话术模板参考：${defaultTemplate ?? ""}`,
        "",
        "请结合用户刚才真实提交的回复，生成本次陪练总结：",
        "1. goodTakeaway：一条做得好的地方（具体贴合用户写的句子，40-75字）。",
        "2. improveTakeaway：一条下次可以改进的地方（具体、温和、可执行，40-75字）。",
        "3. suggestedScript：一段整合本情景要点、保留【日期】等可替换占位、可直接发给对方的完整沟通话术（70-130字）。",
      ].join("\n");

      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents: prompt,
        config: {
          systemInstruction:
            "你是「知险」App 的情景沟通陪练总结助手，语气温和、务实、清晰，用适合微信沟通的自然中文生成反馈与可直接复制的沟通话术。",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              goodTakeaway: { type: Type.STRING },
              improveTakeaway: { type: Type.STRING },
              suggestedScript: { type: Type.STRING },
            },
            required: ["goodTakeaway", "improveTakeaway", "suggestedScript"],
          },
        },
      });

      const parsed = JSON.parse((response.text ?? "{}").trim());
      if (
        typeof parsed.goodTakeaway === "string" &&
        typeof parsed.improveTakeaway === "string" &&
        typeof parsed.suggestedScript === "string"
      ) {
        res.json({
          goodTakeaway: parsed.goodTakeaway,
          improveTakeaway: parsed.improveTakeaway,
          suggestedScript: parsed.suggestedScript,
          source: "ai",
        });
        return;
      }

      res.status(502).json({ error: "Invalid AI summary format." });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to generate summary";
      res.status(502).json({ error: message });
    }
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, "dist");
    app.use(express.static(distDir));
    app.get("*", (_req, res) => {
      const indexFile = path.join(distDir, "index.html");
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send("Build output not found.");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Zhixian server listening on http://0.0.0.0:${PORT}`);
  });
}

createServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
