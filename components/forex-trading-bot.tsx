"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Square, TrendingUp, BarChart2, Target } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"

type Operation = {
  id: number
  pair: string
  type: "Compra" | "Venda"
  entryPrice: number
  exitPrice: number
  profit: number
}

export default function ForexTradingBot() {
  const [isActive, setIsActive] = useState(false)
  const [totalProfit, setTotalProfit] = useState(0)
  const [totalOperations, setTotalOperations] = useState(0)
  const [operations, setOperations] = useState<Operation[]>([])
  const [currentBalance, setCurrentBalance] = useState(1000) // Banca inicial de 1000 USDT
  const [dailyGoalProgress, setDailyGoalProgress] = useState(0)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const chartContainerRef = useRef<HTMLDivElement>(null)

  // Meta diária de 3%
  const DAILY_GOAL = 0.03

  // Inicializar o widget do TradingView
  useEffect(() => {
    if (chartContainerRef.current && typeof window !== "undefined") {
      // Verificar se o script do TradingView já foi carregado
      if (!window.TradingView) {
        const script = document.createElement("script")
        script.src = "https://s3.tradingview.com/tv.js"
        script.async = true
        script.onload = initializeChart
        document.body.appendChild(script)
      } else {
        initializeChart()
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Inicializar o gráfico do TradingView
  const initializeChart = () => {
    if (window.TradingView && chartContainerRef.current) {
      new window.TradingView.widget({
        width: "100%",
        height: 400,
        symbol: "XAUUSD",
        interval: "5",
        timezone: "exchange",
        theme: "dark",
        style: "1",
        locale: "pt",
        toolbar_bg: "#131722",
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: "tradingview-chart",
      })
    }
  }

  // Iniciar o bot
  const startBot = () => {
    setIsActive(true)

    // Iniciar operações simuladas
    intervalRef.current = setInterval(() => {
      // Calcular valor da operação com base na banca e meta diária
      const operationValue = currentBalance * DAILY_GOAL // 3% da banca total

      // Paridades de Forex para o bot operar
      const currencyPairs = ["EUR/USD", "GBP/USD", "USD/JPY", "XAU/USD"]
      const selectedPair = currencyPairs[Math.floor(Math.random() * currencyPairs.length)]
      const operationType = Math.random() > 0.5 ? "Compra" : "Venda"

      // Preços de entrada e saída
      const entryPrice = Number.parseFloat((Math.random() * (1.2 - 1.1) + 1.1).toFixed(3))
      const exitPrice = Number.parseFloat((Math.random() * (1.3 - 1.0) + 1.0).toFixed(3))

      // Determinar lucro ou perda da operação (95% de chance de lucro)
      let profit = 0
      if (Math.random() < 0.95) {
        // Operação com lucro (95% de chance)
        profit = operationValue * 0.03 // 3% de lucro sobre o valor da operação
      } else {
        // Operação com perda (5% de chance)
        profit = -operationValue * 0.02 // 2% de perda sobre o valor da operação
      }

      // Criar nova operação
      const newOperation: Operation = {
        id: Date.now(),
        pair: selectedPair,
        type: operationType as "Compra" | "Venda",
        entryPrice,
        exitPrice,
        profit,
      }

      // Atualizar banca
      setCurrentBalance((prev) => {
        const newBalance = prev + profit
        return Number.parseFloat(newBalance.toFixed(2))
      })

      // Atualizar progresso da meta diária
      setDailyGoalProgress((prev) => {
        const newProgress = prev + (profit / (1000 * DAILY_GOAL)) * 100
        return Math.min(100, Math.max(0, newProgress))
      })

      // Atualizar estado
      setOperations((prevOperations) => {
        // Manter apenas as últimas 10 operações
        const updatedOperations = [newOperation, ...prevOperations]
        if (updatedOperations.length > 10) {
          return updatedOperations.slice(0, 10)
        }
        return updatedOperations
      })

      setTotalProfit((prev) => Number.parseFloat((prev + profit).toFixed(2)))
      setTotalOperations((prev) => prev + 1)
    }, 10000) // Atualizado para 10 segundos
  }

  // Parar o bot
  const stopBot = () => {
    setIsActive(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  return (
    <Card className="gradient-border">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-neon-cyan" />
          <span>Simulação de Operações Forex com Gerenciamento de Banca</span>
          {isActive ? (
            <Badge variant="outline" className="ml-2 bg-neon-green/10 text-neon-green">
              <span className="mr-1 h-2 w-2 rounded-full bg-neon-green inline-block animate-pulse"></span>
              Ativo
            </Badge>
          ) : (
            <Badge variant="outline" className="ml-2 bg-gray-800 text-gray-400">
              <span className="mr-1 h-2 w-2 rounded-full bg-gray-500 inline-block"></span>
              Inativo
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Controles do Bot */}
          <div className="space-y-6">
            <div className="bg-black/40 rounded-xl p-4 border border-gray-800">
              <h3 className="font-medium text-neon-cyan mb-4">Controles do Bot</h3>

              <div className="space-y-4">
                <Button
                  onClick={startBot}
                  disabled={isActive}
                  className="w-full bg-neon-cyan hover:bg-neon-cyan/80 text-black font-medium flex items-center justify-center gap-2"
                >
                  <Play className="h-4 w-4" /> Iniciar Bot
                </Button>

                <Button
                  onClick={stopBot}
                  disabled={!isActive}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-medium flex items-center justify-center gap-2"
                >
                  <Square className="h-4 w-4" /> Parar Bot
                </Button>
              </div>
            </div>

            <div className="bg-black/40 rounded-xl p-4 border border-gray-800">
              <h3 className="font-medium text-neon-cyan mb-4">Status do Bot</h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className={isActive ? "text-neon-green" : "text-gray-400"}>
                    {isActive ? "Ativado" : "Desativado"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Lucro Total:</span>
                  <span className={totalProfit >= 0 ? "text-neon-green" : "text-red-500"}>
                    {totalProfit.toFixed(2)} USDT
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Operações Realizadas:</span>
                  <span className="font-medium">{totalOperations}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Banca Atual:</span>
                  <span className={currentBalance >= 1000 ? "text-neon-green font-medium" : "text-red-500 font-medium"}>
                    {currentBalance.toFixed(2)} USDT
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-black/40 rounded-xl p-4 border border-gray-800">
              <h3 className="font-medium text-neon-cyan mb-4 flex items-center gap-2">
                <Target className="h-4 w-4" /> Meta Diária (3%)
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progresso:</span>
                  <span className="font-medium">{dailyGoalProgress.toFixed(0)}%</span>
                </div>
                <Progress value={dailyGoalProgress} className="h-2 bg-gray-800">
                  <div
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-green rounded-full transition-all duration-500"
                    style={{ width: `${dailyGoalProgress}%` }}
                  />
                </Progress>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>Meta: {(currentBalance * DAILY_GOAL).toFixed(2)} USDT</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gráfico e Tabela */}
          <div className="md:col-span-2 space-y-6">
            {/* Gráfico TradingView */}
            <div className="bg-black/40 rounded-xl border border-gray-800 overflow-hidden h-[400px]">
              <div id="tradingview-chart" ref={chartContainerRef} className="w-full h-full"></div>
            </div>

            {/* Tabela de Operações */}
            <div className="bg-black/40 rounded-xl p-4 border border-gray-800">
              <h3 className="font-medium text-neon-cyan mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> Operações em Tempo Real
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="py-2 px-4 text-left text-gray-400">Par de Moeda</th>
                      <th className="py-2 px-4 text-left text-gray-400">Tipo</th>
                      <th className="py-2 px-4 text-right text-gray-400">Preço Entrada</th>
                      <th className="py-2 px-4 text-right text-gray-400">Preço Saída</th>
                      <th className="py-2 px-4 text-right text-gray-400">Lucro/Perda</th>
                    </tr>
                  </thead>
                  <tbody>
                    {operations.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-4 text-center text-gray-500">
                          Nenhuma operação realizada ainda. Inicie o bot para começar.
                        </td>
                      </tr>
                    ) : (
                      operations.map((op) => (
                        <motion.tr
                          key={op.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border-b border-gray-800/50 hover:bg-gray-900/30"
                        >
                          <td className="py-2 px-4">{op.pair}</td>
                          <td className="py-2 px-4">
                            <Badge
                              variant="outline"
                              className={
                                op.type === "Compra"
                                  ? "bg-green-500/10 text-green-400 border-green-500/30"
                                  : "bg-red-500/10 text-red-400 border-red-500/30"
                              }
                            >
                              {op.type}
                            </Badge>
                          </td>
                          <td className="py-2 px-4 text-right">{op.entryPrice.toFixed(3)}</td>
                          <td className="py-2 px-4 text-right">{op.exitPrice.toFixed(3)}</td>
                          <td
                            className={`py-2 px-4 text-right font-medium ${op.profit >= 0 ? "text-neon-green" : "text-red-500"}`}
                          >
                            {op.profit.toFixed(2)} USDT
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Adicionar a definição do tipo TradingView para o TypeScript
declare global {
  interface Window {
    TradingView: any
  }
}
