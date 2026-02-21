import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', fontWeight: '600', fontSize: '1.1rem' }}
      >
        <span>{question}</span>
        <span>{isOpen ? '−' : '+'}</span>
      </div>
      {isOpen && (
        <div style={{ marginTop: '10px', color: '#555', lineHeight: '1.6' }}>
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const faqData = [
    {
      question: "Is there any hidden charges?",
      answer: "No. We believe in transparency. If anything is not included (like personal expenses or entry tickets), we clearly inform you before booking."
    },
    {
      question: "How can I trust before booking?",
      answer: "You can talk with us directly on WhatsApp, check our travel updates/posts, and ask for complete trip details. We guide you properly before taking any booking."
    },
    {
      question: "Do you provide support during the trip?",
      answer: "Yes. We stay connected with our travellers and guide them throughout the journey for any help regarding stays, routes, or travel tips."
    },
    {
      question: "Who are these trips best for?",
      answer: "Our trips are best for students, middle-class travellers, solo travellers, and couples who want to travel more while spending less."
    }
  ];

  return (
    <section style={{ padding: '80px 50px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2.2rem', marginBottom: '40px' }}>Frequently Asked Questions</h2>
      <div style={{ background: '#fff', borderRadius: '15px', padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        {faqData.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
};

export default FAQ;