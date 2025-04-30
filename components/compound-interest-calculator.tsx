"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, DollarSign, Calendar, ArrowRight, TrendingUp, Info } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CompoundInterestCalculator() {
  const [initialAmount, setInitialAmount] = useState<number>(100)
  const [finalAmount, setFinalAmount] = useState<number>(0)
  const [isCompoundingEnabled, setIsCompoundingEnabled] = useState<boolean>(false)
  const [isCalculated, setIsCalculated] = useState<boolean>(false)

  // Taxa fixa de 3% ao dia útil
  const DAILY_RATE = 0.03
  // Total de dias úteis fixo em 47
  const TOTAL_BUSINESS_DAYS = 47

  // Calcular o valor final quando o componente é montado
  useEffect(() => {
    calculateFinalAmount()
  }, [])

  const calculateFinalAmount = () => {
    let result = initialAmount

    if (isCompoundingEnabled) {
      // Aplicar juros compostos (3% ao dia por 47 dias úteis)
      result = initialAmount * Math.pow(1 + DAILY_RATE, TOTAL_BUSINESS_DAYS)
    } else {
      // Sem juros compostos, apenas o valor inicial
      result = initialAmount
    }

    setFinalAmount(result)
    setIsCalculated(true)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (!isNaN(value) && value > 0) {
      setInitialAmount(value)
      setIsCalculated(false)
    }
  }

  const toggleCompounding = () => {
    setIsCompoundingEnabled(!isCompoundingEnabled)
    setIsCalculated(false)
  }

  return (
    <Card className="gradient-border">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-neon-cyan" />
          <span>Calculadora de Juros Compostos</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calculadora */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="initialAmount" className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-neon-cyan" /> Valor Inicial (USDT)
                </Label>
                <div className="relative">
                  <Input
                    id="initialAmount"
                    type="number"
                    min={1}
                    value={initialAmount}
                    onChange={handleAmountChange}
                    className="pl-8 h-12 text-lg bg-black/40 border-gray-800 focus:border-neon-green focus:ring-neon-green/20"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessDays" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-neon-cyan" /> Dias Úteis
                </Label>
                <Input
                  id="businessDays"
                  type="number"
                  value={TOTAL_BUSINESS_DAYS}
                  disabled
                  className="h-12 text-lg bg-black/40 border-gray-800"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="finalAmount" className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-neon-green" /> Valor Final (USDT)
                </Label>
                <div className="relative">
                  <Input
                    id="finalAmount"
                    type="text"
                    value={isCalculated ? finalAmount.toFixed(2) : "Clique em Calcular"}
                    disabled
                    className="pl-8 h-12 text-lg bg-black/40 border-gray-800 text-neon-green font-bold"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-green">$</span>
                </div>
              </div>

              <Button
                onClick={calculateFinalAmount}
                className="w-full h-12 bg-gradient-to-r from-neon-cyan to-neon-green hover:from-neon-green hover:to-neon-cyan text-black font-bold rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all duration-300"
              >
                Calcular
              </Button>
            </div>

            <div className="bg-black/40 rounded-xl p-4 border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-neon-green/10 flex items-center justify-center">
                    <span className="text-neon-green font-bold">3%</span>
                  </div>
                  <span className="font-medium">Taxa de Rendimento Diária</span>
                </div>
                <span className="text-neon-green font-bold">Fixa</span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Aplicado apenas em dias úteis (segunda a sexta)</span>
              </div>
            </div>
          </div>

          {/* Ativação de Juros Compostos */}
          <div className="bg-card/40 rounded-xl p-6 flex flex-col">
            <h3 className="text-neon-cyan text-lg font-medium mb-4">Ativação de Juros Compostos</h3>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-neon-green" />
                <span className="font-medium">Juros Compostos</span>
              </div>
              <Switch
                checked={isCompoundingEnabled}
                onCheckedChange={toggleCompounding}
                className="data-[state=checked]:bg-neon-green"
              />
            </div>

            <div className="bg-black/40 rounded-xl p-4 border border-gray-800 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className={`h-3 w-3 rounded-full ${isCompoundingEnabled ? "bg-neon-green" : "bg-gray-600"}`}></div>
                <span className="font-medium">
                  Status:{" "}
                  <span className={isCompoundingEnabled ? "text-neon-green" : "text-gray-400"}>
                    {isCompoundingEnabled ? "Ativado" : "Desativado"}
                  </span>
                </span>
              </div>
            </div>

            <Alert className="bg-blue-950/20 border-blue-900/50 text-blue-200 mb-6">
              <AlertDescription className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>
                  Ao ativar os Juros Compostos, os rendimentos diários de 3% serão automaticamente reinvestidos,
                  aumentando o seu saldo.
                </span>
              </AlertDescription>
            </Alert>

            {isCalculated && isCompoundingEnabled && (
              <div className="bg-neon-green/10 rounded-xl p-4 border border-neon-green/30">
                <h4 className="text-neon-green font-medium mb-2">Resumo do Rendimento</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Valor Inicial:</span>
                    <span className="font-medium">${initialAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rendimento Total:</span>
                    <span className="font-medium text-neon-green">
                      ${(finalAmount - initialAmount).toFixed(2)}({((finalAmount / initialAmount - 1) * 100).toFixed(2)}
                      %)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Valor Final após {TOTAL_BUSINESS_DAYS} dias:</span>
                    <span className="font-bold text-neon-green">${finalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            <Button
              className="mt-auto bg-gradient-to-r from-neon-cyan to-neon-green hover:from-neon-green hover:to-neon-cyan text-black font-bold rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all duration-300"
              onClick={() => (window.location.href = "/fazer-investimento")}
            >
              <span className="flex items-center gap-2">
                Investir Agora <ArrowRight className="h-4 w-4" />
              </span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
