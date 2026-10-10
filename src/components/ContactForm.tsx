"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Send } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { SectionHeading } from "@/components/SectionHeading";
import { MotionReveal } from "@/components/MotionReveal";
import { PROJECT_TYPES, SITE } from "@/lib/constants";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/contact-schema";

type SubmitMode = "idle" | "mailto" | "soon";

export function ContactForm() {
  const [mode, setMode] = useState<SubmitMode>("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: undefined,
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    const subject = encodeURIComponent(
      `Заявка з DevSite: ${data.projectType}`,
    );
    const body = encodeURIComponent(
      [
        `Ім’я: ${data.name}`,
        `Email: ${data.email}`,
        `Телефон: ${data.phone}`,
        `Тип проєкту: ${data.projectType}`,
        "",
        data.message,
      ].join("\n"),
    );

    const mailto = `mailto:${SITE.email}?subject=${subject}&body=${body}`;

    const opened = window.open(mailto, "_self");
    if (opened === null) {
      setMode("soon");
      return;
    }
    setMode("mailto");
    reset();
  };

  return (
    <section id="contact" className="relative py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,_rgba(37,99,235,0.18),_transparent_55%)]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Контакти"
          title="Обговоримо ваш проєкт"
          description="Залиште заявку — після валідної форми відкриється ваш поштовий клієнт. Онлайн-бекенд для заявок поки не підключений."
        />

        <MotionReveal>
          <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-[rgba(17,24,39,0.72)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="name"
                  label="Ім’я"
                  error={errors.name?.message}
                >
                  <input
                    id="name"
                    autoComplete="name"
                    className={inputClass(Boolean(errors.name))}
                    placeholder="Ваше ім’я"
                    {...register("name")}
                  />
                </Field>

                <Field
                  id="email"
                  label="Email"
                  error={errors.email?.message}
                >
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={inputClass(Boolean(errors.email))}
                    placeholder="name@company.com"
                    {...register("email")}
                  />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="phone"
                  label="Телефон"
                  error={errors.phone?.message}
                >
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    className={inputClass(Boolean(errors.phone))}
                    placeholder="+380..."
                    {...register("phone")}
                  />
                </Field>

                <Field
                  id="projectType"
                  label="Тип проєкту"
                  error={errors.projectType?.message}
                >
                  <select
                    id="projectType"
                    className={inputClass(Boolean(errors.projectType))}
                    defaultValue=""
                    {...register("projectType")}
                  >
                    <option value="" disabled>
                      Оберіть варіант
                    </option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-[var(--secondary)]">
                        {type}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field
                id="message"
                label="Повідомлення"
                error={errors.message?.message}
              >
                <textarea
                  id="message"
                  rows={5}
                  className={`${inputClass(Boolean(errors.message))} resize-y`}
                  placeholder="Коротко про задачу, терміни та очікування"
                  {...register("message")}
                />
              </Field>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#2563EB,#7C3AED)] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(37,99,235,0.35)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <Send className="size-4" aria-hidden />
                Надіслати заявку
              </button>

              {mode === "mailto" ? (
                <p
                  role="status"
                  className="rounded-xl border border-cyan-400/25 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100"
                >
                  Форма валідна. Відкриваємо ваш email-клієнт для відправки на{" "}
                  {SITE.email}. Якщо лист не відкрився — скопіюйте адресу й
                  напишіть вручну.
                </p>
              ) : null}

              {mode === "soon" ? (
                <p
                  role="status"
                  className="rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-amber-100"
                >
                  Онлайн-відправка заявок ще в розробці. Напишіть нам на{" "}
                  <a
                    className="underline underline-offset-2"
                    href={`mailto:${SITE.email}`}
                  >
                    {SITE.email}
                  </a>
                  .
                </p>
              ) : (
                <p className="flex items-start gap-2 text-xs text-slate-400">
                  <Mail className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                  Без бекенду: після перевірки полів використовуємо mailto, а не
                  фейковий «успіх».
                </p>
              )}
            </form>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs text-rose-300" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border bg-[rgba(8,12,24,0.65)] px-3.5 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:ring-2 focus:ring-cyan-400/50 ${
    hasError
      ? "border-rose-400/50 focus:border-rose-300"
      : "border-white/10 focus:border-cyan-400/40"
  }`;
}
