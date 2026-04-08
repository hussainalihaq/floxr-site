import React, { useState } from "react";
import { InputGroup } from "./ui/InputGroup";
import { SocialButton } from "./ui/SocialButton";

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    workEmail: "",
    password: "",
    agreeToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add logic to submit data to backend here
    alert("Account creation simulated! Check console for data.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full w-full">
      {/* Mobile Logo (visible only on small screens) */}
      <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg text-white">
          <span className="material-symbols-outlined text-xl">hr_resting</span>
        </div>
        <span className="text-xl font-bold tracking-tight dark:text-white text-slate-900">
          Floxr
        </span>
      </div>

      <div className="w-full max-w-[520px] px-6 py-12 lg:px-12 flex flex-col">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight dark:text-white text-slate-900 mb-2">
            Create your free account
          </h2>
          <p className="text-base dark:text-slate-400 text-slate-600">
            Streamline your HR workflow today. No credit card required.
          </p>
        </div>

        {/* Social Signup */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <SocialButton
            provider="Google"
            iconSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBADxllVsrFMylRxA8gzcGcADDIGpVDszGNCQBKcHJodnLED6WDOIWjcgPGFjpbNrpGcHE_acEQz3OopNgOxqtCLFdnLGRPf3dKu1qqPfiBiehI6QDaSJMHxRoCgJcilzwow57gPYHkfBUh4XHf8gxwuvPfw4ywdQcKoScHJg4cVjOBOQjHEPiuE7JoXg8emTFPUiYJeInvldHWr9VAvJuQlDwCnMB3-dbWdQtVH8bVEjWmerE8ghAFKXMLivox2JAWpYigrbXYnUI"
          />
          <SocialButton
            provider="Microsoft"
            iconSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuB4Tfii_FD7IOPtRgV1eSMrQ8hZzAuWqAAdvxV7ncrjftjOfz-eVY4X-Kf3o8f7vyDVK9jI55N2PDS7UuqB-VzEC8rqc_KKcsMAieXWgwW7GeruFEy4KNu-_OLPfY1rye8yKYCpCOznstKv1NQRRcnaXloIz9hsUqtEszONYHFRe_smXPTYmY1YEtk-DzOXCiyF0UAcY1AXz8XOwr93O47Ny4CVztKC7meirUzIu61-AkWfQl30-GGspv1oVOPtsOWk4NMX-YKXBqA"
          />
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t dark:border-border-dark border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 dark:bg-background-dark bg-background-light dark:text-slate-400 text-slate-500">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputGroup
              id="fullName"
              label="Full Name"
              type="text"
              placeholder="e.g. Sarah Jenkins"
              value={formData.fullName}
              onChange={handleChange}
            />
            <InputGroup
              id="companyName"
              label="Company Name"
              type="text"
              placeholder="e.g. Acme Corp"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>

          <InputGroup
            id="workEmail"
            label="Work Email"
            type="email"
            placeholder="name@company.com"
            value={formData.workEmail}
            onChange={handleChange}
          />

          <InputGroup
            id="password"
            label="Password"
            type="password"
            placeholder="Min. 8 characters"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3 mt-2">
            <div className="flex items-center h-5">
              <input
                id="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="w-4 h-4 rounded border-slate-300 dark:border-border-dark text-primary focus:ring-primary focus:ring-offset-background-dark bg-white dark:bg-surface-dark cursor-pointer"
              />
            </div>
            <label
              htmlFor="agreeToTerms"
              className="text-sm dark:text-slate-400 text-slate-600 leading-tight cursor-pointer"
            >
              I agree to the{" "}
              <a
                href="#"
                className="text-primary hover:text-blue-400 hover:underline"
              >
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-primary hover:text-blue-400 hover:underline"
              >
                Privacy Policy
              </a>
              .
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 flex w-full items-center justify-center rounded-lg h-12 bg-primary text-white text-base font-bold tracking-wide hover:bg-blue-600 active:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={!formData.agreeToTerms}
          >
            Create Account
          </button>
        </form>

        {/* Footer Login Link */}
        <p className="mt-8 text-center text-sm dark:text-slate-400 text-slate-600">
          Already have an account?{" "}
          <a
            href="#"
            className="font-semibold text-primary hover:text-blue-400 transition-colors"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;