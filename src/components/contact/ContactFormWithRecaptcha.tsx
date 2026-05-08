"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ContactForm } from "./ContactForm";

export function ContactFormWithRecaptcha() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      <ContactForm />
    </GoogleReCaptchaProvider>
  );
}
