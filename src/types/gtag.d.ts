interface Window {
  gtag: (...args: unknown[]) => void;
  dataLayer: unknown[];
  /** Downloads gtag.js after Aceptar (consent basic mode, see layout.tsx). */
  __bookataLoadGA?: () => void;
  __bookataGALoaded?: boolean;
}
