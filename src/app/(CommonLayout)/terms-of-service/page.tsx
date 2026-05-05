import React from 'react';
import { FileText, CheckCircle2, AlertCircle, Info } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="py-24 bg-transparent min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl mb-6 border border-blue-500/20">
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-400 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Effective Date: May 4, 2026</p>
        </div>

        <div className="space-y-8 text-gray-700 dark:text-gray-300">
           <div className="p-1 rounded-2xl bg-gradient-to-r from-orange-500/20 to-purple-500/20 shadow-sm dark:shadow-none">
            <div className="bg-slate-50 dark:bg-[#0a0a14] p-8 rounded-2xl">
                <div className="flex items-start gap-4">
                    <Info className="text-orange-500 shrink-0 mt-1" />
                    <p className="text-lg italic">
                        Please read these terms carefully before using our platform. By accessing or using Skill Bridge, you agree to be bound by these terms and all terms incorporated by reference.
                    </p>
                </div>
            </div>
           </div>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. User Eligibility</h2>
            </div>
            <p className="pl-9 leading-relaxed">
              You must be at least 13 years of age to use this Service. If you are under 18, you may only use the Service with the involvement and consent of a parent or legal guardian.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Account Responsibility</h2>
            </div>
            <p className="pl-9 leading-relaxed">
              You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Tutor-Student Interaction</h2>
            </div>
            <p className="pl-9 leading-relaxed">
              Skill Bridge provides a platform for tutors and students to connect. We do not guarantee the quality or accuracy of the tutoring sessions. Users are encouraged to use our review system to provide feedback.
            </p>
          </section>

          <section className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20 shadow-sm dark:shadow-none">
             <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-red-500" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Prohibited Conduct</h2>
            </div>
            <ul className="space-y-2 list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
              <li>Sharing personal contact information outside the platform.</li>
              <li>Harassment or abusive behavior towards other users.</li>
              <li>Academic dishonesty or cheating.</li>
              <li>Attempting to bypass our payment system.</li>
            </ul>
          </section>

           <section className="space-y-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. Termination</h2>
            </div>
            <p className="pl-9 leading-relaxed">
              We reserve the right to terminate or suspend your account at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users of the platform.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
