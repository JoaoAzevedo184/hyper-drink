import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Smooth scroll com Lenis.
 * Desativado quando o usuário pede menos movimento ou em telas de toque
 * pequenas, onde o scroll nativo é mais confortável e performático.
 */
export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (coarse) return

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.4,
    })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [enabled])
}

/** Scroll suave para uma âncora, respeitando o header fixo. */
export function scrollToSection(href: string) {
  const el = document.querySelector(href)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 72
  window.scrollTo({ top, behavior: 'smooth' })
}
