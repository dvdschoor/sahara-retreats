import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initMotion(): void {
  const hero = gsap.utils.toArray<HTMLElement>("[data-hero] > *");
  const heroImage = document.querySelector<HTMLElement>(".hero-image");
  const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");

  if (prefersReducedMotion()) {
    gsap.set([...hero, ...reveals], { opacity: 1, y: 0, yPercent: 0 });
    if (heroImage) gsap.set(heroImage, { scale: 1 });
    return;
  }

  gsap.fromTo(
    hero,
    { yPercent: 115, opacity: 0, skewY: 2 },
    {
      yPercent: 0,
      opacity: 1,
      skewY: 0,
      duration: 1.2,
      delay: 0.12,
      ease: "power4.out",
      stagger: 0.11,
    },
  );

  if (heroImage) {
    gsap.fromTo(
      heroImage,
      { scale: 1.07 },
      { scale: 1, duration: 2.2, delay: 0.18, ease: "power3.out" },
    );
  }

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
