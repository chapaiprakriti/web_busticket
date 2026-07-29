"use client";

import { useState, useTransition } from "react";
import { Bot, Send, Loader2, MessageCircle } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hello! I'm your Seat Sathi travel assistant. How can I help you today? You can ask me about bus routes, schedules, fares, or booking assistance.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");

    startTransition(async () => {
      setMessages((prev) => [...prev, { role: "user", text: userMessage }]);

      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

if (!res.ok) {
         const data = await res.json().catch(() => null);
         setMessages((prev) => [
           ...prev,
           {
             role: "assistant",
             text: data?.reply || "Sorry, I'm having trouble connecting right now. Please try again later.",
           },
         ]);
         return;
       }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply || "I'm sorry, I didn't understand that." },
      ]);
    });
  };

  return (
    <div className="min-h-screen bg-[#071b38] flex flex-col">
      <header className="bg-[#0d2447] border-b border-white/8 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
            <Bot className="text-red-500" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">AI Travel Assistant</h1>
            <p className="text-xs text-gray-400">Ask about routes, schedules, and bookings</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-red-600 text-white rounded-br-md"
                    : "bg-[#0d2447] border border-white/8 text-white rounded-bl-md"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isPending && (
            <div className="flex justify-start">
              <div className="bg-[#0d2447] border border-white/8 rounded-2xl rounded-bl-md px-4 py-3">
                <Loader2 className="text-gray-400 animate-spin" size={16} />
              </div>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSend} className="bg-[#0d2447] border-t border-white/8 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            disabled={isPending}
            className="flex-1 bg-[#06172e] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-red-500/50 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isPending || !input.trim()}
            className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white p-3 rounded-xl transition-colors shrink-0"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}