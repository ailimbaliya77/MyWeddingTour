import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Heart, Calendar, Users, Gift, Camera, Music } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqCategories = [
    {
      title: "General Questions",
      icon: Users,
      questions: [
        {
          question: "What is MyWeddingTour?",
          answer: "MyWeddingTour is an online platform that connects couples hosting special events with guests interested in being part of cultural celebrations. It facilitates connections, bookings, and seamless communication—but does not manage logistics like venues or transportation."
        },
        {
          question: "What does MyWeddingTour actually do?",
          answer: "We provide the platform for discovery, profile creation, bookings, and secure transactions. We don’t run events or offer logistics—we simply help you connect and collaborate."
        },
        {
          question: "Why is there a fee to attend?",
          answer: "Attending an event usually comes with a small contribution—like a heartfelt gesture that helps support the occasion and offset hosting costs. It also ensures that attendees are genuinely interested and respectful."
        },
        {
          question: "Why would couples open their event to outside guests?",
          answer: "Couples often want to share their traditions, showcase their culture, and make new global connections. Hosting through [YourPlatformName] allows them to broaden their experience and celebrate with a diverse audience."
        },
        {
          question: "How do I know guests are respectful?",
          answer: "All attendees register and pay in advance, which demonstrates their commitment and respect for the event and hosts. We also enable communication beforehand to foster trust and understanding."
        },
        {
          question: "How does the registration process work?",
          answer: "(host side): Hosts fill out a short form with event details and date. Once verified, the event is listed. Only confirmed attendees get access to the full location and schedule. (guest side): Guests browse events, register, and pay a small fee to confirm their spot. They then receive full event details and can communicate with hosts."
        },
        {
          question: "Who controls the event details?",
          answer: "Hosts control guest lists, event timing, attire preferences, dress code, and location—ensuring they stay in charge of their celebration."
        },
        {
          question: "What about safety and legal matters?",
          answer: "While we review profiles, all arrangements—including logistics, conduct, and insurance—are managed directly between hosts and guests. We encourage you to take precautions and confirm arrangements in advance."
        },
        {
          question: "Can I reach the host before the event?",
          answer: "Yes—communication is encouraged! We facilitate messaging so both hosts and guests can ask questions, share plans, and build a rapport ahead of time."
        },
      ]
    }
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <Heart className="w-8 h-8 text-orange-500 mr-3" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about creating unforgettable ticketed wedding experiences
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {faqCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            {/* Category Header */}
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-purple-500 p-3 rounded-lg shadow-lg">
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 ml-4">
                {category.title}
              </h2>
            </div>

            {/* Questions */}
            <div className="space-y-4">
              {category.questions.map((faq, questionIndex) => {
                const itemIndex = `${categoryIndex}-${questionIndex}`;
                const isOpen = openItems.has(itemIndex);
                
                return (
                  <div
                    key={questionIndex}
                    className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden transition-all duration-200 hover:shadow-md"
                  >
                    <button
                      onClick={() => toggleItem(itemIndex)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset"
                    >
                      <h3 className="text-lg font-medium text-gray-800 group-hover:text-orange-600 transition-colors">
                        {faq.question}
                      </h3>
                      <div className="ml-4">
                        {isOpen ? (
                          <ChevronDown className="w-5 h-5 text-orange-500 transform transition-transform" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                        )}
                      </div>
                    </button>
                    
                    <div className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}>
                      <div className="px-6 pb-4">
                        <div className="bg-gradient-to-r from-orange-50 to-purple-50 rounded-lg p-4 border-l-4 border-orange-300">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;