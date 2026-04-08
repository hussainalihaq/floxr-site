import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    // Add logic here for actual authentication
  };

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center p-4 sm:p-8 bg-background-dark overflow-y-auto">
      {/* Mobile Background Image (Only visible on small screens) */}
      <div className="absolute inset-0 md:hidden z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')" }}
        ></div>
      </div>

      {/* Neon Glow Effect behind form */}
      <div className="neon-glow top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="neon-glow top-1/4 right-0 bg-purple-500 opacity-10 w-64 h-64 blur-[100px]"></div>

      {/* Mobile Logo (Only visible on small screens) */}
      <div className="md:hidden absolute top-8 left-8 flex items-center gap-2 z-20">
        <div className="flex items-center justify-center w-8 h-8 rounded bg-primary text-white">
          <span className="material-symbols-outlined text-xl">layers</span>
        </div>
        <span className="text-xl font-bold tracking-tight text-white">Floxr</span>
      </div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-[440px] glass-panel rounded-2xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome back</h2>
          <p className="text-gray-400 text-sm">Please enter your details to sign in.</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300" htmlFor="email">Work Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-500 group-focus-within:text-primary transition-colors">mail</span>
              </div>
              <input
                id="email"
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 bg-[#1c1f27]/80 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300" htmlFor="password">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-500 group-focus-within:text-primary transition-colors">lock</span>
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full pl-10 pr-12 py-3 bg-[#1c1f27]/80 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition-colors cursor-pointer"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Options Row */}
          <div className="flex items-center justify-between mt-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="custom-checkbox w-4 h-4 rounded border-gray-600 bg-[#1c1f27] text-primary focus:ring-primary focus:ring-offset-background-dark cursor-pointer transition"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
            </label>
            <a className="text-sm font-medium text-primary hover:text-primary/80 transition-colors hover:underline" href="#">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full bg-primary hover:bg-blue-600 text-white font-semibold py-3.5 px-4 rounded-lg shadow-[0_0_20px_-5px_rgba(19,91,236,0.4)] hover:shadow-[0_0_25px_-5px_rgba(19,91,236,0.6)] transform active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Sign In</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>

          {/* Footer Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <a className="font-medium text-primary hover:text-blue-400 transition-colors" href="#">
                Sign up
              </a>
            </p>
          </div>
        </form>

        {/* Social Login Divider */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex justify-center gap-4">
            <button 
              type="button"
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#252932] border border-gray-700 hover:bg-[#2d333f] hover:border-gray-600 transition-all text-white"
              aria-label="Sign in with Google"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
            </button>
            <button 
              type="button"
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#252932] border border-gray-700 hover:bg-[#2d333f] hover:border-gray-600 transition-all text-white"
              aria-label="Sign in with LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden mt-8 text-xs text-gray-500 text-center relative z-10">
        © 2023 Floxr Inc. All rights reserved.
      </div>
    </div>
  );
};

export default LoginForm;