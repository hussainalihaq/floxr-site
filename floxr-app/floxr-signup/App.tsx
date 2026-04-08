import React from "react";
import VisualSidebar from "./components/VisualSidebar";
import SignupForm from "./components/SignupForm";

const App: React.FC = () => {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-white h-screen w-full overflow-hidden flex selection:bg-primary selection:text-white">
      {/* Left Panel: Visual & Testimonial */}
      <VisualSidebar />

      {/* Right Panel: Signup Form */}
      <div className="flex-1 flex flex-col h-full w-full relative overflow-y-auto">
        <SignupForm />
      </div>
    </div>
  );
};

export default App;