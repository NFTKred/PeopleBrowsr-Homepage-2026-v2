import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2 } from "lucide-react";
import { useContactModal } from "@/hooks/use-contact-modal";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  organization: z.string().trim().max(150).optional(),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type FormState = { name: string; email: string; organization: string; message: string };
type Errors = Partial<Record<keyof FormState, string>>;

const empty: FormState = { name: "", email: "", organization: "", message: "" };

export function ContactModal() {
  const { isOpen, close } = useContactModal();
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
    if (sendError) setSendError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Errors = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSending(true);
    setSendError(null);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: form.name.trim(),
          email: form.email.trim(),
          organization: form.organization.trim() || undefined,
          message: form.message.trim(),
        },
      });

      if (error) throw new Error(error.message);
      setSubmitted(true);
    } catch (err) {
      setSendError("Something went wrong. Please try again or email us directly at contact@peoplebrowsr.com");
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => {
    close();
    setTimeout(() => {
      setForm(empty);
      setErrors({});
      setSubmitted(false);
      setSendError(null);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            className="fixed inset-0 z-[81] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          >
            <div
              className="relative w-full max-w-lg glass-card rounded-2xl border border-border/40 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between p-6 pb-4 border-b border-border/20">
                <div>
                  <p className="text-xs text-primary font-medium tracking-widest uppercase mb-1">Get in Touch</p>
                  <h2 className="text-xl font-bold font-display text-foreground">Start a Conversation</h2>
                </div>
                <button
                  onClick={handleClose}
                  className="text-muted-foreground hover:text-foreground transition-colors mt-0.5"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {submitted ? (
                  <motion.div
                    className="flex flex-col items-center text-center py-8 gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CheckCircle2 className="w-12 h-12 text-primary" />
                    <h3 className="text-lg font-bold font-display text-foreground">Message sent!</h3>
                    <p className="text-sm text-muted-foreground">
                      Your message has been delivered to the PeopleBrowsr team. We'll be in touch soon.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-2 inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold font-display hover:opacity-90 transition-opacity"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Name *" error={errors.name}>
                        <input
                          type="text"
                          placeholder="Your name"
                          value={form.name}
                          onChange={set("name")}
                          className={inputCls(!!errors.name)}
                          maxLength={100}
                          disabled={sending}
                        />
                      </Field>
                      <Field label="Email *" error={errors.email}>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={set("email")}
                          className={inputCls(!!errors.email)}
                          maxLength={255}
                          disabled={sending}
                        />
                      </Field>
                    </div>

                    <Field label="Organization" error={errors.organization}>
                      <input
                        type="text"
                        placeholder="Company or institution (optional)"
                        value={form.organization}
                        onChange={set("organization")}
                        className={inputCls(false)}
                        maxLength={150}
                        disabled={sending}
                      />
                    </Field>

                    <Field label="Message *" error={errors.message}>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your use case or interest…"
                        value={form.message}
                        onChange={set("message")}
                        className={`${inputCls(!!errors.message)} resize-none`}
                        maxLength={2000}
                        disabled={sending}
                      />
                    </Field>

                    {sendError && (
                      <p className="text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                        {sendError}
                      </p>
                    )}

                    <div className="pt-1 flex items-center justify-between">
                      <p className="text-[11px] text-muted-foreground/60">
                        Sent to contact@peoplebrowsr.com
                      </p>
                      <button
                        type="submit"
                        disabled={sending}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold font-display hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {sending ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function inputCls(hasError: boolean) {
  return `w-full rounded-lg border ${
    hasError ? "border-destructive/60" : "border-border/40"
  } bg-background/40 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors disabled:opacity-50`;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
