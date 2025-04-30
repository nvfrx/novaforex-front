"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import StatsCards from "@/components/stats-cards"
import TradingViewChart from "@/components/trading-view-chart"
import ForexMicroBot from "@/components/forex-micro-bot"
import LeaderboardSection from "@/components/leaderboard-section"
import CompoundInterestCalculator from "@/components/compound-interest-calculator"
import { Button } from "@/components/ui/button"
import { Bell, Settings, Menu } from "lucide-react"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { cn } from "@/lib/utils"
import { FinanceProvider } from "@/contexts/finance-context"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  // Função para navegar para a página de segurança
  const navigateToSecurity = () => {
    router.push("/seguranca")
  }

  return (
    <FinanceProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

        <div
          className={cn(
            "flex-1 p-4 lg:p-6 overflow-y-auto transition-all duration-300 ease-in-out",
            isSidebarCollapsed ? "ml-16" : "ml-64",
          )}
        >
          <header className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center">
                <img src="/novaforex-logo-transparent.png" alt="NOVAFOREX" className="h-16 mr-2" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-neon-purple rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon" onClick={navigateToSecurity} title="Configurações de Segurança">
                <Settings className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/user-avatar.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </header>

          <StatsCards />

          {/* Gráfico TradingView expandido */}
          <div className="mt-6 mb-6">
            <TradingViewChart />
          </div>

          {/* Bot de Micro Operações Forex */}
          <div className="mt-6 mb-6">
            <ForexMicroBot />
          </div>

          {/* Calculadora de Juros Compostos */}
          <div className="mt-6">
            <CompoundInterestCalculator />
          </div>

          <div className="mt-6">
            <LeaderboardSection />
          </div>
        </div>
      </div>
    </FinanceProvider>
  )
}
