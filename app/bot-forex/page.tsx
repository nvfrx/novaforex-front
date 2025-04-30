import ForexMicroBot from "@/components/forex-micro-bot"
import DashboardLayout from "@/components/dashboard-layout"
import PageTransition from "@/components/page-transition"
import TradingViewChart from "@/components/trading-view-chart"
import { FinanceProvider } from "@/contexts/finance-context"

export default function BotForexPage() {
  return (
    <DashboardLayout>
      <PageTransition>
        <FinanceProvider>
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-white via-neon-cyan to-white bg-clip-text text-transparent pb-6 pt-2">
              Simulação de Micro Operações Forex
            </h1>
            <TradingViewChart />
            <div className="mt-6">
              <ForexMicroBot />
            </div>
          </div>
        </FinanceProvider>
      </PageTransition>
    </DashboardLayout>
  )
}
