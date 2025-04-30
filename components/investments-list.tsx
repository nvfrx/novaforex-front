"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, TrendingUp, Calendar, DollarSign, CheckCircle, Clock } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

// Tipo para os investimentos
type Investment = {
  id: string
  amount: number
  date: Date
  returnPercentage: number
  currentValue: number
  status: "active" | "completed"
}

// Função para calcular o valor atual baseado no rendimento diário de 3%
const calculateCurrentValue = (amount: number, date: Date): { value: number; percentage: number } => {
  const now = new Date()
  const investmentDate = new Date(date)
  const diffTime = Math.abs(now.getTime() - investmentDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  // Cálculo de juros compostos com 3% ao dia
  const currentValue = amount * Math.pow(1.03, diffDays)
  const returnPercentage = (currentValue / amount - 1) * 100

  // Limitar a 300%
  const cappedPercentage = Math.min(returnPercentage, 300)

  return {
    value: currentValue,
    percentage: cappedPercentage,
  }
}

export default function InvestmentsList() {
  // Estado para armazenar os investimentos (simulados)
  const [investments, setInvestments] = useState<Investment[]>([])
  const [loading, setLoading] = useState(true)

  // Simular carregamento de investimentos
  useEffect(() => {
    // Simulação de dados de investimentos
    const mockInvestments: Investment[] = [
      {
        id: "inv-001",
        amount: 1000,
        date: new Date(new Date().setDate(new Date().getDate() - 30)), // 30 dias atrás
        returnPercentage: 0,
        currentValue: 0,
        status: "active",
      },
      {
        id: "inv-002",
        amount: 5000,
        date: new Date(new Date().setDate(new Date().getDate() - 60)), // 60 dias atrás
        returnPercentage: 0,
        currentValue: 0,
        status: "active",
      },
      {
        id: "inv-003",
        amount: 2500,
        date: new Date(new Date().setDate(new Date().getDate() - 90)), // 90 dias atrás
        returnPercentage: 0,
        currentValue: 0,
        status: "active",
      },
    ]

    // Calcular valores atuais
    const updatedInvestments = mockInvestments.map((inv) => {
      const { value, percentage } = calculateCurrentValue(inv.amount, inv.date)
      return {
        ...inv,
        currentValue: value,
        returnPercentage: percentage,
        status: percentage >= 300 ? "completed" : "active",
      }
    })

    // Simular tempo de carregamento
    setTimeout(() => {
      setInvestments(updatedInvestments)
      setLoading(false)
    }, 1000)
  }, [])

  // Atualizar valores a cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setInvestments((prevInvestments) =>
        prevInvestments.map((inv) => {
          const { value, percentage } = calculateCurrentValue(inv.amount, inv.date)
          return {
            ...inv,
            currentValue: value,
            returnPercentage: percentage,
            status: percentage >= 300 ? "completed" : "active",
          }
        }),
      )
    }, 60000) // Atualizar a cada minuto

    return () => clearInterval(interval)
  }, [])

  // Renderizar estado de carregamento
  if (loading) {
    return (
      <Card className="gradient-border">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl lg:text-3xl font-bold text-center bg-gradient-to-r from-white via-neon-cyan to-white bg-clip-text text-transparent pb-2 flex items-center justify-center gap-2">
            <PieChart className="h-5 w-5 md:h-7 md:w-7 text-neon-cyan" /> Meus Investimentos
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8 md:py-12">
          <div className="animate-spin h-8 w-8 md:h-12 md:w-12 border-4 border-neon-cyan rounded-full border-t-transparent mb-4"></div>
          <p className="text-gray-400">Carregando seus investimentos...</p>
        </CardContent>
      </Card>
    )
  }

  // Renderizar mensagem quando não há investimentos
  if (investments.length === 0) {
    return (
      <Card className="gradient-border">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl lg:text-3xl font-bold text-center bg-gradient-to-r from-white via-neon-cyan to-white bg-clip-text text-transparent pb-2 flex items-center justify-center gap-2">
            <PieChart className="h-5 w-5 md:h-7 md:w-7 text-neon-cyan" /> Meus Investimentos
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8 md:py-12">
          <div className="bg-black/40 rounded-full p-4 md:p-6 mb-4">
            <PieChart className="h-8 w-8 md:h-12 md:w-12 text-gray-500" />
          </div>
          <h3 className="text-lg md:text-xl font-medium mb-2 text-center">
            Você ainda não possui investimentos ativos
          </h3>
          <p className="text-gray-400 mb-6 text-center max-w-md text-sm md:text-base">
            Comece agora mesmo a investir e aproveite rendimentos diários de até 3%
          </p>
          <Button className="bg-neon-cyan hover:bg-neon-cyan/80 text-black font-medium" asChild>
            <Link href="/fazer-investimento">Fazer Investimento</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Renderizar lista de investimentos
  return (
    <Card className="gradient-border overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_50%)]"></div>

      <CardHeader className="relative z-10">
        <CardTitle className="text-xl md:text-2xl lg:text-3xl font-bold text-center bg-gradient-to-r from-white via-neon-cyan to-white bg-clip-text text-transparent pb-2 flex items-center justify-center gap-2">
          <PieChart className="h-5 w-5 md:h-7 md:w-7 text-neon-cyan" /> Meus Investimentos
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10">
        <div className="space-y-4 md:space-y-6">
          {investments.map((investment, index) => (
            <motion.div
              key={investment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-black/40 border-gray-800 overflow-hidden hover:border-gray-700 transition-colors">
                <CardContent className="p-4 md:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-base md:text-lg font-medium flex items-center gap-1 md:gap-2">
                            <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-neon-cyan" /> Valor Investido
                          </h3>
                          <p className="text-lg md:text-2xl font-bold">
                            ${investment.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                        <div className="bg-gray-900 px-2 py-1 md:px-3 md:py-1 rounded-full flex items-center gap-1">
                          {investment.status === "active" ? (
                            <>
                              <Clock className="h-3 w-3 md:h-4 md:w-4 text-neon-cyan" />
                              <span className="text-[10px] md:text-xs font-medium text-neon-cyan">Ativo</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-neon-green" />
                              <span className="text-[10px] md:text-xs font-medium text-neon-green">Concluído</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 md:gap-6 flex-wrap">
                        <div>
                          <h4 className="text-xs md:text-sm text-gray-400 flex items-center gap-1">
                            <Calendar className="h-3 w-3 md:h-4 md:w-4" /> Data
                          </h4>
                          <p className="text-sm md:text-base font-medium">
                            {investment.date.toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs md:text-sm text-gray-400 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 md:h-4 md:w-4" /> Retorno
                          </h4>
                          <p className="text-sm md:text-base font-medium text-neon-green">
                            +{investment.returnPercentage.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      <div>
                        <h3 className="text-base md:text-lg font-medium flex items-center gap-1 md:gap-2">
                          <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-neon-green" /> Valor Atual
                        </h3>
                        <p className="text-lg md:text-2xl font-bold text-neon-green">
                          ${investment.currentValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </p>
                      </div>

                      <div className="space-y-1 md:space-y-2">
                        <div className="flex justify-between text-xs md:text-sm">
                          <span className="text-gray-400">Progresso</span>
                          <span className="font-medium">{investment.returnPercentage.toFixed(2)}% / 300%</span>
                        </div>
                        <div className="relative h-3 md:h-4 w-full overflow-hidden rounded-full bg-gray-900">
                          <div
                            className="h-full bg-gradient-to-r from-neon-cyan to-neon-green rounded-full transition-all duration-1000 ease-out progress-glow"
                            style={{ width: `${(investment.returnPercentage / 300) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
