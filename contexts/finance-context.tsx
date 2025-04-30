"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Tipo para os dados financeiros
export type FinanceData = {
  saldoTotal: number
  rendimentoDia: number
  totalInvestido: number
  saldoComissoes: number
  totalSaques: number
  operacoesRealizadas: number
  vitorias: number
  derrotas: number
  percentualAcerto: number
  minhaRede: number
}

// Modificar os valores iniciais para refletir o primeiro investimento
const initialFinanceData: FinanceData = {
  saldoTotal: 0,
  rendimentoDia: 0,
  totalInvestido: 1000,
  saldoComissoes: 0,
  totalSaques: 0,
  operacoesRealizadas: 0,
  vitorias: 0,
  derrotas: 0,
  percentualAcerto: 0,
  minhaRede: 23, // Valor inicial de exemplo
}

// Tipo para o contexto
type FinanceContextType = {
  financeData: FinanceData
  updateFinanceData: (updates: Partial<FinanceData>) => void
  resetDailyValues: () => void
}

// Criação do contexto
const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

// Provider do contexto
export function FinanceProvider({ children }: { children: ReactNode }) {
  const [financeData, setFinanceData] = useState<FinanceData>(initialFinanceData)
  const [currentDay, setCurrentDay] = useState(new Date().toDateString())

  // Função para atualizar os dados financeiros
  const updateFinanceData = (updates: Partial<FinanceData>) => {
    setFinanceData((prev) => ({
      ...prev,
      ...updates,
    }))
  }

  // Função para resetar valores diários
  const resetDailyValues = () => {
    setFinanceData((prev) => ({
      ...prev,
      rendimentoDia: 0,
      operacoesRealizadas: 0,
      vitorias: 0,
      derrotas: 0,
      percentualAcerto: 0,
    }))
  }

  // Verificar novo dia
  useEffect(() => {
    const checkNewDay = () => {
      const today = new Date().toDateString()
      if (today !== currentDay) {
        setCurrentDay(today)
        resetDailyValues()
      }
    }

    const interval = setInterval(checkNewDay, 60000) // Verificar a cada minuto
    return () => clearInterval(interval)
  }, [currentDay])

  return (
    <FinanceContext.Provider value={{ financeData, updateFinanceData, resetDailyValues }}>
      {children}
    </FinanceContext.Provider>
  )
}

// Hook para usar o contexto
export function useFinance() {
  const context = useContext(FinanceContext)
  if (context === undefined) {
    throw new Error("useFinance must be used within a FinanceProvider")
  }
  return context
}
