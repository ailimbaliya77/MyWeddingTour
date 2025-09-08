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
      title: "Getting Started",
      icon: Heart,
      questions: [
        {
          question: "What is MyWeddingTour?",
          answer: "MyWeddingTour is a platform that helps couples create ticketed wedding experiences, allowing them to manage guest lists, collect payments, and organize their special day seamlessly."
        },
        {
          question: "How do I create my wedding event?",
          answer: "Simply sign up for an account, click 'Create Event', fill in your wedding details including date, venue, and ticket pricing, then share your unique link with guests."
        },
        {
          question: "Is there a cost to use the platform?",
          answer: "We offer a freemium model with basic features available for free. Premium features and higher guest limits are available through our paid plans starting at $29/month."
        }
      ]
    },
    {
      title: "Event Management",
      icon: Calendar,
      questions: [
        {
          question: "Can I set different ticket prices for different guests?",
          answer: "Yes! You can create multiple ticket tiers (VIP, Standard, Family packages) with different pricing and benefits. You can also send discount codes to specific guests."
        },
        {
          question: "How far in advance should I create my wedding event?",
          answer: "We recommend creating your event 3-6 months before your wedding date to give guests plenty of time to purchase tickets and make arrangements."
        },
        {
          question: "Can I modify event details after creating them?",
          answer: "Absolutely! You can update event details, pricing, and descriptions at any time. Guests who have already purchased tickets will be automatically notified of any changes."
        }
      ]
    },
    {
      title: "Guest Management",
      icon: Users,
      questions: [
        {
          question: "How do guests purchase tickets?",
          answer: "Guests receive a unique link to your wedding page where they can view event details, select ticket types, and complete their purchase securely online."
        },
        {
          question: "Can guests bring plus-ones?",
          answer: "Yes! You can enable plus-one options when setting up tickets. Guests can indicate their plus-one during the ticket purchase process."
        },
        {
          question: "What if a guest needs to cancel?",
          answer: "You can set your own cancellation policy. Guests can request cancellations through their ticket confirmation email, and you can approve refunds based on your policy."
        },
        {
          question: "How do I track RSVPs?",
          answer: "Your dashboard provides real-time RSVP tracking, showing who has confirmed, pending responses, and detailed guest lists with contact information."
        }
      ]
    },
    {
      title: "Payments & Pricing",
      icon: Gift,
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, debit cards, PayPal, Apple Pay, and Google Pay. All transactions are secured with industry-standard encryption."
        },
        {
          question: "When do I receive payment from ticket sales?",
          answer: "Funds are transferred to your bank account weekly, typically within 2-3 business days. You can track all transactions in your dashboard."
        },
        {
          question: "Are there any transaction fees?",
          answer: "We charge a small processing fee of 2.9% + $0.30 per transaction to cover payment processing costs. No hidden fees or monthly charges for basic plans."
        },
        {
          question: "Can I offer payment plans for guests?",
          answer: "Yes! You can enable installment payment options, allowing guests to pay for their tickets in 2-4 installments leading up to your wedding date."
        }
      ]
    },
    {
      title: "Wedding Day Features",
      icon: Camera,
      questions: [
        {
          question: "How does check-in work on the wedding day?",
          answer: "Guests show their digital tickets (QR codes) at the venue entrance. You can use our mobile app to scan tickets and check guests in quickly."
        },
        {
          question: "Can I collect photos from guests during the wedding?",
          answer: "Yes! Our photo sharing feature allows guests to upload photos directly to your wedding album using a shared link or QR code."
        },
        {
          question: "What happens if someone loses their ticket?",
          answer: "No problem! Guests can access their tickets anytime through their email confirmation. You can also look up any guest in your dashboard and resend their ticket."
        }
      ]
    },
    {
      title: "Technical Support",
      icon: Music,
      questions: [
        {
          question: "What if I need help setting up my event?",
          answer: "Our support team is available 24/7 via chat, email, or phone. We also offer free setup assistance calls for premium users."
        },
        {
          question: "Is the platform mobile-friendly?",
          answer: "Absolutely! Both the guest experience and your admin dashboard are fully optimized for mobile devices, tablets, and desktop computers."
        },
        {
          question: "Can I integrate with other wedding planning tools?",
          answer: "Yes! We integrate with popular wedding planning platforms like The Knot, WeddingWire, and various venue management systems."
        },
        {
          question: "What if there are technical issues on my wedding day?",
          answer: "We provide priority support on your wedding day with a dedicated hotline. Our team monitors all events and can assist with any technical concerns immediately."
        }
      ]
    }
  ];

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