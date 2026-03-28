import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import OpenAI from "openai";
import toast, { Toaster } from "react-hot-toast";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";

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
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -40]);

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
    <section id="contact" ref={ref} className="py-32 bg-editorial-dark relative overflow-hidden md:ml-64">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--editor-card)",
            color: "var(--editor-text)",
            border: "1px solid var(--editor-accent)",
          },
        }}
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-accent font-display text-2xl">05</span>
            <h2 className="text-5xl font-display font-bold text-editorial-text">Contact</h2>
          </div>
          <div className="w-20 h-1 bg-accent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-3xl font-display font-bold text-editorial-text mb-4">
              Let&apos;s build something.
            </h3>
            <p className="text-editorial-text-muted mb-8 leading-relaxed">
              Open to freelance, contract, and full-time opportunities. Interested in your project? Send me a message.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  label: "danieljayasuryae@gmail.com",
                  href: "mailto:danieljayasuryae@gmail.com",
                },
                {
                  icon: MapPin,
                  label: "Coimbatore, India",
                  href: "#",
                },
              ].map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 text-editorial-text-muted hover:text-accent transition-colors"
                >
                  <Icon size={18} className="text-accent" />
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 p-6 border border-accent/20 bg-accent/5"
            >
              {[
                { name: "name", label: "Name", placeholder: "Your name", type: "text" },
                { name: "email", label: "Email", placeholder: "your@email.com", type: "email" },
                { name: "subject", label: "Subject", placeholder: "Project inquiry", type: "text" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-sm text-editorial-text-muted mb-2 block">
                    {field.label}
                  </label>
                  <input
                    {...register(field.name as keyof FormData)}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full bg-editorial-card border border-accent/20 px-4 py-2 text-sm text-editorial-text placeholder-editorial-text-muted/50 focus:outline-none focus:border-accent transition-all"
                  />
                  {errors[field.name as keyof FormData] && (
                    <p className="text-secondary-accent text-xs mt-1">
                      {errors[field.name as keyof FormData]?.message}
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label className="text-sm text-editorial-text-muted mb-2 block">Message</label>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full bg-editorial-card border border-accent/20 px-4 py-2 text-sm text-editorial-text placeholder-editorial-text-muted/50 focus:outline-none focus:border-accent transition-all resize-none"
                />
                {errors.message && (
                  <p className="text-secondary-accent text-xs mt-1">{errors.message.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, backgroundColor: "var(--editor-accent)", color: "var(--editor-bg)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-accent text-editorial-dark font-display font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed border border-accent"
              >
                <span className="flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
