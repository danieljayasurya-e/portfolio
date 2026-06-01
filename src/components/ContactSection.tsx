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
    <section id="contact" className="py-24 relative overflow-hidden border-t-[3px] border-ink">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#FBF9F0",
            color: "#0A0A0A",
            border: "3px solid #0A0A0A",
            borderRadius: "0px",
            boxShadow: "6px 6px 0 0 #0A0A0A",
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 600,
          },
        }}
      />

      <div ref={ref} className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col items-start gap-4 mb-12"
        >
          <span className="section-eyebrow">05 / CONTACT</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink uppercase tracking-tighter leading-[0.95] font-heading">
            Let's build something{" "}
            <span className="bg-orange text-ink px-2 inline-block -rotate-1 border-[3px] border-ink shadow-brutal">
              exceptional
            </span>
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
            <p className="text-ink-muted font-mono text-sm mb-8 leading-relaxed">
              Open to{" "}
              <span className="bg-lime text-ink px-1 font-bold">freelance & contract</span>{" "}
              work. Fill the form — you'll get an{" "}
              <span className="bg-cyan text-ink px-1 font-bold">AI-generated instant reply</span>{" "}
              while I prepare a proper response.
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
                  whileHover={{ x: -3, y: -3 }}
                  className="flex items-center gap-3 p-4 bg-paper border-[3px] border-ink shadow-brutal-sm hover:shadow-brutal transition-shadow group"
                >
                  <div className="w-10 h-10 bg-lime border-[3px] border-ink text-ink grid place-items-center shrink-0">
                    <Icon size={15} />
                  </div>
                  <div className="text-ink font-mono font-bold text-sm break-all">
                    {label}
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="p-5 bg-ink border-[3px] border-ink shadow-brutal relative">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-lime border-2 border-paper grid place-items-center shrink-0">
                  <Sparkles size={16} className="text-ink" />
                </div>
                <div>
                  <p className="font-heading font-extrabold uppercase text-paper text-sm mb-1">Response in 24 hours</p>
                  <p className="text-paper/70 text-xs font-mono leading-relaxed">
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
              className="brutal-card p-6 lg:p-8 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: "name", label: "Your Name", placeholder: "John Doe", type: "text" },
                  { name: "email", label: "Your Email", placeholder: "john@example.com", type: "email" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-ink mb-2 block">
                      {field.label}
                    </label>
                    <input
                      {...register(field.name as keyof FormData)}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full bg-paper-soft border-[3px] border-ink px-4 py-3 text-sm font-mono text-ink placeholder-ink-soft/70 focus:outline-none focus:bg-paper focus:shadow-brutal-sm transition-shadow"
                    />
                    {errors[field.name as keyof FormData] && (
                      <p className="text-pink bg-ink inline-block px-1.5 py-0.5 font-mono text-xs mt-2">
                        {errors[field.name as keyof FormData]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-ink mb-2 block">
                  Subject
                </label>
                <input
                  {...register("subject")}
                  type="text"
                  placeholder="Project Inquiry"
                  className="w-full bg-paper-soft border-[3px] border-ink px-4 py-3 text-sm font-mono text-ink placeholder-ink-soft/70 focus:outline-none focus:bg-paper focus:shadow-brutal-sm transition-shadow"
                />
                {errors.subject && (
                  <p className="text-pink bg-ink inline-block px-1.5 py-0.5 font-mono text-xs mt-2">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-ink mb-2 block">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full bg-paper-soft border-[3px] border-ink px-4 py-3 text-sm font-mono text-ink placeholder-ink-soft/70 focus:outline-none focus:bg-paper focus:shadow-brutal-sm transition-shadow resize-none"
                />
                {errors.message && (
                  <p className="text-pink bg-ink inline-block px-1.5 py-0.5 font-mono text-xs mt-2">{errors.message.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileTap={{ x: 2, y: 2 }}
                className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending & Generating Reply…
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>

              <p className="text-xs font-mono text-ink-soft text-center uppercase tracking-wider">
                ⚡ Instant AI-generated reply
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
