"use client"

import { useEffect } from "react"

export default function ScriptLoader() {
  useEffect(() => {
    // Implementar o script fornecido pelo usuário
    const toggleSidebarButton = document.getElementById("toggleSidebar")
    const sidebar = document.querySelector(".sidebar")
    const content = document.querySelector(".content")

    if (toggleSidebarButton && sidebar && content) {
      const handleToggle = () => {
        sidebar.classList.toggle("closed")
        content.classList.toggle("expanded")
      }

      toggleSidebarButton.addEventListener("click", handleToggle)

      // Limpar event listener
      return () => {
        toggleSidebarButton.removeEventListener("click", handleToggle)
      }
    }
  }, [])

  return null
}
