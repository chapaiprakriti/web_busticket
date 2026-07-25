import Link from "next/link";
import { Mail, Phone, MessageCircle, HelpCircle, FileText, RefreshCw } from "lucide-react";

export default function SupportPage() {
  const faqs = [
    { q: "How do I cancel my booking?", a: "Go to My Trips, find your booking, and click on View Details. Cancellation is available up to 2 hours before departure." },
    { q: "How long does refund take?", a: "Refunds are processed within 5–7 business days to your original payment method." },
    { q: "Can I change my seat after booking?", a: "Seat changes are subject to availability. Contact our support team for assistance." },
    { q: "What if my bus is delayed?", a: "In case of delays, you'll receive an SMS and email notification. Check the app for live updates." },
  ];

  return (
    <div className="min-h-screen bg-[#071b38] px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-white">Help & Support</h1>
          <p className="text-gray-400 mt-2">We're here to help you with your journey.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: <Mail size={22} className="text-red-400" />, label: "Email Us", val: "support@seatsathi.com" },
            { icon: <Phone size={22} className="text-orange-400" />, label: "Call Us", val: "+977 9800000000" },
            { icon: <MessageCircle size={22} className="text-green-400" />, label: "Live Chat", val: "Available 24/7" },
          ].map((c) => (
            <div key={c.label} className="bg-[#0d2447] border border-white/8 rounded-2xl p-5 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#1a3356] flex items-center justify-center mx-auto mb-3">{c.icon}</div>
              <p className="font-semibold text-white text-sm mb-1">{c.label}</p>
              <p className="text-xs text-gray-400">{c.val}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#0d2447] border border-white/8 rounded-2xl p-6">
          <h2 className="font-bold text-white text-lg mb-5 flex items-center gap-2"><HelpCircle size={18} className="text-orange-400" /> Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                <p className="font-semibold text-white text-sm mb-1">{f.q}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-red-400 hover:text-red-300 text-sm font-medium">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
