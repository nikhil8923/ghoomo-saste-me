import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="pt-[115px] bg-white">

      {/* --- HERO SECTION --- */}
      <section className="bg-[#1a2b4c] py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
            Privacy Policy
          </h1>
          <p className="text-blue-200 text-lg md:text-xl max-w-3xl mx-auto font-bold uppercase tracking-widest">
            Your Privacy Matters To Us
          </p>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 text-gray-600 leading-relaxed">
          
          <p className="mb-6">
            At Ghoomo Saste Me, we respect your privacy and are committed to
            protecting your personal information.
          </p>

          <h2 className="text-2xl font-bold text-[#1a2b4c] mt-6 mb-2">
            Information We Collect
          </h2>
          <p className="mb-4">
            We may collect personal information such as your name, phone number,
            email address, and travel preferences when you fill out a form,
            contact us, or book a trip with us.
          </p>

          <h2 className="text-2xl font-bold text-[#1a2b4c] mt-6 mb-2">
            How We Use Your Information
          </h2>
          <p className="mb-4">
            Your information is used only for booking, communication, customer
            support, and improving our services. We do not sell, trade, or share
            your personal information with third parties.
          </p>

          <h2 className="text-2xl font-bold text-[#1a2b4c] mt-6 mb-2">
            Data Security
          </h2>
          <p className="mb-4">
            We take appropriate security measures to protect your personal data
            from unauthorized access, misuse, or disclosure.
          </p>

          <h2 className="text-2xl font-bold text-[#1a2b4c] mt-6 mb-2">
            Consent
          </h2>
          <p>
            By using our website, you consent to our Privacy Policy and agree to
            its terms.
          </p>

        </div>
      </section>

    </main>
  );
};

export default PrivacyPolicy;