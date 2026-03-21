import React from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';

const Contact = () => {
  const whatsappNumber = "917827372844"; 
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi Ghoomo Saste Me! I want to inquire about a trip.`;

  return (
    <main className="pt-[130px] pb-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-[#1a2b4c] uppercase italic tracking-tighter mb-4">
            Get In Touch
          </h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest">
            We're here to help you plan your next budget adventure
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* --- CONTACT INFO --- */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-black text-[#1a2b4c] mb-6 uppercase italic">Contact Information</h3>
              
              <div className="space-y-6">
                <a href={whatsappLink} target="_blank" rel="noreferrer" 
                   className="flex items-center gap-4 group cursor-pointer">
                  <div className="bg-green-100 p-3 rounded-2xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">WhatsApp Support</p>
                    <p className="font-bold text-[#1a2b4c]">+91 7827372844</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Email Us</p>
                    <p className="font-bold text-[#1a2b4c]">gmsindiaproject@gmail.com</p>
                    <p className="font-bold text-[#1a2b4c]">support@ghoomosasteme.com</p>
                    
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-2xl text-purple-600">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Our Base</p>
                    <p className="font-bold text-[#1a2b4c]">Dehradun, Uttarakhand </p>
                  </div>
                </div>
              </div>
            </div>

            {/* --- WHATSAPP CTA --- */}
            <a href={whatsappLink} target="_blank" rel="noreferrer"
               className="block bg-green-500 hover:bg-green-600 text-white p-6 rounded-3xl text-center shadow-lg transition-all transform hover:-translate-y-1">
              <MessageCircle className="mx-auto mb-2" size={32} />
              <p className="font-black uppercase italic text-xl">Chat on WhatsApp</p>
              <p className="text-sm opacity-90">Instant reply for bookings & queries</p>
            </a>
          </div>

          {/* --- CONTACT FORM --- */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase text-gray-400 mb-2">Full Name</label>
                  <input type="text" className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter Your Name" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-gray-400 mb-2">Phone Number</label>
                  <input type="text" className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="+91 ..." />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2">Message</label>
                <textarea rows="4" className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Tell us about your dream trip..."></textarea>
              </div>
              <button className="w-full bg-[#1a2b4c] text-white py-5 rounded-2xl font-black uppercase italic tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 transition-all">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;