import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export type DeviceOS =
  | "iOS"
  | "Android"
  | "Windows"
  | "macOS"
  | "Linux"
  | "Unknown";

export type DeviceType = "mobile" | "tablet" | "desktop";

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  deviceType: DeviceType;
  os: DeviceOS;
  osVersion: string | null;
}

/**
 * Detecta o sistema operacional baseado no user agent
 */
function detectOS(): { os: DeviceOS; osVersion: string | null } {
  if (typeof window === "undefined" || !navigator.userAgent) {
    return { os: "Unknown", osVersion: null };
  }

  const ua = navigator.userAgent.toLowerCase();

  // iOS (iPhone, iPad, iPod)
  if (/iphone|ipad|ipod/.test(ua)) {
    const match = ua.match(/os (\d+)[._](\d+)/);
    const version = match ? `${match[1]}.${match[2]}` : null;
    return { os: "iOS", osVersion: version };
  }

  // Android
  if (/android/.test(ua)) {
    const match = ua.match(/android (\d+)[._](\d+)/);
    const version = match ? `${match[1]}.${match[2]}` : null;
    return { os: "Android", osVersion: version };
  }

  // Windows
  if (/windows/.test(ua)) {
    const match = ua.match(/windows nt (\d+)[._](\d+)/);
    const version = match ? `${match[1]}.${match[2]}` : null;
    return { os: "Windows", osVersion: version };
  }

  // macOS
  if (/macintosh|mac os x/.test(ua)) {
    const match = ua.match(/mac os x (\d+)[._](\d+)/);
    const version = match ? `${match[1]}.${match[2]}` : null;
    return { os: "macOS", osVersion: version };
  }

  // Linux
  if (/linux/.test(ua) && !/android/.test(ua)) {
    return { os: "Linux", osVersion: null };
  }

  return { os: "Unknown", osVersion: null };
}

/**
 * Detecta se é um dispositivo móvel baseado no user agent
 */
function isMobileDevice(): boolean {
  if (typeof window === "undefined" || !navigator.userAgent) {
    return false;
  }

  const ua = navigator.userAgent.toLowerCase();
  return /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    ua
  );
}

/**
 * Detecta se é um tablet baseado no user agent
 */
function isTabletDevice(): boolean {
  if (typeof window === "undefined" || !navigator.userAgent) {
    return false;
  }

  const ua = navigator.userAgent.toLowerCase();
  return /ipad|android(?!.*mobile)|tablet/i.test(ua);
}

/**
 * Verifica se é um dispositivo mobile da Apple (iPhone)
 * Retorna true apenas quando for mobile e dispositivo Apple (iOS)
 * Exclui iPad, iPod e outros dispositivos
 */
export function isMobileOs(): boolean {
  if (typeof window === "undefined" || !navigator.userAgent) {
    return false;
  }

  const ua = navigator.userAgent.toLowerCase();

  // Verifica se é iPhone (mobile da Apple) - exclui iPad e iPod
  // iPhone já é mobile por definição, então basta verificar se é iPhone
  const isIPhone = /iphone/.test(ua) && !/ipad|ipod/.test(ua);

  return isIPhone;
}

/**
 * Hook para detectar se é mobile baseado apenas no tamanho da tela
 * Mantido para compatibilidade com código existente
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

/**
 * Hook completo para detectar dispositivo mobile, tablet, desktop e sistema operacional
 * Combina detecção por user agent e tamanho de tela
 */
export function useDevice() {
  const [deviceInfo, setDeviceInfo] = React.useState<DeviceInfo>(() => {
    if (typeof window === "undefined") {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        deviceType: "desktop",
        os: "Unknown",
        osVersion: null,
      };
    }

    const { os, osVersion } = detectOS();
    const isMobileUA = isMobileDevice();
    const isTabletUA = isTabletDevice();
    const width = window.innerWidth;

    // Combina detecção por user agent e tamanho de tela
    const isMobileBySize = width < MOBILE_BREAKPOINT;
    const isTabletBySize =
      width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT;
    const isDesktopBySize = width >= TABLET_BREAKPOINT;

    // Prioriza user agent para mobile/tablet, mas considera tamanho também
    const isMobile = isMobileUA || (isMobileBySize && !isTabletUA);
    const isTablet = isTabletUA || (isTabletBySize && !isMobileUA);
    const isDesktop = !isMobile && !isTablet && isDesktopBySize;

    let deviceType: DeviceType = "desktop";
    if (isMobile) deviceType = "mobile";
    else if (isTablet) deviceType = "tablet";

    return {
      isMobile,
      isTablet,
      isDesktop,
      deviceType,
      os,
      osVersion,
    };
  });

  React.useEffect(() => {
    const updateDeviceInfo = () => {
      const { os, osVersion } = detectOS();
      const isMobileUA = isMobileDevice();
      const isTabletUA = isTabletDevice();
      const width = window.innerWidth;

      const isMobileBySize = width < MOBILE_BREAKPOINT;
      const isTabletBySize =
        width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT;
      const isDesktopBySize = width >= TABLET_BREAKPOINT;

      const isMobile = isMobileUA || (isMobileBySize && !isTabletUA);
      const isTablet = isTabletUA || (isTabletBySize && !isMobileUA);
      const isDesktop = !isMobile && !isTablet && isDesktopBySize;

      let deviceType: DeviceType = "desktop";
      if (isMobile) deviceType = "mobile";
      else if (isTablet) deviceType = "tablet";

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        deviceType,
        os,
        osVersion,
      });
    };

    // Atualiza quando a janela é redimensionada
    const mql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`);
    mql.addEventListener("change", updateDeviceInfo);
    window.addEventListener("resize", updateDeviceInfo);

    // Atualiza inicialmente
    updateDeviceInfo();

    return () => {
      mql.removeEventListener("change", updateDeviceInfo);
      window.removeEventListener("resize", updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
}
