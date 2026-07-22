import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initMotion(): void {
  const hero = gsap.utils.toArray<HTMLElement>("[data-hero]");
  const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");

  if (prefersReducedMotion()) {
    gsap.set([...hero, ...reveals], { opacity: 1, y: 0 });
    return;
  }

  gsap.fromTo(
    hero,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", stagger: 0.08 },
  );

  for (const el of reveals) {
    gsap.fromTo(
      el,
      { y: 46, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      },
    );
  }
}
