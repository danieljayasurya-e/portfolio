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
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 flex items-center justify-center"
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
                <span className="fixed bottom-[72px] right-6 z-50 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#0a0f1e]" />
            )}

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] flex flex-col rounded-2xl bg-[#0d1424] border border-cyan-500/20 shadow-2xl shadow-black/50 overflow-hidden"
                    >
                        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-600/10 border-b border-cyan-500/10">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                                    <Bot size={16} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-white text-sm font-semibold">
                                        Daniel's AI Assistant
                                    </p>
                                    <p className="text-emerald-400 text-xs flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-slate-500 hover:text-slate-300 transition-colors p-1"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                        }`}
                                >
                                    <div
                                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === "assistant"
                                                ? "bg-gradient-to-br from-cyan-400 to-blue-600"
                                                : "bg-slate-700"
                                            }`}
                                    >
                                        {msg.role === "assistant" ? (
                                            <Bot size={13} className="text-white" />
                                        ) : (
                                            <User size={13} className="text-white" />
                                        )}
                                    </div>
                                    <div className={`max-w-[78%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${msg.role === "assistant"
                                            ? "bg-slate-800/80 text-slate-200 rounded-tl-none"
                                            : "bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-tr-none"
                                        }`}>
                                        {msg.role === "assistant" ? (
                                            <ReactMarkdown
                                                components={{
                                                    p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                                                    strong: ({ children }) => (
                                                        <strong className="text-cyan-300 font-semibold">{children}</strong>
                                                    ),
                                                    ul: ({ children }) => (
                                                        <ul className="list-disc list-inside space-y-0.5 mt-1">{children}</ul>
                                                    ),
                                                    li: ({ children }) => (
                                                        <li className="text-slate-300">{children}</li>
                                                    ),
                                                    code: ({ children }) => (
                                                        <code className="px-1 py-0.5 rounded bg-slate-700/60 text-cyan-300 text-xs font-mono">
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
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shrink-0">
                                        <Bot size={13} className="text-white" />
                                    </div>
                                    <div className="px-3 py-2 bg-slate-800/80 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0ms]" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:150ms]" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:300ms]" />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={bottomRef} />
                        </div>

                        {messages.length === 1 && !loading && (
                            <div className="px-4 pb-2 flex flex-wrap gap-2">
                                {SUGGESTIONS.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => sendMessage(s)}
                                        className="text-xs px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="px-4 py-3 border-t border-slate-800/50 flex gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                                placeholder="Ask me anything about Daniel..."
                                disabled={loading}
                                className="flex-1 bg-slate-800/60 border border-slate-700/50 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors disabled:opacity-50"
                            />
                            <button
                                onClick={() => sendMessage()}
                                disabled={!input.trim() || loading}
                                className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 transition-all"
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
