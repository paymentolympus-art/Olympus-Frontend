import { RegisterForm } from "@features/access/RegisterForm";
import { ROUTES_PUBLIC } from "@/constants/routes";
import { isMobileOs } from "@/hooks/useMobile";
export function RegisterPage() {
  const isMobileOS = isMobileOs();
  return (
    <main className="flex flex-col w-screen min-h-screen h-screen relative bg-[#040106] justify-start sm:justify-center items-center px-4">
      <div className="w-full max-w-[450px] flex flex-col items-center justify-center mt-10 sm:mt-0">
        <div className="flex flex-col items-center justify-center mb-6">
          <img
            src="/icons/logo.png"
            alt="Insane"
            className="cursor-pointer"
            style={{
              width: isMobileOS ? "195px" : "100%",
              height: isMobileOS ? "60px" : "60px",
            }}
            onClick={() => {
              window.location.href = ROUTES_PUBLIC.LANDING;
            }}
          />
        </div>
        <aside className="flex flex-col items-center justify-center w-full">
          <RegisterForm />
          <p className="text-sm text-purple-50/40 mt-5">
            Já tem uma conta?{" "}
            <a
              href="/login"
              className="txt-gradient-1 hover:underline font-bold"
            >
              Faça login
            </a>
          </p>
        </aside>
      </div>
    </main>
  );
}
