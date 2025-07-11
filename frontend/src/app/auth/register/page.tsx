import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="-top-40 -right-32 absolute bg-blue-400 opacity-20 blur-xl rounded-full w-80 h-80 animate-blob mix-blend-multiply filter"></div>
        <div className="-bottom-40 -left-32 absolute bg-purple-400 opacity-20 blur-xl rounded-full w-80 h-80 animate-blob animation-delay-2000 mix-blend-multiply filter"></div>
        <div className="top-40 left-40 absolute bg-indigo-400 opacity-20 blur-xl rounded-full w-80 h-80 animate-blob animation-delay-4000 mix-blend-multiply filter"></div>
      </div>

      <div className="z-10 relative w-full">
        <RegisterForm />
      </div>
    </div>
  );
}
