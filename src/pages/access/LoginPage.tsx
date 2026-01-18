import { ROUTES_PUBLIC } from "@/constants/routes";
import { LoginForm } from "@features/access/LoginForm";

export function LoginPage() {
  return (
    <main className="flex flex-row w-screen min-h-screen relative bg-[#040106] justify-center sm:items-center ">
      <aside className="hidden sm:flex relative h-screen  overflow-hidden flex-col items-center justify-center w-full md:w-1/2 lg:w-2/3">
        <div className="absolute z-10">
          <img
            src="/icons/bg-access.jpg"
            alt="Insane"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute w-full h-full z-10 bottom-0 right-0 bg-gradient-to-l from-[#040106]/50 to-[#040106]/50"></div>
      </aside>
      <aside className="flex flex-col items-center justify-center md:w-1/2 lg:w-1/3">
        <div className="min-w-screen sm:min-w-[300px] sm:max-w-[450px] w-full sm:w-full h-full px-4 pt-12 sm:pt-4 pb-8 rounded-lg">
          <header className="flex flex-col items-center justify-center mb-7">
            <div className="flex flex-col items-center justify-center mb-5">
              <img
                src="/icons/logo-icon.png"
                alt="Insane"
                className="w-[100px] h-24 cursor-pointer"
                onClick={() => {
                  window.location.href = ROUTES_PUBLIC.LANDING;
                }}
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Seja bem vindo(a) à{" "}
              <span className="txt-gradient-1">Insane!</span>
            </h1>
            <p className="text-sm text-neutral-300 sm:text-neutral-400">
              Faça login para continuar
            </p>
          </header>
          <LoginForm />
          <p className="text-sm text-neutral-300 sm:text-neutral-400 mt-5">
            Não tem uma conta?{" "}
            <a
              href="/register"
              className="txt-gradient-1 hover:underline font-bold"
            >
              Abrir conta
            </a>
          </p>
        </div>
      </aside>
    </main>
  );
}
