import React from 'react';
import BrandingPanel from './components/BrandingPanel';
import LoginForm from './components/LoginForm';

export default function App() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display h-screen w-full overflow-hidden flex flex-col md:flex-row text-white antialiased selection:bg-primary selection:text-white">
      {/* Left Panel: Branding & Showcase */}
      <BrandingPanel />

      {/* Right Panel: Login Form */}
      <LoginForm />
    </div>
  );
}