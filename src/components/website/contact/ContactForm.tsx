"use client";

import { useState } from "react";
import { toast } from "sonner";
import GoldButton from "@/components/website/shared/GoldButton";
import { cn } from "@/lib/utils";

interface Values {
  name: string;
  email: string;
  phone: string;
  message: string;
}
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: "", email: "", phone: "", message: "" };

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Enter a valid email address.";
  if (!/^[+()\d\s-]{7,20}$/.test(v.phone.trim())) e.phone = "Enter a valid phone number.";
  if (v.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
  return e;
}

const fieldClass =
  "w-full rounded-lg border border-[#697370] bg-transparent p-4 text-base leading-[1.2] text-white outline-none transition-colors placeholder:text-pb-muted focus:border-pb-bronze";

export default function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});

  const set = (k: keyof Values) => (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((p) => ({ ...p, [k]: ev.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    toast.success("Message sent! Our team will get back to you shortly.");
    setValues(EMPTY);
  };

  const label = "text-base font-medium leading-[1.2] text-white";
  const err = (k: keyof Values) =>
    errors[k] ? <p className="text-sm text-red-400">{errors[k]}</p> : null;

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="flex flex-1 flex-col gap-4 rounded-lg bg-[rgba(192,146,72,0.1)] p-5"
    >
      <div className="flex flex-col gap-3">
        <label htmlFor="cf-name" className={label}>Name</label>
        <input id="cf-name" value={values.name} onChange={set("name")} placeholder="Enter your full name" className={cn(fieldClass, errors.name && "border-red-400")} />
        {err("name")}
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-3">
          <label htmlFor="cf-email" className={label}>Email</label>
          <input id="cf-email" type="email" value={values.email} onChange={set("email")} placeholder="Enter your email address" className={cn(fieldClass, errors.email && "border-red-400")} />
          {err("email")}
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <label htmlFor="cf-phone" className={label}>Phone Number</label>
          <input id="cf-phone" type="tel" value={values.phone} onChange={set("phone")} placeholder="Enter your phone number" className={cn(fieldClass, errors.phone && "border-red-400")} />
          {err("phone")}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <label htmlFor="cf-message" className={label}>Message</label>
        <textarea id="cf-message" value={values.message} onChange={set("message")} placeholder="Write your message here..." className={cn(fieldClass, "min-h-[160px] flex-1 resize-none", errors.message && "border-red-400")} />
        {err("message")}
      </div>
      <GoldButton type="submit" className="mx-auto text-[#080b0c]">
        Send Message
      </GoldButton>
    </form>
  );
}
