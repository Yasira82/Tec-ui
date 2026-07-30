// Pi-Browser-safe keyframes for the primitives (no CSS modules / no Tailwind).
// Injected ONCE, client-side only, into <head>. SSR renders without animation and
// hydrates fine. Kept tiny (pulse for skeletons, spin for loading buttons).
let injected = false;

export function ensureKeyframes(): void {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const el = document.createElement('style');
  el.setAttribute('data-tec-ui', 'keyframes');
  el.textContent =
    '@keyframes tecPulse{0%,100%{opacity:.5}50%{opacity:.85}}' +
    '@keyframes tecSpin{to{transform:rotate(360deg)}}';
  document.head.appendChild(el);
}
