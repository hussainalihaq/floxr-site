'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  useEffect(() => {
    // Theme toggle
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);

    // FAQ Accordion Logic
    const handleFAQClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('faq-question')) {
        const faqItem = target.parentElement;
        const isActive = faqItem?.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(item => {
          item.classList.remove('active');
        });

        if (!isActive) {
          faqItem?.classList.add('active');
        }
      }
    };

    document.addEventListener('click', handleFAQClick);

    // Scroll Reveal Observer
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');

          // Trigger counter animation
          if (entry.target.querySelector('.stats-grid')) {
            const counters = entry.target.querySelectorAll('.stat-number[data-target]');
            counters.forEach(counter => {
              if (!counter.classList.contains('counted')) {
                counter.classList.add('counted');
                animateCounter(counter as HTMLElement);
              }
            });
          }
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
      sectionObserver.observe(section);
    });

    return () => {
      document.removeEventListener('click', handleFAQClick);
    };
  }, []);

  const animateCounter = (element: HTMLElement) => {
    const target = parseFloat(element.getAttribute('data-target') || '0');
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        if (target % 1 !== 0) {
          element.textContent = current.toFixed(1) + suffix;
        } else {
          element.textContent = Math.floor(current) + suffix;
        }
        requestAnimationFrame(updateCounter);
      } else {
        if (target % 1 !== 0) {
          element.textContent = target.toFixed(1) + suffix;
        } else {
          element.textContent = target + suffix;
        }
      }
    };

    updateCounter();
  };

  const toggleTheme = () => {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  const toggleChatbot = () => {
    const chatbotWindow = document.getElementById('chatbot-window');
    chatbotWindow?.classList.toggle('active');
  };

  const sendChatMessage = () => {
    const input = document.getElementById('chatbot-input') as HTMLInputElement;
    const message = input?.value.trim();

    if (!message) return;

    const messagesContainer = document.getElementById('chatbot-messages');
    const userMsg = document.createElement('div');
    userMsg.className = 'chatbot-message user-message';
    userMsg.innerHTML = `
      <div class="message-avatar">👤</div>
      <div class="message-content">${message}</div>
    `;
    messagesContainer?.appendChild(userMsg);

    input.value = '';
    if (messagesContainer) messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'chatbot-message bot-message';
      botMsg.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">Thanks for your message! Our AI is currently in demo mode. For real assistance, please book a demo or contact our team.</div>
      `;
      messagesContainer?.appendChild(botMsg);
      if (messagesContainer) messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 800);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="site-header">
        <div className="container header-inner">
          <div className="logo">floxr.</div>
          <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
            <button className="mobile-close-btn" onClick={toggleMobileMenu} aria-label="Close menu">
              ✕
            </button>
            <a href="#workflow" onClick={() => setMobileMenuOpen(false)}>Workflows</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <a href="#company" onClick={() => setMobileMenuOpen(false)}>Company</a>
          </nav>
          <div className="header-cta">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Dark Mode">
              🌗
            </button>
            <a href="#demo" className="btn btn-ghost desktop-only">Log in</a>
            <a href="https://zcal.co/hussainalihaq/30min" target="_blank" rel="noopener noreferrer" className="btn btn-primary desktop-only">
              Book a Demo
            </a>
            <button className="hamburger-btn" onClick={toggleMobileMenu} aria-label="Open menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && <div className="mobile-overlay" onClick={toggleMobileMenu}></div>}

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="container">
            <div className="animate">
              <span className="launch-badge">🚀 Launching Soon</span>
              <h1>Automate your Business & HR Workflows</h1>
              <p className="hero-subtitle">
                floxr. is the all-in-one automation platform that replaces dozens of tools.
                No-code workflows, intelligent decisions, and seamless integrations.
              </p>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <a href="https://zcal.co/hussainalihaq/30min" target="_blank" rel="noopener noreferrer"
                  className="btn btn-primary btn-lg">
                  Book a Demo
                </a>
                <a href="#features" className="btn btn-ghost btn-lg">View Features</a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section" style={{ padding: '3rem 0', position: 'relative' }}>
          <div className="section-bg-graphic bg-dot-pattern"></div>
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number" data-target="10" data-suffix="x">0x</div>
                <div className="stat-label">Faster Onboarding</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" data-target="99.9" data-suffix="%">0%</div>
                <div className="stat-label">Uptime SLA</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" data-target="24" data-suffix="/7">0/7</div>
                <div className="stat-label">AI Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Rest of sections - continuing in next message due to length */}
      </main>

      {/* Chatbot */}
      <div id="ai-chatbot" className="chatbot-widget">
        <button className="chatbot-toggle" onClick={toggleChatbot} aria-label="Toggle AI Assistant">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
        <div className="chatbot-window" id="chatbot-window">
          <div className="chatbot-header">
            <div>
              <div style={{ fontWeight: 600 }}>floxr. AI Assistant</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Always here to help</div>
            </div>
            <button onClick={toggleChatbot} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
          </div>
          <div className="chatbot-messages" id="chatbot-messages">
            <div className="chatbot-message bot-message">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                Hi! I'm the floxr. AI assistant. How can I help you automate your workflows today?
              </div>
            </div>
          </div>
          <div className="chatbot-input-area">
            <input type="text" id="chatbot-input" placeholder="Ask me anything..." onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()} />
            <button onClick={sendChatMessage} className="chatbot-send-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="sticky-mobile-cta">
        <a href="https://zcal.co/hussainalihaq/30min" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Book a Demo
        </a>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="logo" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>floxr.</div>
          <p>© {new Date().getFullYear()} Floxr Inc. Built for automation.</p>
        </div>
      </footer>
    </div>
  );
}
