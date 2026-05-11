import { Resend } from "resend";
import { NextResponse } from "next/server";

// Lazily instantiated so build-time collection doesn't require the env var
function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

// Strip HTML tags and limit length to prevent injection
function sanitize(value: unknown, maxLen = 2000): string {
  if (typeof value !== "string") return "";
  return value.replace(/<[^>]*>/g, "").trim().slice(0, maxLen);
}

// Allowed field values — reject anything outside these sets
const ALLOWED_ENGAGEMENT = new Set(["full-time", "contract", "project", "retainer", ""]);
const ALLOWED_PLATFORM = new Set(["nextjs", "wordpress", "shopify", "elementor", "woocommerce", "headless", "custom", "unsure", "other"]);
const ALLOWED_BUDGET = new Set(["under-5k", "5k-15k", "15k-50k", "50k-plus", "salary", ""]);
const ALLOWED_TIMELINE = new Set(["asap", "1-month", "1-3-months", "flexible", ""]);

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.warn("[contact] RECAPTCHA_SECRET_KEY not set — skipping verification");
    return true;
  }
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });
  const data = await res.json() as { success: boolean; score?: number; action?: string };
  // Require score >= 0.5 (0 = bot, 1 = human)
  return data.success && (data.score ?? 0) >= 0.5;
}

export async function POST(request: Request) {
  // ── Origin check ────────────────────────────────────────────────────────────
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const origin = request.headers.get("origin") ?? "";
  const host = request.headers.get("host") ?? "";
  const isLocalDev = host.startsWith("localhost") || host.startsWith("127.0.0.1");
  const isSameHost = origin === `https://${host}` || origin === `http://${host}`;
  const isAllowedOrigin =
    isLocalDev ||
    isSameHost ||
    (siteUrl && origin === siteUrl) ||
    origin.endsWith(".vercel.app");
  if (!isAllowedOrigin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // ── Parse body ───────────────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const data = body as Record<string, unknown>;

  // ── Honeypot ─────────────────────────────────────────────────────────────────
  // Bots fill hidden fields; real users never see it
  if (data._hp && typeof data._hp === "string" && data._hp.length > 0) {
    // Return 200 to not reveal the trap
    return NextResponse.json({ ok: true });
  }

  // ── reCAPTCHA v3 ─────────────────────────────────────────────────────────────
  const recaptchaToken = sanitize(data.recaptchaToken, 2048);
  if (!recaptchaToken) {
    return NextResponse.json({ error: "Missing security token" }, { status: 422 });
  }
  const recaptchaOk = await verifyRecaptcha(recaptchaToken);
  if (!recaptchaOk) {
    return NextResponse.json({ error: "Security check failed" }, { status: 422 });
  }

  // ── Field validation ─────────────────────────────────────────────────────────
  const name = sanitize(data.name, 100);
  const email = sanitize(data.email, 254);

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 422 });
  }

  const company = sanitize(data.company, 100);
  const engagementType = sanitize(data.engagementType, 50);
  if (!ALLOWED_ENGAGEMENT.has(engagementType)) {
    return NextResponse.json({ error: "Invalid engagement type" }, { status: 422 });
  }

  const platform = Array.isArray(data.platform)
    ? data.platform
        .map((p) => sanitize(p, 50))
        .filter((p) => ALLOWED_PLATFORM.has(p))
        .join(", ")
    : "";

  const budget = sanitize(data.budget, 50);
  if (!ALLOWED_BUDGET.has(budget)) {
    return NextResponse.json({ error: "Invalid budget selection" }, { status: 422 });
  }

  const timeline = sanitize(data.timeline, 50);
  if (!ALLOWED_TIMELINE.has(timeline)) {
    return NextResponse.json({ error: "Invalid timeline selection" }, { status: 422 });
  }

  const currentStack = sanitize(data.currentStack, 500);
  const biggestChallenge = sanitize(data.biggestChallenge, 1000);
  const projectDescription = sanitize(data.projectDescription, 2000);

  // ── Send email ───────────────────────────────────────────────────────────────
  const emailBody = `
New inquiry from ${name}

── Contact ──────────────────────
Name:    ${name}
Email:   ${email}
Company: ${company || "—"}

── Project ──────────────────────
Engagement: ${engagementType || "—"}
Platforms:  ${platform || "—"}
Budget:     ${budget || "—"}
Timeline:   ${timeline || "—"}

── Technical context ─────────────
Current stack: ${currentStack || "—"}

Biggest challenge:
${biggestChallenge || "—"}

Project description:
${projectDescription || "—"}
`.trim();

  const { error } = await getResend().emails.send({
    from: "Cord Palmer Portfolio <hello@cordpalmer.com>",
    to: "cord@swrv.tech",
    replyTo: email,
    subject: `New inquiry from ${name}${company ? ` · ${company}` : ""}`,
    text: emailBody,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
