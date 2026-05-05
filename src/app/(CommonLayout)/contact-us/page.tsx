"use client"

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Message Transmitted Successfully!", {
      description: "Our core team will analyze your inquiry and respond within 24 hours.",
      className: "bg-[#0d0d1a] text-white border-white/10",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="py-24 bg-transparent min-h-screen animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-orange-400 via-white to-purple-500 bg-clip-text text-transparent tracking-tighter">
            Initiate Contact
          </h1>
          <p className="text-white/40 text-xl max-w-3xl mx-auto font-medium italic">
            Have questions about the SkillBridge ecosystem? Our support nodes are active and ready to assist your trajectory.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:border-orange-500/30 transition-all group backdrop-blur-xl">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Mail className="text-orange-500" />
                </div>
                <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Direct Channel</h3>
                <p className="text-white/40 text-sm font-medium">support@skillbridge.com</p>
                <p className="text-white/40 text-sm font-medium">ops@skillbridge.com</p>
              </div>

              <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:border-purple-500/30 transition-all group backdrop-blur-xl">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Phone className="text-purple-500" />
                </div>
                <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Voice Uplink</h3>
                <p className="text-white/40 text-sm font-medium">+1 (555) 123-4567</p>
                <p className="text-white/40 text-sm font-medium italic uppercase text-[10px] tracking-widest mt-2">Available 09:00 - 18:00 PST</p>
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:border-blue-500/30 transition-all group backdrop-blur-xl">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform border border-blue-500/20">
                  <MapPin className="text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Ground Station</h3>
                  <p className="text-white/40 font-medium">123 Innovation Drive, Suite 400</p>
                  <p className="text-white/40 font-medium">San Francisco, CA 94103</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-orange-500/5 to-purple-500/5 border border-white/10 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                    <Clock size={100} />
                </div>
                <h4 className="text-lg font-black mb-6 flex items-center gap-2 uppercase tracking-widest text-white/60">
                    <Clock size={20} className="text-orange-500" /> Operational Status
                </h4>
                <div className="space-y-4 text-white/40 font-bold uppercase text-[10px] tracking-[0.2em]">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span>Standard Protocol (Mon-Fri)</span>
                        <span className="text-emerald-500">24 HOURS</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Weekend Maintenance</span>
                        <span className="text-orange-400">10:00 - 16:00</span>
                    </div>
                </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-12 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-2xl relative overflow-hidden shadow-2xl group">
             <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
                <Send size={150} className="text-orange-500 rotate-12" />
             </div>
             
             <div className="relative z-10">
                <h2 className="text-4xl font-black mb-10 flex items-center gap-4 tracking-tighter uppercase">
                    <MessageSquare className="text-orange-500 size-10" /> Transmission
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Identity</label>
                            <Input required placeholder="Full Name" className="bg-[#0d0d1a] border-white/10 h-16 rounded-2xl focus:border-orange-500 focus:ring-orange-500/20 text-white font-bold placeholder:text-white/10" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Email Uplink</label>
                            <Input required type="email" placeholder="john@example.com" className="bg-[#0d0d1a] border-white/10 h-16 rounded-2xl focus:border-orange-500 focus:ring-orange-500/20 text-white font-bold placeholder:text-white/10" />
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Transmission Subject</label>
                        <Input required placeholder="How can we help?" className="bg-[#0d0d1a] border-white/10 h-16 rounded-2xl focus:border-orange-500 focus:ring-orange-500/20 text-white font-bold placeholder:text-white/10" />
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Core Content</label>
                        <Textarea 
                            required
                            rows={6}
                            placeholder="Synthesize your message here..."
                            className="bg-[#0d0d1a] border-white/10 rounded-3xl p-6 focus:border-orange-500 focus:ring-orange-500/20 text-white font-medium italic resize-none placeholder:text-white/10"
                        />
                    </div>
                    
                    <Button 
                        disabled={isSubmitting}
                        className="w-full h-16 rounded-3xl bg-gradient-to-r from-orange-500 to-purple-600 hover:opacity-90 font-black text-xl tracking-widest shadow-2xl shadow-orange-500/20 group uppercase flex items-center justify-center gap-3 transition-all"
                    >
                        {isSubmitting ? (
                            <Loader2 className="animate-spin size-6" />
                        ) : (
                            <>
                                Broadcast <Send size={20} className="group-hover:translate-x-2 transition-transform" />
                            </>
                        )}
                    </Button>
                </form>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
