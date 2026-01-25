import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  return (
    <section className="w-full min-h-screen max-w-7xl mx-auto px-4 sm:px-12 md:px-24 py-16 sm:py-32 relative flex items-center">
      {/* Gradient border */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent 0%, rgba(176, 176, 176, 0.1) 33%, rgba(176, 176, 176, 0.1) 66%, transparent 100%)'
        }}
      ></div>
      
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">Contact Us</h1>
          <p className="text-gray-400 text-xs sm:text-sm" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300 }}>
            Get in touch with our team to learn more about Arcturus and how we can help accelerate your certification process.
          </p>
        </div>

        <div className="p-4 sm:p-6 bg-[#0E0E0E] border border-[#2E2E2E]">
          <form 
            action="https://formspree.io/f/xjkawlev" 
            method="POST" 
            className="space-y-4 sm:space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm text-gray-400 mb-2" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-gray-400 mb-2" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                required
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm text-gray-400 mb-2" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-gray-400 mb-2" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                required
              ></textarea>
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="border border-cyan-500 text-cyan-500 text-[12px] uppercase tracking-widest px-8 py-3 hover:bg-cyan-500/10 transition-colors font-nippo"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-[12px]" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
            Or reach out directly at{' '}
            <a href="mailto:info@kesslr.com" className="text-cyan-500 hover:text-cyan-400 transition-colors">
              info@kesslr.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;

