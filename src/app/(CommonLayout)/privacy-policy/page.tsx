import React from 'react';
import { Shield, Lock, Eye, Globe } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="py-24 bg-transparent min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-orange-500/10 rounded-2xl mb-6 border border-orange-500/20">
            <Shield className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-400">Last Updated: May 4, 2026</p>
        </div>

        <div className="space-y-12 text-gray-300">
          <section className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Lock className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-white">Introduction</h2>
            </div>
            <p className="leading-relaxed">
              At Skill Bridge, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information when you use our platform. We are committed to ensuring that your data is handled with the highest level of security and transparency.
            </p>
          </section>

          <section className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Eye className="w-6 h-6 text-purple-500" />
              </div>
              <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
            </div>
            <ul className="space-y-4 list-disc list-inside">
              <li><span className="text-white font-medium">Personal Information:</span> Name, email address, phone number, and profile picture.</li>
              <li><span className="text-white font-medium">Usage Data:</span> Information about how you interact with our platform, including session duration and pages visited.</li>
              <li><span className="text-white font-medium">Payment Data:</span> We use secure third-party payment processors. We do not store your full credit card details.</li>
              <li><span className="text-white font-medium">Communication:</span> Transcripts of messages between tutors and students for safety and quality assurance.</li>
            </ul>
          </section>

          <section className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all duration-300">
             <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Globe className="w-6 h-6 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
            </div>
            <p className="leading-relaxed mb-4">
              We use the collected information for various purposes:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="bg-white/5 p-4 rounded-xl border border-white/10">To provide and maintain our Service</li>
              <li className="bg-white/5 p-4 rounded-xl border border-white/10">To notify you about changes</li>
              <li className="bg-white/5 p-4 rounded-xl border border-white/10">To provide customer support</li>
              <li className="bg-white/5 p-4 rounded-xl border border-white/10">To gather analysis or valuable information</li>
            </ul>
          </section>

          <section className="text-center py-12 border-t border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Questions about our Privacy Policy?</h3>
            <p className="text-gray-400 mb-8">If you have any questions, please contact us at privacy@skillbridge.com</p>
            <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20">
              Contact Privacy Team
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
