import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import OpenAI from "openai";
import ReactMarkdown from "react-markdown";


const client = new OpenAI({
    baseURL: "https://router.huggingface.co/v1",
    apiKey: import.meta.env.VITE_HF_TOKEN,
    dangerouslyAllowBrowser: true,
});

const SYSTEM_PROMPT = `You are Daniel Jayasurya's friendly portfolio assistant. Answer ONLY questions about Daniel. Keep answers short and friendly (max 60 words).

About Daniel:
- Full Stack Engineer (MERN) with 2.5+ years experience
- Based in Coimbatore, Tamil Nadu, India
- Currently at Praathee Technologies Pvt Ltd (March 2024 – Present)
- Previously at Montbleu Technologies (Aug 2023 – Jan 2024)
- Skills: React.js, Node.js, Express.js, PostgreSQL, MongoDB, TypeScript, Redux-Saga, TanStack Query, Docker, GCP, Keycloak SSO, Redis, Socket.io, Tailwind CSS
- Achievements: Reduced app load time by 35%, DB query time by 40%, built systems for 5000+ concurrent users with 99.9% uptime
- Projects: MHCET Admissions Platform, MHCET Test Engine, DWG Editor (ODA SDK), PRA CRM, CONNECT ATS
- Education: B.E ECE, Jansons Institute of Technology, CGPA 8.50
- Email: danieljayasuryae@gmail.com
- LinkedIn: linkedin.com/in/daniel-jayasurya-e-a0a25b1ba
- Open to freelance and contract opportunities

If asked something unrelated to Daniel, politely say you can only answer questions about Daniel.`;

type Message = {
    role: "user" | "assistant";
    content: string;
};

const SUGGESTIONS = [
    "What are your top skills?",
    "Tell me about your projects",
    "Are you available for freelance?",
    "What's your experience?",
];

const AIChatAssistant = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Hey! 👋 I'm Daniel's AI assistant. Ask me anything about his skills, projects, or availability!",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const sendMessage = async (text?: string) => {
        const userMessage = text || input.trim();
        if (!userMessage || loading) return;

        setInput("");
        const updatedMessages: Message[] = [
            ...messages,
            { role: "user", content: userMessage },
        ];
        setMessages(updatedMessages);
        setLoading(true);

        try {
            const response = await client.chat.completions.create({
                model: "Qwen/Qwen3-32B",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    ...updatedMessages.map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                ],
                max_tokens: 400,
                temperature: 0.6,
            });

            const raw =
                response.choices[0]?.message?.content?.trim() ?? "";

            const reply = raw
                .replace(/<think>[\s\S]*?<\/think>/gi, "")
                .trim() || "Sorry, I couldn't understand that. Please try again!";

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: reply },
            ]);
        } catch (err) {
            console.error("Chat error:", err);
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "Oops! Something went wrong. Please try again in a moment.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <motion.button
                onClick={() => setOpen(!open)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-brand-gradient text-white shadow-glow flex items-center justify-center"
                aria-label="Open AI Chat"
            >
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <X size={22} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <MessageCircle size={22} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Unread dot when closed */}
            {!open && (
                <span className="fixed bottom-[72px] right-[26px] z-50 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
            )}

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.96 }}
                        transition={{ duration: 0.22 }}
                        className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[400px] h-[520px] flex flex-col rounded-3xl bg-white border border-brand-100 shadow-float overflow-hidden"
                    >
                        <div className="flex items-center justify-between px-4 py-3 bg-brand-gradient text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-white/20 ring-1 ring-white/30 flex items-center justify-center">
                                    <Bot size={16} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-white text-sm font-semibold">
                                        Daniel's AI Assistant
                                    </p>
                                    <p className="text-white/85 text-xs flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-white/80 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface-soft">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                                >
                                    <div
                                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                                            msg.role === "assistant"
                                                ? "bg-brand-gradient text-white"
                                                : "bg-ink text-white"
                                        }`}
                                    >
                                        {msg.role === "assistant" ? (
                                            <Bot size={13} />
                                        ) : (
                                            <User size={13} />
                                        )}
                                    </div>
                                    <div
                                        className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                                            msg.role === "assistant"
                                                ? "bg-white text-ink border border-brand-100 rounded-tl-md"
                                                : "bg-brand-gradient text-white rounded-tr-md shadow-glow"
                                        }`}
                                    >
                                        {msg.role === "assistant" ? (
                                            <ReactMarkdown
                                                components={{
                                                    p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                                                    strong: ({ children }) => (
                                                        <strong className="text-brand-700 font-semibold">{children}</strong>
                                                    ),
                                                    ul: ({ children }) => (
                                                        <ul className="list-disc list-inside space-y-0.5 mt-1">{children}</ul>
                                                    ),
                                                    li: ({ children }) => (
                                                        <li className="text-ink-muted">{children}</li>
                                                    ),
                                                    code: ({ children }) => (
                                                        <code className="px-1 py-0.5 rounded bg-brand-50 text-brand-700 text-xs font-mono">
                                                            {children}
                                                        </code>
                                                    ),
                                                }}
                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                        ) : (
                                            msg.content
                                        )}
                                    </div>
                                </motion.div>
                            ))}

                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex gap-2 items-center"
                                >
                                    <div className="w-7 h-7 rounded-full bg-brand-gradient flex items-center justify-center shrink-0">
                                        <Bot size={13} className="text-white" />
                                    </div>
                                    <div className="px-3 py-2 bg-white border border-brand-100 rounded-2xl rounded-tl-md flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce [animation-delay:0ms]" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce [animation-delay:150ms]" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce [animation-delay:300ms]" />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={bottomRef} />
                        </div>

                        {messages.length === 1 && !loading && (
                            <div className="px-4 pb-2 pt-2 flex flex-wrap gap-2 bg-surface-soft">
                                {SUGGESTIONS.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => sendMessage(s)}
                                        className="text-xs px-3 py-1.5 rounded-full bg-white border border-brand-200 text-brand-700 hover:bg-brand-50 transition-colors"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="px-4 py-3 border-t border-brand-100 bg-white flex gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                                placeholder="Ask me anything about Daniel..."
                                disabled={loading}
                                className="flex-1 bg-surface-soft border border-brand-100 rounded-xl px-3.5 py-2.5 text-sm text-ink placeholder-ink-soft/80 focus:outline-none focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100 transition-all disabled:opacity-50"
                            />
                            <button
                                onClick={() => sendMessage()}
                                disabled={!input.trim() || loading}
                                className="p-2.5 rounded-xl bg-brand-gradient text-white shadow-glow disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 transition-all"
                            >
                                {loading ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : (
                                    <Send size={16} />
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChatAssistant;
