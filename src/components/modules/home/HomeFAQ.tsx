"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How do I book a session with a tutor?",
    a: "Simply browse our tutor directory, choose a tutor that matches your needs, select an available time slot from their calendar, and confirm your booking. You'll receive a confirmation email instantly.",
  },
  {
    q: "Are all tutors verified and background-checked?",
    a: "Yes. Every tutor on SkillBridge undergoes a rigorous vetting process including identity verification, qualification checks, and a skills assessment before they can start teaching on the platform.",
  },
  {
    q: "What subjects are available on SkillBridge?",
    a: "We cover 50+ subjects across Mathematics, Sciences, Languages, Programming, Test Prep (SAT, IELTS, GMAT), Arts, Business, and more. New subjects are added regularly based on student demand.",
  },
  {
    q: "Can I cancel or reschedule a booking?",
    a: "Yes. You can cancel or reschedule a session up to 24 hours before the session start time at no charge. Late cancellations may be subject to a partial fee as outlined in our booking policy.",
  },
  {
    q: "How does payment work?",
    a: "Payments are processed securely through our platform at the time of booking. We accept all major credit/debit cards. Tutors are paid after each successful session, and students can view all transaction history in their dashboard.",
  },
  {
    q: "Can I become a tutor on SkillBridge?",
    a: "Absolutely! Click 'Become a Tutor' and complete the application. After review and approval (typically 2–3 business days), you can set your availability, subjects, and hourly rate and start accepting bookings.",
  },
];

export const HomeFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-slate-50 dark:bg-gradient-to-br dark:from-[#0a0a14] dark:via-[#0d0d1a] dark:to-[#0a0a14] relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs tracking-widest font-bold uppercase mb-4">
            <HelpCircle size={14} /> Frequently Asked
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
            Got <span className="bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-500 bg-clip-text text-transparent">Questions?</span>
          </h2>
          <p className="text-gray-600 dark:text-white/40 max-w-xl mx-auto text-lg">
            Everything you need to know about SkillBridge. Can't find your answer?{" "}
            <a href="/contact-us" className="text-orange-400 hover:text-orange-300 underline-offset-2 underline transition-colors">
              Contact our team.
            </a>
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === i
                  ? "border-orange-500/40 bg-orange-500/5 shadow-lg shadow-orange-500/5"
                  : "border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-gray-300 dark:hover:border-white/20"
              }`}
            >
              <button
                className="w-full text-left flex items-center justify-between gap-4 p-6"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="text-gray-900 dark:text-white font-bold text-lg leading-tight">{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-orange-500 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`px-6 transition-all duration-300 ease-in-out ${
                  openIndex === i ? "pb-6 max-h-48 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <p className="text-gray-600 dark:text-white/60 leading-relaxed text-base border-t border-gray-100 dark:border-white/5 pt-4">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
