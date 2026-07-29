"use client";

import { useState, useTransition } from "react";
import { Bot, Send, Loader2, X, MessageCircle } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi! I'm your Seat Sathi AI assistant. Ask me anything about routes, schedules, bookings, or travel tips.",
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
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg shadow-red-500/30 flex items-center justify-center transition-colors"
        aria-label="Open AI Chat"
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-[#0d2447] border border-white/8 rounded-2xl shadow-2xl shadow-black/40 flex flex-col overflow-hidden">
          <div className="bg-[#10294f] px-4 py-3 flex items-center gap-3 border-b border-white/8">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
              <Bot className="text-red-500" size={16} />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">AI Travel Assistant</p>
              <p className="text-gray-400 text-xs">Online</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ maxHeight: "320px" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-red-600 text-white rounded-br-sm"
                      : "bg-[#06172e] text-white rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isPending && (
              <div className="flex justify-start">
                <div className="bg-[#06172e] rounded-xl rounded-bl-sm px-3 py-2">
                  <Loader2 className="text-gray-400 animate-spin" size={14} />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="border-t border-white/8 px-3 py-3 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              disabled={isPending}
              className="flex-1 bg-[#06172e] border border-white/8 rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-600 outline-none focus:border-red-500/50 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isPending || !input.trim()}
              className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white p-2 rounded-lg transition-colors shrink-0"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}