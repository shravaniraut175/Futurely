"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How do I create an account?",
    answer: "Click on 'Sign Up' at the top right and follow the instructions to register your account."
  },
  {
    question: "How do I reset my password?",
    answer: "Go to the login page and click 'Forgot Password'. Follow the steps to reset your password securely."
  },
  {
    question: "How can I contact support?",
    answer: "Use our Help Center form or email support@yourcompany.com for direct assistance."
  },
];

export default function HelpCenter() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-8 md:p-16">
      <h1 className="text-4xl font-bold mb-6 text-white">Help Center</h1>
      <p className="mb-8 text-gray-300 text-lg">
        Welcome to the Help Center! Find answers to frequently asked questions and get support quickly.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-white">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer transition-all hover:bg-gray-700"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <span className="text-blue-400">{openIndex === index ? "-" : "+"}</span>
              </div>
              {openIndex === index && (
                <p className="mt-2 text-gray-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-white">Contact Support</h2>
        <p className="text-gray-300 mb-4">
          If your question isn’t answered above, reach out to our support team directly:
        </p>
        <div className="space-y-2">
          <a
            href="mailto:support@yourcompany.com"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 transition-colors"
          >
            Email Support
          </a>
          <button className="inline-block px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors">
            Live Chat
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">Feedback</h2>
        <p className="text-gray-300 mb-4">
          Your feedback helps us improve. Submit suggestions or report issues using our
          <a href="/contact" className="text-blue-400 hover:text-blue-500 ml-1">contact form</a>.
        </p>
      </section>
    </div>
  );
}