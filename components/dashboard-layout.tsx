"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bell, Settings, Menu, X } from "lucide-react"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Detectar se é dispositivo móvel
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024 && !isSidebarCollapsed) {
        setIsSidebarCollapsed(true)
      }
    }

    // Verificar no carregamento inicial
    checkIfMobile()

    // Adicionar listener para redimensionamento
    window.addEventListener("resize", checkIfMobile)

    // Limpar listener
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [isSidebarCollapsed])

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen)
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed)
    }
  }

  // Função para navegar para a página de segurança
  const navigateToSecurity = () => {
    router.push("/seguranca")
  }

  // Implementar o script fornecido pelo usuário
  useEffect(() => {
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

  return (
    <div className="flex min-h-screen bg-background">
      {/* Overlay para dispositivos móveis quando o menu está aberto */}
      {isMobile && isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/70 z-30 lg:hidden" onClick={() => setIsMobileSidebarOpen(false)} />
      )}

      {/* Sidebar adaptada para mobile */}
      <DashboardSidebar
        isCollapsed={isSidebarCollapsed}
        isMobile={isMobile}
        isMobileOpen={isMobileSidebarOpen}
        toggleSidebar={toggleSidebar}
        className="sidebar"
      />

      <div
        ref={contentRef}
        className={cn(
          "flex-1 p-4 lg:p-6 overflow-y-auto transition-all duration-300 ease-in-out content",
          isMobile ? "ml-0" : isSidebarCollapsed ? "ml-0 expanded" : "ml-64",
        )}
      >
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 lg:hidden">
              {isMobile && isMobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center">
              <img src="/novaforex-logo-transparent.png" alt="NOVAFOREX" className="h-10 md:h-16 mr-2" />
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-neon-purple rounded-full"></span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex"
              onClick={navigateToSecurity}
              title="Configurações de Segurança"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/user-avatar.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {children}
      </div>
    </div>
  )
}
