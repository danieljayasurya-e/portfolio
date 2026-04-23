import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import OpenAI from "openai";
import toast, { Toaster } from "react-hot-toast";
import { Mail, MapPin, Send, Loader2, Sparkles } from "lucide-react";

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
      model: "Qwen/Qwen3-32B",
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
        toast.success("Message sent! You'll receive a reply soon.", { id: toastId });
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
    <section id="contact" className="py-28 relative overflow-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#FFFFFF",
            color: "#0F0F1E",
            border: "1px solid rgba(108,92,231,0.22)",
            boxShadow: "0 10px 30px rgba(15,15,30,0.08)",
          },
        }}
      />

      <div className="absolute bottom-0 right-1/4 w-[380px] h-[380px] bg-brand-200/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[260px] h-[260px] bg-brand-300/25 rounded-full blur-[80px] pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col items-start gap-3 mb-14"
        >
          <span className="section-eyebrow">05 — Contact</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight font-heading">
            Let's build something <span className="hero-gradient-text">exceptional</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <p className="text-ink-muted mb-8 leading-relaxed">
              I'm open to{" "}
              <span className="text-brand-600 font-semibold">freelance and contract</span>{" "}
              opportunities. Fill the form — you'll get an{" "}
              <span className="text-brand-600 font-semibold">AI-generated instant reply</span>{" "}
              from me while I prepare a proper response.
            </p>

            <div className="space-y-3 mb-8">
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
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-brand-100 hover:border-brand-300 hover:shadow-card transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-gradient text-white grid place-items-center shadow-glow shrink-0">
                    <Icon size={15} />
                  </div>
                  <div className="text-ink font-medium text-sm group-hover:text-brand-700 transition-colors">
                    {label}
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="rounded-2xl p-5 bg-brand-gradient text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top_right,#fff,transparent_60%)]" />
              <div className="relative flex items-start gap-3">
                <Sparkles size={18} className="mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-sm mb-1">Response in 24 hours</p>
                  <p className="text-white/85 text-xs leading-relaxed">
                    I read every inquiry personally. Expect a thoughtful reply — not a template.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
              className="card-surface p-7 lg:p-8 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: "name", label: "Your Name", placeholder: "John Doe", type: "text" },
                  { name: "email", label: "Your Email", placeholder: "john@example.com", type: "email" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="text-xs font-medium text-ink-muted mb-1.5 block">
                      {field.label}
                    </label>
                    <input
                      {...register(field.name as keyof FormData)}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full bg-surface-soft border border-brand-100 rounded-xl px-4 py-3 text-sm text-ink placeholder-ink-soft/80 focus:outline-none focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100 transition-all duration-200"
                    />
                    {errors[field.name as keyof FormData] && (
                      <p className="text-red-500 text-xs mt-1.5">
                        {errors[field.name as keyof FormData]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <label className="text-xs font-medium text-ink-muted mb-1.5 block">
                  Subject
                </label>
                <input
                  {...register("subject")}
                  type="text"
                  placeholder="Project Inquiry"
                  className="w-full bg-surface-soft border border-brand-100 rounded-xl px-4 py-3 text-sm text-ink placeholder-ink-soft/80 focus:outline-none focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100 transition-all duration-200"
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-ink-muted mb-1.5 block">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full bg-surface-soft border border-brand-100 rounded-xl px-4 py-3 text-sm text-ink placeholder-ink-soft/80 focus:outline-none focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100 transition-all duration-200 resize-none"
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.message.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
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
              </motion.button>

              <p className="text-xs text-ink-soft text-center">
                You'll receive an AI-generated reply instantly
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
