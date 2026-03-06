import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import OpenAI from "openai";
import toast, { Toaster } from "react-hot-toast";
import { Mail, MapPin, Send, Phone, Loader2 } from "lucide-react";
import CalendlyButton from "./CalendlyModal";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: import.meta.env.VITE_HF_TOKEN,
  dangerouslyAllowBrowser: true,
});

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

const generateAIReply = async (name: string, message: string): Promise<string> => {
  try {
    const response = await client.chat.completions.create({
      model: "Qwen/Qwen3-Coder-Next:fastest",
      messages: [
        {
          role: "system",
          content: `You are Daniel Jayasurya, a Full Stack Engineer from Coimbatore, India. Write a short, warm, professional reply to someone who contacted you through your portfolio. Be genuine and friendly. Keep it under 50 words. No markdown. No sign-off. No "Best," or "Regards," or Hi name," — just the reply body only.`,
        },
        {
          role: "user",
          content: `Visitor name: ${name}\nTheir message: ${message}`,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const raw = response.choices[0]?.message?.content?.trim() ?? "";
    return raw.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
  } catch (err) {
    console.warn("AI reply failed, using fallback:", err);
    return `Thank you for reaching out! I've received your message and will get back to you shortly.`;
  }
};


const ContactSection = () => {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const toastId = toast.loading("Sending your message...");
    try {
      const aiReply = await generateAIReply(data.name, data.message);

      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
          ai_reply: aiReply,
          to_name: "Daniel Jayasurya",
          reply_to: data.email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        toast.success("Message sent! You'll receive a reply soon 🎉", { id: toastId });
        reset();
      } else {
        throw new Error("EmailJS returned non-200");
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Failed to send. Please email me directly at danieljayasuryae@gmail.com", {
        id: toastId,
        duration: 5000,
      });
    }
  };

  return (
    <section id="contact" ref={ref} className="py-24 bg-[#0d1424] relative overflow-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid rgba(6,182,212,0.2)",
          },
        }}
      />

      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm">05.</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">What's Next?</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent max-w-xs" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-4xl font-bold text-white mb-4">
              Get In{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              I'm open to{" "}
              <span className="text-cyan-400">freelance and contract</span>{" "}
              opportunities. Fill the form — you'll get an{" "}
              <span className="text-cyan-400">AI-generated instant reply</span> from
              me!
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  icon: Mail,
                  label: "danieljayasuryae@gmail.com",
                  href: "mailto:danieljayasuryae@gmail.com",
                },
                {
                  icon: MapPin,
                  label: "Coimbatore, Tamil Nadu, India",
                  href: "#",
                },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-cyan-400/10 border border-cyan-400/20 group-hover:bg-cyan-400/20 transition-colors">
                    <Icon size={16} className="text-cyan-400" />
                  </div>
                  {label}
                </a>
              ))}
            </div>

            {/* Calendly here on left side too */}
            {/* <div>
              <p className="text-slate-500 text-sm mb-3">Or schedule a call directly:</p>
              <CalendlyButton />
            </div> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 p-6 rounded-2xl bg-slate-800/30 border border-slate-700/40"
            >
              {[
                { name: "name", label: "Your Name", placeholder: "John Doe", type: "text" },
                { name: "email", label: "Your Email", placeholder: "john@example.com", type: "email" },
                { name: "subject", label: "Subject", placeholder: "Project Inquiry", type: "text" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-sm text-slate-400 mb-1.5 block">
                    {field.label}
                  </label>
                  <input
                    {...register(field.name as keyof FormData)}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                  {errors[field.name as keyof FormData] && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors[field.name as keyof FormData]?.message}
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label className="text-sm text-slate-400 mb-1.5 block">Message</label>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending & Generating Reply...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-xs text-slate-500 text-center">
                ✨ You'll receive an AI-generated reply instantly
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
