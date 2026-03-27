import RegisterPage from "../../components/modules/auth/register/RegisterForm";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const SignUpPage = () => {
  return (
    <div className="container mx-auto px-4">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a14]">
          <Loader2 className="animate-spin text-orange-500" size={48} />
        </div>
      }>
        <RegisterPage />
      </Suspense>
    </div>
  );
};

export default SignUpPage;
