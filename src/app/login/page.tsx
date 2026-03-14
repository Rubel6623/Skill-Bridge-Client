import LoginPage from "@/components/modules/auth/login/LoginForm";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const SignInPage = () => {
  return (
    <div className="container mx-auto px-4">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a14]">
          <Loader2 className="animate-spin text-orange-500" size={48} />
        </div>
      }>
        <LoginPage />
      </Suspense>
    </div>
  );
};

export default SignInPage;