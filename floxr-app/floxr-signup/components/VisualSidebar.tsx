import React from "react";

const VisualSidebar: React.FC = () => {
  return (
    <div className="relative hidden lg:flex flex-col w-5/12 h-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        role="img"
        aria-label="Modern office space with glass walls and natural light representing professional HR environment"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDgK-DqK7l6at-moJgpDOBob84Cz_0w3zCuVTIcXPdizmQzffpp7iYwt29we4SUgPsGaQ0iw5LK3wsfZa7wfRrQ3ZHXWTsUk8IINGvAZcDF4E-zUv4GDD4OT4tjE700mgxq8_LPzleKIRKwCrOA4VFDlXamONVvS4ANbcL4lRlnWdDCr-6hVAwtdPHUeUJbELaRWYjU8CzWiPNfSNNJ1vHBjeEUXLNRt9Q6a1xMnwf-flkrx41Q8aPln01lYrRGj99zS96dZVPsMqg')",
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background-dark/95 via-background-dark/60 to-background-dark/30 z-10" />
      <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />

      {/* Content Container */}
      <div className="relative z-20 flex flex-col justify-between h-full p-12 xl:p-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg shadow-lg shadow-primary/30 text-white">
            <span className="material-symbols-outlined text-2xl">
              hr_resting
            </span>
          </div>
          <span className="text-2xl font-black tracking-tight text-white">
            Floxr
          </span>
        </div>

        {/* Testimonial */}
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl xl:text-5xl font-black leading-tight tracking-tight text-white drop-shadow-md">
            Automate onboarding, attendance, and payroll.
          </h1>
          <div className="backdrop-blur-md bg-white/10 border border-white/10 p-6 rounded-xl shadow-2xl">
            <div className="flex flex-col gap-4">
              <div className="flex gap-1 text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="material-symbols-outlined text-[20px] fill-1"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-lg font-medium leading-relaxed text-white/90">
                "Floxr revolutionized our HR department. We are saving 40+ hours
                per week on manual data entry. It's the upgrade we didn't know
                we desperately needed."
              </p>
              <div className="flex items-center gap-4 mt-2">
                <div
                  className="w-12 h-12 rounded-full bg-center bg-cover border-2 border-white/20"
                  role="img"
                  aria-label="Portrait of Sarah Jenkins smiling professionally"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC6dbABPMmqVQPgIbTLQDO8Y3hlaIoZryDH5moeWQDOhX_hxxpAu5W1aH5_5Nq8DHAU_4u5WN7BBvBd76og3eC1d1Hxg1E6rnlubxSqVIIKtR5Pu1J8z5T7W0cbA9Zvjneuo6PoDbASg-rDTFKm92y2JvrXvq7r6BXscTwZgYL01vOV2f70320Y7Cr4X7Zliz_6jJxQO0GHmOrITtQNY1Ypz448KpJNVX95DuRUBd_VZxvfUXnmCzZqXv_mut1JSYDoqjjwWQxHWqs')",
                  }}
                />
                <div>
                  <div className="text-base font-bold text-white">
                    Sarah Jenkins
                  </div>
                  <div className="text-sm font-normal text-white/60">
                    HR Director, Acme Corp
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualSidebar;