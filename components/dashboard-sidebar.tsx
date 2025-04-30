"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  DollarSign,
  PieChart,
  Users,
  Landmark,
  MessageCircle,
  Shield,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Network,
  ArrowUpDown,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

type SidebarItemProps = {
  icon: React.ElementType
  label: string
  href: string
  isActive?: boolean
  isCollapsed: boolean
  onClick?: () => void
}

const SidebarItem = ({ icon: Icon, label, href, isActive = false, isCollapsed, onClick }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
        "hover:bg-blue-500/10 hover:text-blue-400 hover:shadow-[0_0_8px_rgba(59,130,246,0.5)]",
        isActive && "bg-blue-500/20 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.6)]",
        isCollapsed && "justify-center px-2",
      )}
      title={isCollapsed ? label : undefined}
      onClick={onClick}
    >
      <Icon className="h-5 w-5 filter drop-shadow-[0_0_2px_rgba(59,130,246,0.7)]" />
      {!isCollapsed && <span className="font-medium">{label}</span>}
    </Link>
  )
}

type DashboardSidebarProps = {
  isCollapsed: boolean
  isMobile: boolean
  isMobileOpen: boolean
  toggleSidebar: () => void
  className?: string
}

export default function DashboardSidebar({
  isCollapsed,
  isMobile,
  isMobileOpen,
  toggleSidebar,
  className,
}: DashboardSidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    { icon: Home, label: "Início", href: "/" },
    { icon: DollarSign, label: "Fazer investimento", href: "/fazer-investimento" },
    { icon: PieChart, label: "Meus investimentos", href: "/meus-investimentos" },
    { icon: Users, label: "Minha rede", href: "/minha-rede" },
    { icon: Network, label: "Extrato da rede", href: "/extrato-da-rede" },
    { icon: ArrowUpDown, label: "Extrato financeiro", href: "/extrato-financeiro" },
    { icon: Landmark, label: "Efetuar saque", href: "/efetuar-saque" },
    { icon: MessageCircle, label: "Suporte", href: "/suporte" },
    { icon: Shield, label: "Segurança", href: "/seguranca" },
  ]

  // Fechar o menu móvel após clicar em um item
  const handleItemClick = () => {
    if (isMobile && isMobileOpen) {
      toggleSidebar()
    }
  }

  // Se for mobile e o menu não estiver aberto, não renderizar
  if (isMobile && !isMobileOpen) {
    return null
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 bg-black border-r border-blue-900/30 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex flex-col transition-all duration-300 ease-in-out",
        isMobile ? "z-40 w-64" : isCollapsed ? "w-16 closed" : "w-64",
        isMobile && isMobileOpen ? "translate-x-0" : isMobile ? "-translate-x-full" : "translate-x-0",
        className,
      )}
    >
      <div
        className={cn(
          "p-4 border-b border-blue-900/30 flex",
          isCollapsed && !isMobile ? "justify-center" : "justify-between items-center",
        )}
      >
        {!isCollapsed || isMobile ? (
          <div className="flex items-center">
            <img src="/novaforex-logo-transparent.png" alt="NOVAFOREX" className="h-12" />
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <img src="/novaforex-logo-transparent.png" alt="NOVAFOREX" className="h-10" />
          </div>
        )}

        {isMobile ? (
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
            aria-label="Fechar menu"
          >
            <X size={18} />
          </button>
        ) : (
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
            aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        )}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={pathname === item.href}
            isCollapsed={isCollapsed && !isMobile}
            onClick={handleItemClick}
          />
        ))}
      </nav>

      <div className="p-3 border-t border-blue-900/30">
        <button
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg w-full text-red-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-300 hover:shadow-[0_0_8px_rgba(239,68,68,0.5)]",
            isCollapsed && !isMobile && "justify-center px-2",
          )}
        >
          <LogOut className="h-5 w-5 filter drop-shadow-[0_0_2px_rgba(239,68,68,0.7)]" />
          {(!isCollapsed || isMobile) && <span className="font-medium">Sair</span>}
        </button>
      </div>

      {/* Botão de seta fixo na parte inferior da sidebar */}
      {!isMobile && (
        <div className="p-3 border-t border-blue-900/30 flex justify-center">
          <button
            id="toggleSidebar"
            onClick={toggleSidebar}
            className="sidebar-toggle-button flex items-center justify-center h-10 w-10 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
            aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      )}
    </aside>
  )
}
