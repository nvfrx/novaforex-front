"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Percent, CircleDollarSign, Calendar } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

type InvestmentCalculatorProps = {
  onCalculate?: (value: number) => void
}

export default function InvestmentCalculator({ onCalculate }: InvestmentCalculatorProps) {
  const [amount, setAmount] = useState<number>(1000)
  const [months, setMonths] = useState<number>(12)
  const [rate, setRate] = useState<number>(2.5)
  const [result, setResult] = useState<number | null>(null)

  const handleCalculate = () => {
    // Compound interest formula: A = P(1 + r/n)^(nt)
    // Where:
    // A = Final amount
    // P = Principal (initial investment)
    // r = Annual interest rate (decimal)
    // n = Number of times the interest is compounded per year
    // t = Time in years

    const principal = amount
    const annualRate = rate / 100
    const compoundPerYear = 12
    const timeInYears = months / 12

    const finalAmount = principal * Math.pow(1 + annualRate / compoundPerYear, compoundPerYear * timeInYears)
    setResult(finalAmount)
    if (onCalculate) onCalculate(finalAmount)
  }

  return (
    <Card className="gradient-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-neon-blue" />
          <span>Calculadora de Investimentos</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4 md:col-span-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="amount" className="flex items-center gap-1">
                  <CircleDollarSign className="h-4 w-4" /> Valor inicial
                </Label>
                <span className="text-sm font-bold">${amount}</span>
              </div>
              <div className="flex items-center gap-2">
                <Slider
                  id="amount"
                  min={20}
                  max={20000}
                  step={10}
                  value={[amount]}
                  onValueChange={(value) => setAmount(value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min={20}
                  max={20000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="months" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> Período (meses)
                </Label>
                <span className="text-sm font-bold">{months} meses</span>
              </div>
              <div className="flex items-center gap-2">
                <Slider
                  id="months"
                  min={1}
                  max={60}
                  step={1}
                  value={[months]}
                  onValueChange={(value) => setMonths(value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min={1}
                  max={60}
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="rate" className="flex items-center gap-1">
                  <Percent className="h-4 w-4" /> Taxa mensal (%)
                </Label>
                <span className="text-sm font-bold">{rate}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Slider
                  id="rate"
                  min={0.1}
                  max={5}
                  step={0.1}
                  value={[rate]}
                  onValueChange={(value) => setRate(value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min={0.1}
                  max={5}
                  step={0.1}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>

            <Button className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white" onClick={handleCalculate}>
              Calcular
            </Button>
          </div>

          <div className="md:col-span-1">
            {result ? (
              <div className="p-4 h-full rounded-xl bg-neon-cyan/10 text-center flex flex-col justify-center">
                <p className="text-sm text-muted-foreground">Valor futuro estimado:</p>
                <p className="text-2xl font-bold text-neon-cyan">${result.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Ganho: ${(result - amount).toFixed(2)} ({((result / amount - 1) * 100).toFixed(2)}%)
                </p>
              </div>
            ) : (
              <div className="p-4 h-full rounded-xl bg-muted/20 text-center flex flex-col justify-center">
                <p className="text-sm text-muted-foreground">
                  Preencha os valores e clique em calcular para ver o resultado
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
