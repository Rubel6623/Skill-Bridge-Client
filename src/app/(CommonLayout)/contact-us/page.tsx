import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactUs = () => {
  return (
    <div className="py-24 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-orange-400 via-white to-purple-500 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Have questions about Skill Bridge? Our team is here to help you succeed. Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Mail className="text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="text-gray-400 text-sm">support@skillbridge.com</p>
                <p className="text-gray-400 text-sm">info@skillbridge.com</p>
              </div>

              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Phone className="text-purple-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
                <p className="text-gray-400 text-sm">Mon-Fri: 9am - 6pm PST</p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all group">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Our Office</h3>
                  <p className="text-gray-400">123 Innovation Drive, Suite 400</p>
                  <p className="text-gray-400">San Francisco, CA 94103</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-orange-500/10 to-purple-500/10 border border-white/5">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Clock size={20} className="text-orange-500" /> Support Hours
                </h4>
                <div className="space-y-2 text-gray-400">
                    <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>24 Hours</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Saturday - Sunday</span>
                        <span>10:00 AM - 4:00 PM</span>
                    </div>
                </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-10 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 p-10 opacity-10">
                <Send size={120} className="text-orange-500 rotate-12" />
             </div>
             
             <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <MessageSquare className="text-orange-500" /> Send a Message
                </h2>
                
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">Full Name</label>
                            <Input placeholder="John Doe" className="bg-white/5 border-white/10 h-14 rounded-2xl focus:border-orange-500" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
                            <Input type="email" placeholder="john@example.com" className="bg-white/5 border-white/10 h-14 rounded-2xl focus:border-orange-500" />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 ml-1">Subject</label>
                        <Input placeholder="How can we help?" className="bg-white/5 border-white/10 h-14 rounded-2xl focus:border-orange-500" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 ml-1">Message</label>
                        <Textarea 
                            rows={5}
                            placeholder="Tell us more about your inquiry..."
                            className="bg-white/5 border-white/10 rounded-2xl p-4 focus:border-orange-500 text-white"
                        />
                    </div>
                    
                    <Button className="w-full h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 font-bold text-lg shadow-xl shadow-orange-500/20 group">
                        Send Message <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
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
