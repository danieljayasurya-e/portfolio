import { useState } from "react";
import OpenAI from "openai";

const client = new OpenAI({
    baseURL: "https://router.huggingface.co/v1",
    apiKey: import.meta.env.VITE_HF_TOKEN,
    dangerouslyAllowBrowser: true,
});

export const useProjectSummary = () => {
    const [summaries, setSummaries] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<Record<string, boolean>>({});

    const generateSummary = async (projectTitle: string, tech: string[]) => {
        if (summaries[projectTitle]) return;
        setLoading((prev) => ({ ...prev, [projectTitle]: true }));


        try {
            const prompt = `Reply with ONLY one sentence (max 25 words). Start with a strong verb. Be specific about the impact. Describe: "${projectTitle}" built with ${tech.slice(0, 3).join(", ")}.`;

            const response = await client.chat.completions.create({
                model: "Qwen/Qwen3-32B",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 500,
                temperature: 0.5,
            });

            const raw = response.choices[0]?.message?.content?.trim() ?? "";

            // ✅ Strip <think>...</think> — Qwen3 also uses reasoning tags
            const cleaned = raw
                .replace(/<think>[\s\S]*?<\/think>/gi, "")
                .trim();

            const summary =
                cleaned
                    .replace(/^["'*\-]+|["'*\-]+$/g, "")
                    .split("\n")[0]
                    .trim() || "A powerful full-stack web application.";

            setSummaries((prev) => ({ ...prev, [projectTitle]: summary }));
        } catch (err) {
            console.error("Qwen Error:", err);
            setSummaries((prev) => ({
                ...prev,
                [projectTitle]: "A powerful full-stack web application.",
            }));
        } finally {
            setLoading((prev) => ({ ...prev, [projectTitle]: false }));
        }
    };

    return { summaries, loading, generateSummary };
};
