import Link from "next/link";
import { Bus } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#060f1e] border-t border-white/5 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <Bus size={16} className="text-white" />
              </div>
              <span className="font-bold text-white text-lg">Seat Sathi</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Redefining bus travel in Nepal with modern technology and
              customer-centric services. Booking a ticket has never been easier.
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.41c1.39.07 2.35.75 3.16.8 1.2-.24 2.35-.93 3.64-.84 1.56.12 2.73.72 3.5 1.9-3.23 1.88-2.68 5.96.6 7.17-.59 1.31-1.36 2.61-2.9 3.84zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                App Store
              </span>
              <span className="flex items-center gap-1">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M3.18 23.76c.3.17.64.24.99.2l12.24-12.24-2.83-2.83L3.18 23.76zm16.7-13.37L17.3 8.82l-1.83 1.83 2.58 2.58 1.83-1.84zM2.52.7C2.19.97 2 1.4 2 1.96v20.08c0 .56.19.99.52 1.26l.07.06 11.26-11.26v-.27L2.59.64 2.52.7zm17.76 9.62l-2.49-1.43-2.06 2.06 2.06 2.06 2.51-1.44c.71-.41.71-1.07-.02-1.25z" />
                </svg>
                Google Play
              </span>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Careers", "Blog", "Press"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-3">
              {["Help Center", "Contact Us", "FAQs", "Terms"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Refund Policy", "Cookie Policy"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <p>© 2024 Seat Sathi. All rights reserved.</p>
          <p>Made with ❤ for Nepal</p>
        </div>
      </div>
    </footer>
  );
}
