import React from "react";

const Career = () => {
  return (
    <main className="pt-[115px] bg-white">

      {/* --- HERO SECTION --- */}
      <section className="bg-[#1a2b4c] py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
            Career With Us
          </h1>
          <p className="text-blue-200 text-lg md:text-xl max-w-3xl mx-auto font-bold uppercase tracking-widest">
            Join Our Team & Travel The World
          </p>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 text-gray-600 leading-relaxed text-center">

          <p className="mb-6">
            We are always looking for passionate travelers and talented
            individuals who want to build amazing travel experiences.
          </p>

          <p className="mb-6">
            If you love travel, adventure, and community building,
            we would love to hear from you.
          </p>

          <p className="font-semibold text-lg text-[#1a2b4c]">
            Send your resume to:
          </p>

          <p className="text-blue-600 font-semibold mt-2 text-lg">
            gmsindiaproject@gmail.com
          </p>

        </div>
      </section>

    </main>
  );
};

export default Career;