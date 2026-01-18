// CheckoutFrame.tsx
import React, { useCallback, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Mode = "mobile" | "tablet" | "desktop";
const SIZES: Record<Mode, { w: number; h: number }> = {
  mobile: { w: 375, h: 812 },
  tablet: { w: 768, h: 1024 },
  desktop: { w: 1280, h: 800 },
};

function copyStyles(source: Document, target: Document) {
  Array.from(source.styleSheets).forEach((sheet: any) => {
    try {
      // STYLE inline: caminho ideal lendo cssRules
      if (sheet.ownerNode?.tagName === "STYLE") {
        const style = target.createElement("style");
        style.textContent = Array.from(sheet.cssRules)
          .map((r: any) => r.cssText)
          .join("\n");
        target.head.appendChild(style);
      }
      // LINK stylesheet
      else if (sheet.ownerNode?.tagName === "LINK") {
        const link = sheet.ownerNode as HTMLLinkElement;
        const cloned = target.createElement("link");
        cloned.rel = "stylesheet";
        cloned.href = link.href;
        target.head.appendChild(cloned);
      }
    } catch {
      // Fallbacks (Vite/HMR, blob:, CORS)
      const node = sheet?.ownerNode as HTMLElement | undefined;

      if (node?.tagName === "STYLE") {
        const clone = target.createElement("style");
        clone.textContent = (node as HTMLStyleElement).textContent || "";
        target.head.appendChild(clone);
        return;
      }

      if (node?.tagName === "LINK") {
        const link = node as HTMLLinkElement;
        const cloned = target.createElement("link");
        cloned.rel = "stylesheet";
        cloned.href = link.href;
        target.head.appendChild(cloned);
      }
    }
  });

  const base = target.createElement("style");
  base.textContent = `html,body,#__checkout_root{margin:0;padding:0;min-height:100%;height:auto}`;
  target.head.appendChild(base);
}

function autoHeight(iframe: HTMLIFrameElement, doc: Document) {
  const set = () => {
    const h = Math.max(
      doc.body.scrollHeight,
      doc.documentElement.scrollHeight,
      doc.body.offsetHeight,
      doc.documentElement.offsetHeight,
      400
    );
    iframe.style.height = `${h}px`;
  };
  set();
  const obs = new MutationObserver(() => requestAnimationFrame(set));
  obs.observe(doc.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
  });
  window.addEventListener("resize", set);
  return () => {
    obs.disconnect();
    window.removeEventListener("resize", set);
  };
}

export function CheckoutFrame({
  mode,
  children,
}: {
  mode: Mode;
  children: React.ReactNode;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  const docHtml = useMemo(
    () => `<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta http-equiv="Content-Security-Policy"
        content="default-src 'none'; img-src data: blob: https: http:; font-src https: data:; style-src 'unsafe-inline' https: http:;"/>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>      
  <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</head>
<body></body>
</html>`,
    []
  );

  const handleLoad = useCallback(() => {
    const iframe = iframeRef.current;
    const doc = iframe?.contentDocument;
    if (!iframe || !doc) return;

    // Cria root imediatamente
    let root = doc.getElementById("__checkout_root") as HTMLElement | null;
    if (!root) {
      root = doc.createElement("div");
      root.id = "__checkout_root";
      doc.body.appendChild(root);
    }

    // Injeta estilos com fallbacks
    copyStyles(document, doc);

    // Altura reativa
    autoHeight(iframe, doc);

    setMountNode(root);
  }, []);

  const { w } = SIZES[mode];

  return (
    <div
      style={{
        position: "relative",
        width: w >= 1280 ? "100%" : w,
        height: mode === "mobile" ? "712px" : "auto",
      }}
    >
      <iframe
        key={mode}
        ref={iframeRef}
        title={`checkout-${mode}`}
        style={{
          width: w >= 1280 ? "100%" : w,
          border: 0,
          display: "block",
          minHeight: "400px",
          height: mode === "mobile" ? "712px" : "auto",
          overflowY: mode === "mobile" ? "auto" : "hidden",
          visibility: mountNode ? "visible" : "hidden", // evita “flash” vazio
        }}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
        srcDoc={docHtml}
        onLoad={handleLoad} // listener direto no JSX
      />
      {!mountNode && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            pointerEvents: "none",
            fontSize: 14,
            color: "#666",
          }}
        >
          Carregando preview...
        </div>
      )}
      {mountNode && createPortal(children, mountNode, "checkout-portal")}
    </div>
  );
}
