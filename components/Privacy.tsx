import React from 'react';

const Privacy: React.FC = () => {
  return (
    <section className="w-full min-h-screen max-w-7xl mx-auto px-4 sm:px-12 md:px-24 py-16 sm:py-32 relative">
      {/* Gradient border */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent 0%, rgba(176, 176, 176, 0.1) 33%, rgba(176, 176, 176, 0.1) 66%, transparent 100%)'
        }}
      ></div>
      
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 sm:mb-8">Privacy Policy</h1>
        
        <div className="bg-[#0E0E0E] border border-[#2E2E2E] p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
          <p><strong>Effective Date:</strong> October 2025</p>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, lineHeight: '1.6' }}>
            Kesslr Labs Pty Ltd ("Kesslr Labs," "we," "our," or "us") respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.
          </p>

          <h2 style={{ marginTop: '1.5rem', fontSize: '1.2rem', fontWeight: 600 }}>Information We Collect</h2>
          <ul style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, lineHeight: '1.6', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
            <li><strong>Contact Information:</strong> If you reach out through our contact form or email, we may collect your name, company, email address, and any details you provide.</li>
            <li><strong>Newsletter Subscriptions:</strong> If you opt in, we collect your email to send updates.</li>
            <li><strong>Technical Information:</strong> We may collect limited, non-identifiable data such as browser type, device type, and site usage statistics.</li>
          </ul>

          <h2 style={{ marginTop: '1.5rem', fontSize: '1.2rem', fontWeight: 600 }}>How We Use Your Information</h2>
          <ul style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, lineHeight: '1.6', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
            <li>To respond to inquiries and provide information you request.</li>
            <li>To send company updates if you subscribe to our newsletter.</li>
            <li>To improve our website and services.</li>
          </ul>

          <h2 style={{ marginTop: '1.5rem', fontSize: '1.2rem', fontWeight: 600 }}>Sharing of Information</h2>
          <ul style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, lineHeight: '1.6', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
            <li>We do not sell or rent personal data.</li>
            <li>We may share limited information with trusted service providers (e.g., website hosting, email distribution) who are bound by confidentiality obligations.</li>
            <li>We may disclose information if required by law or to protect our rights.</li>
          </ul>

          <h2 style={{ marginTop: '1.5rem', fontSize: '1.2rem', fontWeight: 600 }}>Data Security</h2>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, lineHeight: '1.6' }}>
            We take reasonable technical and organizational measures to safeguard your information against unauthorized access, loss, or misuse.
          </p>

          <h2 style={{ marginTop: '1.5rem', fontSize: '1.2rem', fontWeight: 600 }}>Data Retention</h2>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, lineHeight: '1.6' }}>
            We retain personal data only as long as necessary to fulfill the purposes described above or as required by law.
          </p>

          <h2 style={{ marginTop: '1.5rem', fontSize: '1.2rem', fontWeight: 600 }}>Your Rights</h2>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 300, lineHeight: '1.6' }}>
            You may request access, correction, or deletion of your personal data at any time by contacting us at{' '}
            <a href="mailto:info@kesslr.com" className="text-cyan-500 hover:text-cyan-400 transition-colors">
              info@kesslr.com
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Privacy;

