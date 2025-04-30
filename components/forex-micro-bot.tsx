"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TrendingUp, Clock, DollarSign, BarChart3, Award, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useFinance } from "@/contexts/finance-context"

// Tipos para as operações
type OperationType = "buy" | "sell"
type Operation = {
  id: string
  type: OperationType
  timestamp: Date
  result: "win" | "loss"
  profit: number
  pair: string
}

// Pares de moedas disponíveis
const CURRENCY_PAIRS = ["EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF", "AUD/USD", "USD/CAD", "NZD/USD", "EUR/GBP"]

export default function ForexMicroBot() {
  // Contexto financeiro
  const { financeData, updateFinanceData } = useFinance()

  // Estados do bot
  const [operations, setOperations] = useState<Operation[]>([])
  const [dailyProfit, setDailyProfit] = useState(0)
  const [totalProfit, setTotalProfit] = useState(0)
  const [isOperating, setIsOperating] = useState(true) // Bot começa operando
  const [selectedPair, setSelectedPair] = useState("EUR/USD")
  const [statusMessage, setStatusMessage] = useState("Iniciando operações automáticas...")
  const [lastOperationTime, setLastOperationTime] = useState<Date | null>(null)
  const [currentDay, setCurrentDay] = useState(new Date().toDateString())
  const [restartTime, setRestartTime] = useState<number | null>(null)
  const [operationsCount, setOperationsCount] = useState(0)

  // Referências para intervalos
  const operationIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const statusUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Configurações do bot
  const DAILY_GOAL = 3 // 3% ao dia
  const TOTAL_MAX_PROFIT = 300 // 300% de rendimento total máximo
  const OPERATION_INTERVAL = 2000 // 2 segundos entre operações
  const WIN_RATE = 0.8 // 80% de acerto (atualizado do código compartilhado)
  const INITIAL_BALANCE = 1000 // Saldo inicial

  // Função para executar uma operação
  const executeOperation = () => {
    // Se não está operando, sai imediatamente
    if (!isOperating) return

    // Verificar se o rendimento total máximo foi atingido
    if (totalProfit >= TOTAL_MAX_PROFIT) {
      setIsOperating(false)
      setStatusMessage(`🚀 Meta total de ${TOTAL_MAX_PROFIT}% atingida! Bot finalizado.`)
      return
    }

    // Determinar o tipo de operação (compra ou venda)
    const operationType: OperationType = Math.random() > 0.5 ? "buy" : "sell"

    // Determinar o resultado (vitória ou derrota)
    const isWin = Math.random() <= WIN_RATE

    // Calcular o lucro/prejuízo exatamente como no código compartilhado
    const profit = isWin
      ? (0.0001 + Math.random() * 0.0014) * 100 // Pequeno lucro (0.01% a 0.15%)
      : -(0.0001 + Math.random() * 0.001) * 100 // Pequena perda (0.01% a 0.11%)

    // Criar a nova operação
    const newOperation: Operation = {
      id: Date.now().toString(),
      type: operationType,
      timestamp: new Date(),
      result: isWin ? "win" : "loss",
      profit,
      pair: selectedPair,
    }

    // Atualizar o estado
    setOperations((prev) => [newOperation, ...prev].slice(0, 100)) // Manter apenas as últimas 100 operações

    // Atualizar lucro diário e total
    setDailyProfit((prev) => {
      const newProfit = prev + profit
      return newProfit
    })

    setTotalProfit((prev) => prev + profit)
    setLastOperationTime(new Date())
    setOperationsCount((prev) => prev + 1)

    // Calcular valores para atualizar o contexto financeiro
    const newWins = isWin ? financeData.vitorias + 1 : financeData.vitorias
    const newLosses = !isWin ? financeData.derrotas + 1 : financeData.derrotas
    const newOperations = financeData.operacoesRealizadas + 1
    const newPercentualAcerto = newOperations > 0 ? (newWins / newOperations) * 100 : 0

    // Calcular o impacto monetário (convertendo percentual para valor monetário)
    // Usar o valor fixo de 1000 como base para o cálculo
    const impactoMonetario = (financeData.totalInvestido * profit) / 100

    // Atualizar o contexto financeiro
    updateFinanceData({
      saldoTotal: financeData.saldoTotal + impactoMonetario,
      rendimentoDia: dailyProfit, // Atualizar com o valor percentual
      operacoesRealizadas: newOperations,
      vitorias: newWins,
      derrotas: newLosses,
      percentualAcerto: newPercentualAcerto,
    })

    // Enviar sinal para o gráfico TradingView (simulado)
    if (window.TradingView && window.TradingView.signalOperation) {
      window.TradingView.signalOperation(operationType, selectedPair)
    }

    // Atualizar mensagem de status
    setStatusMessage(
      isWin
        ? `Operação de ${operationType === "buy" ? "COMPRA" : "VENDA"} bem-sucedida: +${profit.toFixed(4)}%`
        : `Operação de ${operationType === "buy" ? "COMPRA" : "VENDA"} com perda: ${profit.toFixed(4)}%`,
    )

    // Verificar se a meta diária foi atingida
    if (dailyProfit >= DAILY_GOAL) {
      // Parar o bot automaticamente
      setIsOperating(false)

      // Definir o horário para reiniciar após 24 horas
      const nextRestartTime = Date.now() + 86400000 // 86400000ms = 24 horas
      setRestartTime(nextRestartTime)

      setStatusMessage(`🚀 Meta diária de ${DAILY_GOAL}% atingida! Bot pausado por 24 horas.`)
    }
  }

  // Função para verificar se deve reiniciar o bot
  const checkRestart = () => {
    if (!isOperating && restartTime && Date.now() >= restartTime) {
      // Reiniciar o bot
      setDailyProfit(0)
      setOperationsCount(0) // Resetar contador de operações diárias
      setIsOperating(true)
      setRestartTime(null)
      setStatusMessage("✅ 24h passaram. Bot reiniciado para novo ciclo.")
    }
  }

  // Iniciar o bot automaticamente
  useEffect(() => {
    // Iniciar intervalo para operações
    operationIntervalRef.current = setInterval(() => {
      if (isOperating) {
        executeOperation()
      } else {
        checkRestart()
      }
    }, OPERATION_INTERVAL)

    // Intervalo para atualizar status
    statusUpdateIntervalRef.current = setInterval(() => {
      if (isOperating) {
        const messages = [
          "Analisando tendências de mercado...",
          "Verificando pontos de entrada...",
          "Monitorando volatilidade...",
          "Aplicando algoritmo preditivo...",
          "Calculando probabilidades de sucesso...",
          "Avaliando força do mercado...",
          "Analisando suportes e resistências...",
          "Verificando indicadores técnicos...",
        ]
        setStatusMessage(messages[Math.floor(Math.random() * messages.length)])
      } else if (restartTime) {
        // Mostrar contagem regressiva para reinício
        const timeLeft = restartTime - Date.now()
        if (timeLeft > 0) {
          const hours = Math.floor(timeLeft / 3600000)
          const minutes = Math.floor((timeLeft % 3600000) / 60000)
          const seconds = Math.floor((timeLeft % 60000) / 1000)
          setStatusMessage(`⏳ Bot pausado. Reiniciando em ${hours}h ${minutes}m ${seconds}s`)
        }
      }
    }, 5000)

    // Limpar intervalos ao desmontar
    return () => {
      if (operationIntervalRef.current) clearInterval(operationIntervalRef.current)
      if (statusUpdateIntervalRef.current) clearInterval(statusUpdateIntervalRef.current)
    }
  }, [isOperating, selectedPair, restartTime, dailyProfit, financeData])

  // Verificar novo dia
  useEffect(() => {
    const checkNewDay = () => {
      const today = new Date().toDateString()
      if (today !== currentDay) {
        setCurrentDay(today)
        setDailyProfit(0)
        setOperationsCount(0)
        setIsOperating(true)
        setRestartTime(null)
        setStatusMessage("✅ Novo dia detectado. Bot reiniciado para novo ciclo.")
      }
    }

    const interval = setInterval(checkNewDay, 60000) // Verificar a cada minuto

    return () => clearInterval(interval)
  }, [currentDay])

  // Calcular estatísticas
  const totalOperations = operations.length
  const winOperations = operations.filter((op) => op.result === "win").length
  const lossOperations = operations.filter((op) => op.result === "loss").length
  const winRate = totalOperations > 0 ? (winOperations / totalOperations) * 100 : 0
  const currentBalance = INITIAL_BALANCE * (1 + totalProfit / 100)

  return (
    <Card className="w-full bg-black/60 border border-neon-blue/20 shadow-lg rounded-xl overflow-hidden backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-black via-black/90 to-black border-b border-neon-blue/20 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan bg-clip-text text-transparent">
            Bot de Micro Operações Forex
          </CardTitle>
          <div className="flex items-center space-x-2">
            <select
              value={selectedPair}
              onChange={(e) => setSelectedPair(e.target.value)}
              className="bg-black/80 text-white border border-neon-blue/30 rounded-md text-sm p-1 focus:outline-none focus:ring-1 focus:ring-neon-blue"
            >
              {CURRENCY_PAIRS.map((pair) => (
                <option key={pair} value={pair}>
                  {pair}
                </option>
              ))}
            </select>
            <Badge
              variant="outline"
              className={cn(
                "text-xs font-medium",
                !isOperating
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                  : "bg-green-500/20 text-green-300 border-green-500/50 animate-pulse",
              )}
            >
              {!isOperating ? "Pausado" : "Operando"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Meta Diária ({DAILY_GOAL}%)</span>
                <span className="text-sm font-medium text-white">{dailyProfit.toFixed(4)}%</span>
              </div>
              <Progress
                value={(dailyProfit / DAILY_GOAL) * 100}
                max={100}
                className="h-2 bg-gray-700"
                indicatorClassName={cn(
                  dailyProfit < 0
                    ? "bg-gradient-to-r from-red-500 to-red-600"
                    : "bg-gradient-to-r from-neon-blue to-neon-cyan",
                )}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Meta Total ({TOTAL_MAX_PROFIT}%)</span>
                <span className="text-sm font-medium text-white">{totalProfit.toFixed(4)}%</span>
              </div>
              <Progress
                value={(totalProfit / TOTAL_MAX_PROFIT) * 100}
                max={100}
                className="h-2 bg-gray-700"
                indicatorClassName={cn(
                  totalProfit < 0
                    ? "bg-gradient-to-r from-red-500 to-red-600"
                    : "bg-gradient-to-r from-neon-purple to-neon-blue",
                )}
              />
            </div>

            <Alert className="bg-black/40 border border-neon-blue/30">
              <AlertDescription className="text-sm text-gray-300 flex items-center">
                <Clock className="h-4 w-4 mr-2 text-neon-cyan" />
                {lastOperationTime
                  ? `Última operação: ${lastOperationTime.toLocaleTimeString()}`
                  : "Iniciando operações..."}
              </AlertDescription>
            </Alert>
            {restartTime && !isOperating && (
              <Alert className="bg-black/40 border border-amber-500/30">
                <AlertDescription className="text-sm text-amber-300 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-amber-400" />
                  Reiniciando em: {new Date(restartTime).toLocaleString()}
                </AlertDescription>
              </Alert>
            )}

            <div className="bg-black/40 border border-neon-blue/20 rounded-md p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Status:</span>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs font-medium",
                    !isOperating
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                      : "bg-green-500/20 text-green-300 border-green-500/50",
                  )}
                >
                  {!isOperating ? (
                    <span className="flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1" /> Meta Atingida
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <span className="h-2 w-2 bg-green-400 rounded-full mr-1.5 animate-pulse"></span> Operando
                    </span>
                  )}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Card className="bg-black/40 border border-neon-blue/20 p-3">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-neon-cyan" />
                  Lucro Total
                </span>
                <span className="text-lg font-bold text-white">
                  {totalProfit > 0 ? "+" : ""}
                  {totalProfit.toFixed(4)}%
                </span>
              </div>
            </Card>

            <Card className="bg-black/40 border border-neon-blue/20 p-3">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 flex items-center">
                  <DollarSign className="h-3 w-3 mr-1 text-neon-cyan" />
                  Saldo Atual
                </span>
                <span className="text-lg font-bold text-white">${currentBalance.toFixed(2)}</span>
              </div>
            </Card>

            <Card className="bg-black/40 border border-neon-blue/20 p-3">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 flex items-center">
                  <BarChart3 className="h-3 w-3 mr-1 text-neon-cyan" />
                  Operações Hoje
                </span>
                <span className="text-lg font-bold text-white">{operationsCount}</span>
              </div>
            </Card>

            <Card className="bg-black/40 border border-neon-blue/20 p-3">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 flex items-center">
                  <Award className="h-3 w-3 mr-1 text-neon-cyan" />
                  Taxa de Acerto
                </span>
                <span className="text-lg font-bold text-white">{winRate.toFixed(1)}%</span>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-4">
          <Tabs defaultValue="operations" className="w-full">
            <TabsList className="bg-black/60 border border-neon-blue/30">
              <TabsTrigger value="operations" className="data-[state=active]:bg-neon-blue/20">
                Operações
              </TabsTrigger>
              <TabsTrigger value="stats" className="data-[state=active]:bg-neon-blue/20">
                Estatísticas
              </TabsTrigger>
            </TabsList>
            <TabsContent value="operations" className="mt-2">
              <div className="bg-black/40 border border-neon-blue/20 rounded-md p-2 h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-neon-blue/20 scrollbar-track-black/40">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-400 border-b border-neon-blue/20">
                      <th className="text-left py-2 px-2">Hora</th>
                      <th className="text-left py-2 px-2">Par</th>
                      <th className="text-left py-2 px-2">Tipo</th>
                      <th className="text-right py-2 px-2">Resultado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {operations.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-4 text-gray-500">
                          Aguardando primeiras operações...
                        </td>
                      </tr>
                    ) : (
                      operations.map((op) => (
                        <tr key={op.id} className="border-b border-neon-blue/10 hover:bg-neon-blue/5 transition-colors">
                          <td className="py-2 px-2 text-gray-300">{op.timestamp.toLocaleTimeString()}</td>
                          <td className="py-2 px-2 text-gray-300">{op.pair}</td>
                          <td className="py-2 px-2">
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs font-medium",
                                op.type === "buy"
                                  ? "bg-green-500/10 text-green-400 border-green-500/30"
                                  : "bg-red-500/10 text-red-400 border-red-500/30",
                              )}
                            >
                              {op.type === "buy" ? "COMPRA" : "VENDA"}
                            </Badge>
                          </td>
                          <td className="py-2 px-2 text-right">
                            <span
                              className={cn("font-medium", op.result === "win" ? "text-green-400" : "text-red-400")}
                            >
                              {op.result === "win" ? "+" : ""}
                              {op.profit.toFixed(4)}%
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="stats" className="mt-2">
              <div className="bg-black/40 border border-neon-blue/20 rounded-md p-4 h-[200px] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Operações Totais:</span>
                      <span className="text-white font-medium">{totalOperations}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Operações Hoje:</span>
                      <span className="text-white font-medium">{operationsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Vitórias:</span>
                      <span className="text-green-400 font-medium">{winOperations}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Perdas:</span>
                      <span className="text-red-400 font-medium">{lossOperations}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Taxa de Acerto:</span>
                      <span className="text-neon-cyan font-medium">{winRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Lucro Diário:</span>
                      <span className={cn("font-medium", dailyProfit >= 0 ? "text-green-400" : "text-red-400")}>
                        {dailyProfit > 0 ? "+" : ""}
                        {dailyProfit.toFixed(4)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Lucro Total:</span>
                      <span className={cn("font-medium", totalProfit >= 0 ? "text-green-400" : "text-red-400")}>
                        {totalProfit > 0 ? "+" : ""}
                        {totalProfit.toFixed(4)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Saldo Atual:</span>
                      <span className="text-neon-cyan font-medium">${currentBalance.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400 animate-pulse">{statusMessage}</p>
        </div>
      </CardContent>
    </Card>
  )
}
