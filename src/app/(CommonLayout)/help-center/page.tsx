import React from 'react';
import Link from 'next/link';
import { Search, Book, MessageCircle, HelpCircle, ArrowRight, UserPlus, GraduationCap, CreditCard } from 'lucide-react';
import { Input } from '@/components/ui/input';

const HelpCenter = () => {
  const categories = [
    { icon: UserPlus, title: "Getting Started", count: 12, description: "Learn how to create an account and set up your profile." },
    { icon: GraduationCap, title: "For Students", count: 18, description: "How to find tutors, book sessions, and leave reviews." },
    { icon: Book, title: "For Tutors", count: 15, description: "Managing your schedule, availability, and subjects." },
    { icon: CreditCard, title: "Payments & Refunds", count: 8, description: "Information about pricing, payments, and our refund policy." },
  ];

  const faqs = [
    { question: "How do I book a session?", answer: "To book a session, find a tutor you like, check their availability, and click the 'Book Now' button. Follow the prompts to confirm your time slot." },
    { question: "Can I cancel a booking?", answer: "Yes, you can cancel a booking from your dashboard at least 24 hours before the session start time for a full refund." },
    { question: "How do payments work?", answer: "We use secure payment processing. Tutors set their hourly rates, and you pay at the time of booking. Funds are held until the session is completed." },
  ];

  return (
    <div className="py-24 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Search */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white">How can we help?</h1>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input 
                placeholder="Search for articles, guides..." 
                className="h-16 pl-12 bg-white/5 border-white/10 rounded-2xl focus:ring-orange-500 focus:border-orange-500 text-lg shadow-2xl"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {categories.map((cat, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <cat.icon className="text-orange-500" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{cat.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{cat.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs font-medium text-orange-500 bg-orange-500/10 px-2 py-1 rounded-md">{cat.count} Articles</span>
                <ArrowRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto mb-24">
          <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3">
            <HelpCircle className="text-orange-500" /> Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-bold mb-3 text-white">{faq.question}</h4>
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Still need help? */}
        <div className="p-12 rounded-[40px] bg-gradient-to-r from-orange-500 to-purple-600 text-center relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
           </div>
           
           <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Still have questions?</h2>
                <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                    Can&apos;t find what you&apos;re looking for? Our friendly support team is always ready to assist you.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/contact-us" className="px-8 py-4 bg-white text-orange-500 font-bold rounded-2xl hover:bg-orange-50 transition-all flex items-center gap-2">
                        <MessageCircle size={20} /> Chat with Support
                    </Link>
                    <a href="mailto:support@skillbridge.com" className="px-8 py-4 bg-white/20 backdrop-blur-md text-white font-bold rounded-2xl hover:bg-white/30 transition-all border border-white/30 inline-block">
                        Email Us Directly
                    </a>
                </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
