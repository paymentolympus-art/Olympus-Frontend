export const setCookie = (name: string, value: string, days: number = 1) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000); // if uncommented, the cookie will expire in 7 days, if commented, the cookie will expire when the browser is closed
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const nameEQ = name + "=";
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      const value = c.substring(nameEQ.length, c.length);
      return value;
    }
  }

  return null;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Função auxiliar para debug
export const debugCookies = () => {
  console.log("🍪 === DEBUG COOKIES ===");
  console.log("📋 Document.cookie:", document.cookie);
  console.log("🔧 Cookies splitados:", document.cookie.split(";"));
  console.log("🍪 === FIM DEBUG ===");
};

// Função para verificar se um cookie existe
export const hasCookie = (name: string): boolean => {
  return getCookie(name) !== null;
};

// Função específica para o session_token
export const getSessionToken = (): string | null => {
  return getCookie("session_token");
};

export const setSessionToken = (token: string) => {
  setCookie("session_token", token, 7); // 7 dias
};

export const clearSessionToken = () => {
  deleteCookie("session_token");
};
