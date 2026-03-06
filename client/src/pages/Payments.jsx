import React from 'react';
import { CreditCard, ShieldCheck, RefreshCcw, AlertCircle, CheckCircle2 } from 'lucide-react';

const Payments = () => {
  return (
    <main className="pt-[130px] pb-20 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-[#1a2b4c] uppercase italic tracking-tighter mb-4">
            Payment & Policies
          </h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest">
            Transparent bookings for your peace of mind
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* --- HOW TO PAY --- */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-[#1a2b4c] uppercase italic flex items-center gap-3">
              <CreditCard className="text-blue-600" /> How to Book
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                <p className="text-gray-700 font-medium">Select your dream trip and click "Book Now".</p>
              </div>
              <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                <p className="text-gray-700 font-medium">Pay a token amount (25-50%) to confirm your slot.</p>
              </div>
              <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                <p className="text-gray-700 font-medium">Receive a formal booking confirmation via WhatsApp/Email.</p>
              </div>
            </div>
          </div>

          {/* --- SECURITY --- */}
          <div className="bg-[#1a2b4c] text-white p-8 rounded-[32px] shadow-xl self-start">
            <ShieldCheck className="text-blue-400 mb-4" size={48} />
            <h3 className="text-2xl font-black uppercase italic mb-4">100% Secure Payments</h3>
            <p className="text-blue-100 mb-6">We use industry-standard encrypted gateways. Your financial safety is our top priority.</p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/10 px-4 py-2 rounded-lg text-xs font-bold uppercase">UPI / GPay</div>
              <div className="bg-white/10 px-4 py-2 rounded-lg text-xs font-bold uppercase">Cards</div>
              <div className="bg-white/10 px-4 py-2 rounded-lg text-xs font-bold uppercase">Net Banking</div>
            </div>
          </div>
        </div>

        {/* --- REFUND POLICY --- */}
        <section className="bg-red-50 p-8 md:p-12 rounded-[40px] border border-red-100">
          <div className="flex items-center gap-3 mb-8">
            <RefreshCcw className="text-red-600" size={32} />
            <h2 className="text-3xl font-black text-[#1a2b4c] uppercase italic tracking-tighter">Refund Policy</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-red-600 font-black italic uppercase">15+ Days Before</div>
              <p className="text-gray-600 text-sm font-bold">80% Refund of the booking amount.</p>
            </div>
            <div className="space-y-2 border-l-0 md:border-l border-red-200 md:pl-8">
              <div className="text-red-600 font-black italic uppercase">7-15 Days Before</div>
              <p className="text-gray-600 text-sm font-bold">50% Refund of the booking amount.</p>
            </div>
            <div className="space-y-2 border-l-0 md:border-l border-red-200 md:pl-8">
              <div className="text-red-600 font-black italic uppercase">Last 7 Days</div>
              <p className="text-gray-600 text-sm font-bold">No refund (Slots are locked and pre-paid).</p>
            </div>
          </div>
          <div className="mt-10 flex items-start gap-3 bg-white/50 p-4 rounded-2xl">
            <AlertCircle className="text-red-600 shrink-0" size={20} />
            <p className="text-xs text-gray-500 font-medium italic">
              *Refunds take 5-7 working days to process back to your original payment method.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Payments;