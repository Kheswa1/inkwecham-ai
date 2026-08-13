"use client";

import { useEffect, useMemo, useState } from "react";

const capabilities = [
  "Chat with ChamAI",
  "Generate quotes",
  "Create marketing content",
  "Design campaigns",
  "Organize projects",
  "Automate workflows",
  "Manage documents",
];

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Welcome to InkweCham. I’m ChamAI — your business assistant. How can I help you move without limits?",
    },
  ]);
  const [input, setInput] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
  }, []);

  const preferredVoice = useMemo(
    () => voices.find((voice) => /en-ZA|en-GB|en-US/i.test(voice.lang)) ?? voices[0],
    [voices]
  );

  function speak(text: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.rate = 0.98;
    utterance.pitch = 1;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }

  function sendMessage(event: React.FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    const response = `I can help with “${text}”. This workspace is ready for quotes, campaigns, projects, documents and business automation.`;
    setMessages((current) => [
      ...current,
      { role: "user", text },
      { role: "assistant", text: response },
    ]);
    setInput("");
  }

  return (
    <main className="min-h-screen bg-[#07110d] text-white">
      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <nav className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <div className="text-xl font-black tracking-[0.18em]">INKWECHAM</div>
            <div className="mt-1 text-xs uppercase tracking-[0.3em] text-white/45">Move Without Limits.</div>
          </div>
          <div className="flex items-center gap-3">
            <a className="rounded-full border border-white/15 px-5 py-2 text-sm hover:bg-white/10" href="/auth/login">Sign in</a>
            <a className="rounded-full border border-white/15 px-5 py-2 text-sm hover:bg-white/10" href="#workspace">Open AI Workspace</a>
          </div>
        </nav>

        <div className="grid gap-12 py-20 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-emerald-300">AI-powered business platform</p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">Move Without Limits.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65">
              InkweCham brings your AI workspace, products, automation, creative tools and customer operations into one platform.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {capabilities.slice(0, 4).map((item) => (
                <span key={item} className="rounded-full bg-white/7 px-4 py-2 text-sm text-white/70">{item}</span>
              ))}
            </div>
          </div>

          <div id="workspace" className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">ChamAI Workspace</p>
                <p className="text-xs text-white/40">Your AI business assistant</p>
              </div>
              <span className="flex items-center gap-2 text-xs text-emerald-300"><span className="h-2 w-2 rounded-full bg-emerald-300" /> Online</span>
            </div>

            <div className="max-h-[390px] space-y-4 overflow-auto rounded-2xl bg-black/20 p-4">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={message.role === "user" ? "ml-8" : "mr-8"}>
                  <div className={`rounded-2xl p-4 text-sm leading-6 ${message.role === "user" ? "bg-white/10" : "bg-emerald-400/10"}`}>
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">{message.role === "user" ? "You" : "ChamAI"}</div>
                    {message.text}
                  </div>
                  {message.role === "assistant" && (
                    <button type="button" onClick={() => (speaking ? stopSpeaking() : speak(message.text))} aria-label={speaking ? "Stop AI response audio" : "Play AI response audio"} className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/65 hover:bg-white/10">
                      <span aria-hidden="true">{speaking ? "■" : "🔊"}</span>
                      {speaking ? "Stop voice" : "Listen"}
                    </button>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={sendMessage} className="mt-4 flex gap-2">
              <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask ChamAI anything..." className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm outline-none placeholder:text-white/25 focus:border-emerald-300/40" />
              <button className="rounded-full bg-white px-5 py-3 text-sm font-bold text-black hover:bg-white/90" type="submit">Send</button>
            </form>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/15 px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["AI Workspace", "Products & Orders", "Founder Command Center", "Automation Hub", "Creative Studio", "Customer Portal", "Payments & Delivery", "Business Insights"].map((item) => (
            <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
              <p className="font-semibold">{item}</p>
              <p className="mt-2 text-sm text-white/40">Built into the InkweCham operating platform.</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
