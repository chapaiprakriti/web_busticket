"use client";

import { useState, useTransition } from "react";
import { MapPin, Route, Calendar, Search, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type RouteSuggestion = {
  from: string;
  to: string;
  date: string;
  reason: string;
};

export default function AIRoutesPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
  });
  const [suggestions, setSuggestions] = useState<RouteSuggestion[]>([]);
  const [isPending, startTransition] = useTransition();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.from.trim() || !formData.to.trim()) return;

    setHasSearched(true);
    setSuggestions([]);

    startTransition(async () => {
      const res = await fetch("/api/ai-routes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: formData.from.trim(),
          to: formData.to.trim(),
          date: formData.date || new Date().toISOString().split("T")[0],
        }),
      });

      if (!res.ok) {
        setSuggestions([
          {
            from: formData.from.trim(),
            to: formData.to.trim(),
            date: formData.date || new Date().toISOString().split("T")[0],
            reason: "Unable to get AI suggestions. Please try searching directly.",
          },
        ]);
        return;
      }

      const data = await res.json();
      if (data.suggestions && data.suggestions.length > 0) {
        setSuggestions(data.suggestions);
      } else {
        setSuggestions([
          {
            from: formData.from.trim(),
            to: formData.to.trim(),
            date: formData.date || new Date().toISOString().split("T")[0],
            reason: "No specific suggestions available. You can book directly with the search above.",
          },
        ]);
      }
    });
  };

  const handleBookSuggestion = (suggestion: RouteSuggestion) => {
    router.push(`/book?from=${encodeURIComponent(suggestion.from)}&to=${encodeURIComponent(suggestion.to)}&date=${suggestion.date}`);
  };

  return (
    <div className="min-h-screen bg-[#071b38]">
      <header className="bg-[#0d2447] border-b border-white/8 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
            <Route className="text-red-500" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">AI Route Planner</h1>
            <p className="text-xs text-gray-400">Get smart route suggestions for your journey</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="bg-[#0d2447] rounded-2xl border border-white/8 p-6 mb-8">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Search size={18} className="text-red-500" />
              Plan Your Trip
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="text"
                  placeholder="From (city/station)"
                  value={formData.from}
                  onChange={(e) => setFormData((prev) => ({ ...prev, from: e.target.value }))}
                  className="w-full bg-[#06172e] border border-white/8 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-red-500/50"
                  required
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="text"
                  placeholder="To (city/station)"
                  value={formData.to}
                  onChange={(e) => setFormData((prev) => ({ ...prev, to: e.target.value }))}
                  className="w-full bg-[#06172e] border border-white/8 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-red-500/50"
                  required
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                  className="w-full bg-[#06172e] border border-white/8 rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-red-500/50"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Planning...
                </>
              ) : (
                <>
                  <Search size={18} />
                  Find Routes
                </>
              )}
            </button>
          </form>

          {hasSearched && suggestions.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">Suggested Routes</h3>
              {suggestions.map((suggestion, i) => (
                <div
                  key={i}
                  className="bg-[#0d2447] rounded-2xl border border-white/8 p-5 hover:border-red-500/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                      <Route className="text-red-500" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-white text-sm mb-2">
                        <span className="font-semibold">{suggestion.from}</span>
                        <Route size={14} className="text-gray-500" />
                        <span className="font-semibold">{suggestion.to}</span>
                      </div>
                      <p className="text-gray-300 text-xs mb-3">{suggestion.reason}</p>
                      <button
                        onClick={() => handleBookSuggestion(suggestion)}
                        className="bg-red-500/15 hover:bg-red-500/25 text-red-400 text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                      >
                        Book This Route
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!hasSearched && (
            <div className="bg-[#0d2447] rounded-2xl border border-white/8 p-6 text-center">
              <Route className="text-gray-500 mx-auto mb-3" size={32} />
              <p className="text-gray-400 text-sm">Enter your travel details above to get AI-powered route suggestions.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}