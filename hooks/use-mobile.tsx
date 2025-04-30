"use client"

import { useState, useEffect } from "react"

export function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Verificar se estamos no lado do cliente
    if (typeof window === "undefined") return

    // Função para verificar o tamanho da tela
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Verificar no carregamento inicial
    checkIfMobile()

    // Adicionar listener para redimensionamento
    window.addEventListener("resize", checkIfMobile)

    // Limpar listener
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [breakpoint])

  return isMobile
}
