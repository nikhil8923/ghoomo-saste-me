import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

// Exact FAQs from your reference document
const faqsData = [
  {
    question: 'How is the trip possible in just ₹5000?',
    answer: 'We plan smart budget trips using shared transport, affordable stays, and proper travel planning. Our aim is to make travel possible for everyone without spending too much.'
  },
  {
    question: 'What is included in the ₹5000 trip?',
    answer: 'Most budget trips include budget accommodation, complete travel itinerary, destination guidance, and group coordination. Some packages may include shared transport and meals depending on the destination.'
  },
  {
    question: 'Are these trips safe for solo travellers and girls?',
    answer: 'Yes. Safety is our priority. Many solo and female travellers travel with our guidance. We suggest safe stays, group travel options, and trusted routes for a secure experience.'
  },
  {
    question: 'Which destinations do you provide under ₹5000?',
    answer: 'We offer budget trips to Manali, Kedarnath, Chopta Tungnath, Rishikesh, Udaipur, and Kasol. New destinations are added regularly.'
  },
  {
    question: 'Is transport included in ₹5000?',
    answer: 'Some trips include shared transport while some are land packages only. Everything is clearly explained before booking so there is full transparency.'
  }
];

const FAQ = () => {
  // This state keeps track of which FAQ is currently open
  const [openIndex, setOpenIndex] = useState(0); // Default to the first one open

  const toggleFAQ = (index) => {
    // If clicking the one that's already open, close it. Otherwise, open the new one.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Section Heading */}
        <div className="text-center mb-12 flex flex-col items-center">
          <HelpCircle size={48} className="text-blue-600 mb-4" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1a2b4c] mb-4">
            FAQs: Have Any Doubts?
          </h2>
          <div className="w-24 h-1.5 bg-yellow-400 rounded-full"></div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqsData.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                >
                  <span className={`font-bold text-lg md:text-xl pr-4 ${isOpen ? 'text-blue-600' : 'text-gray-800'}`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 p-2 rounded-full transition-colors ${isOpen ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'}`}>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {/* Answer Area (Expands/Collapses) */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;