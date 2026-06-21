'use client';

export default function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute -inset-[100%] opacity-40">
        <div className="absolute top-[40%] left-[40%] w-[60vw] h-[60vw] bg-secondary/30 blur-[100px] rounded-full mix-blend-multiply animate-[spin_20s_linear_infinite] origin-center" />
        <div className="absolute top-[60%] left-[60%] w-[50vw] h-[50vw] bg-primary/20 blur-[120px] rounded-full mix-blend-multiply animate-[spin_15s_reverse_linear_infinite] origin-center" />
        <div className="absolute top-[30%] left-[70%] w-[70vw] h-[70vw] bg-outline-variant/40 blur-[140px] rounded-full mix-blend-multiply animate-[spin_25s_linear_infinite] origin-center" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_20%,transparent_100%)]"></div>
    </div>
  );
}
