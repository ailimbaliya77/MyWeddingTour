import React, { useState } from "react";
import {
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiTimeLine,
  RiShieldCheckLine,
  RiFileShieldLine,
  RiWhatsappLine,
} from "react-icons/ri";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] px-4 py-28 pt-9 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7A1F2B]">
            We're Here To Help
          </p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-[#2A1710]">
            Get In Touch
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-[#5C4C42]">
            Questions about a wedding, hosting, or how any of this works?
            A real person reads every message.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* FORM */}
          <div className="rounded-2xl border border-[#E7D3B1] bg-white p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="mb-4 text-5xl">💌</span>
                <h2 className="font-serif text-2xl font-bold text-[#2A1710]">
                  Message Sent
                </h2>
                <p className="mt-2 max-w-sm text-sm text-[#5C4C42]">
                  Thank you for reaching out — we typically reply within 1–2
                  business days.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-semibold text-[#7A1F2B] underline decoration-[#C89B3C]/50 underline-offset-4 hover:text-[#5C1620]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-[#2A1710]">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full rounded-lg border border-[#E7D3B1] px-4 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-[#C89B3C]/30 focus:border-[#C89B3C]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-[#2A1710]">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-[#E7D3B1] px-4 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-[#C89B3C]/30 focus:border-[#C89B3C]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-1.5 block text-sm font-semibold text-[#2A1710]">
                    What's this about?
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#E7D3B1] px-4 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-[#C89B3C]/30 focus:border-[#C89B3C]"
                  >
                    <option value="">Select a topic</option>
                    <option value="guest">Attending as a guest</option>
                    <option value="host">Hosting a wedding</option>
                    <option value="booking">An existing booking</option>
                    <option value="press">Press or partnerships</option>
                    <option value="other">Something else</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-[#2A1710]">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Write your message here..."
                    className="w-full resize-none rounded-lg border border-[#E7D3B1] px-4 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-[#C89B3C]/30 focus:border-[#C89B3C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-[#7A1F2B] to-[#9C2C3A] py-3.5 font-semibold text-white shadow-sm transition hover:brightness-110"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* SIDEBAR: company info + trust */}
          <div className="space-y-6">
            {/* Direct contact */}
            <div className="rounded-2xl border border-[#E7D3B1] bg-white p-6">
              <h3 className="mb-4 font-serif text-lg font-bold text-[#2A1710]">
                Reach Us Directly
              </h3>
              <div className="space-y-4 text-sm">
                <a href="mailto:support@reewaayat.com" className="flex items-start gap-3 text-[#4A3B34] hover:text-[#7A1F2B]">
                  <RiMailLine className="mt-0.5 h-4 w-4 shrink-0 text-[#C89B3C]" />
                  support@reewaayat.com
                </a>
                <a href="tel:+919876543210" className="flex items-start gap-3 text-[#4A3B34] hover:text-[#7A1F2B]">
                  <RiPhoneLine className="mt-0.5 h-4 w-4 shrink-0 text-[#C89B3C]" />
                  +91 98765 43210
                </a>
                <a href="#" className="flex items-start gap-3 text-[#4A3B34] hover:text-[#7A1F2B]">
                  <RiWhatsappLine className="mt-0.5 h-4 w-4 shrink-0 text-[#C89B3C]" />
                  WhatsApp Concierge <span className="text-[#8A6A2F]">(guests only)</span>
                </a>
                <div className="flex items-start gap-3 text-[#4A3B34]">
                  <RiMapPinLine className="mt-0.5 h-4 w-4 shrink-0 text-[#C89B3C]" />
                  {/* Replace with your real registered office address */}
                  Registered Office Address, City, State, India — PIN 000000
                </div>
                <div className="flex items-start gap-3 text-[#4A3B34]">
                  <RiTimeLine className="mt-0.5 h-4 w-4 shrink-0 text-[#C89B3C]" />
                  {/* Replace with your real support hours */}
                  Mon–Sat, 10 AM – 7 PM IST
                </div>
              </div>
            </div>

            {/* Trust panel */}
            <div className="rounded-2xl border border-[#E7D3B1] bg-[#FFF9F0] p-6">
              <h3 className="mb-4 font-serif text-lg font-bold text-[#2A1710]">
                Who You're Talking To
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <RiFileShieldLine className="mt-0.5 h-5 w-5 shrink-0 text-[#7A1F2B]" />
                  <div>
                    <p className="text-sm font-semibold text-[#2A1710]">
                      Registered Indian Business
                    </p>
                    {/* Replace with your real entity type + CIN/registration number once incorporated */}
                    <p className="mt-0.5 text-xs text-[#8A6A2F]">
                      Operating as a legally registered company in India.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RiShieldCheckLine className="mt-0.5 h-5 w-5 shrink-0 text-[#7A1F2B]" />
                  <div>
                    <p className="text-sm font-semibold text-[#2A1710]">
                      Data Handled Responsibly
                    </p>
                    <p className="mt-0.5 text-xs text-[#8A6A2F]">
                      In line with India's Digital Personal Data Protection
                      Act, 2023.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="/trust"
                className="mt-5 inline-block text-xs font-semibold text-[#7A1F2B] underline decoration-[#C89B3C]/50 underline-offset-4 hover:text-[#5C1620]"
              >
                Read our full Trust & Safety policy →
              </a>
            </div>

            {/* Social proof */}
            <div className="rounded-2xl border border-[#E7D3B1] bg-white p-6 text-center">
              <p className="font-serif text-2xl font-bold text-[#2A1710]">
                guest counts
              </p>
              <p className="mt-1 text-xs text-[#8A6A2F]">
                from numerous countries have reached out and been welcomed at a
                real Indian wedding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;