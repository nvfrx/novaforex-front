"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DollarSign, AlertCircle, Copy, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet } from "lucide-react"

export default function InvestmentForm() {
  const [amount, setAmount] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [showWallet, setShowWallet] = useState(false)
  const [copied, setCopied] = useState(false)

  // Estados para a seção "Investir com Saldo"
  const [balanceAmount, setBalanceAmount] = useState<string>("")
  const [availableBalance, setAvailableBalance] = useState<number>(1250.75) // Simulando um saldo disponível
  const [balanceError, setBalanceError] = useState<string | null>(null)
  const [isSubmittingBalance, setIsSubmittingBalance] = useState(false)
  const [balanceSuccess, setBalanceSuccess] = useState(false)
  const [newBalance, setNewBalance] = useState<number | null>(null)

  // Wallet address (example)
  const walletAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAmount(value)

    // Clear error when user starts typing again
    if (error) setError(null)
  }

  const handleBalanceAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setBalanceAmount(value)

    // Clear error when user starts typing again
    if (balanceError) setBalanceError(null)

    // Calculate new balance
    const numAmount = Number.parseFloat(value || "0")
    if (!isNaN(numAmount)) {
      setNewBalance(availableBalance - numAmount)
    }

    // Validate if amount is greater than available balance
    if (numAmount > availableBalance) {
      setBalanceError("Você não tem saldo suficiente para este investimento.")
    } else {
      setBalanceError(null)
    }
  }

  const validateAmount = () => {
    const numAmount = Number.parseFloat(amount)

    if (isNaN(numAmount)) {
      setError("Por favor, insira um valor válido")
      return false
    }

    if (numAmount < 20) {
      setError("O valor mínimo de investimento é US$20")
      return false
    }

    if (numAmount > 20000) {
      setError("O valor máximo de investimento é US$20.000")
      return false
    }

    setError(null)
    return true
  }

  const validateBalanceAmount = () => {
    const numAmount = Number.parseFloat(balanceAmount)

    if (isNaN(numAmount) || numAmount <= 0) {
      setBalanceError("Por favor, insira um valor válido")
      return false
    }

    if (numAmount < 20) {
      setBalanceError("O valor mínimo de investimento é US$20")
      return false
    }

    if (numAmount > availableBalance) {
      setBalanceError("Você não tem saldo suficiente para este investimento.")
      return false
    }

    setBalanceError(null)
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateAmount()) {
      setShowWallet(true)
    }
  }

  const handleBalanceSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateBalanceAmount()) {
      setIsSubmittingBalance(true)

      // Simular envio para API
      setTimeout(() => {
        setIsSubmittingBalance(false)
        setBalanceSuccess(true)

        // Atualizar saldo disponível
        const numAmount = Number.parseFloat(balanceAmount)
        setAvailableBalance((prev) => prev - numAmount)

        // Limpar campo após sucesso
        setTimeout(() => {
          setBalanceSuccess(false)
          setBalanceAmount("")
          setNewBalance(null)
        }, 3000)
      }, 1500)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  // Renderizar o formulário de investimento com saldo
  const renderBalanceInvestmentForm = () => (
    <form onSubmit={handleBalanceSubmit} className="space-y-6">
      {/* Saldo disponível */}
      <div className="bg-black/40 rounded-xl p-4 border border-gray-800">
        <div className="flex items-center gap-2 mb-2">
          <Wallet className="h-5 w-5 text-neon-green" />
          <h3 className="font-medium">Saldo Disponível para Investimento</h3>
        </div>
        <p className="text-2xl font-bold text-neon-green">${availableBalance.toFixed(2)} USDT</p>
      </div>

      {/* Campo de valor */}
      <div className="space-y-2">
        <Label htmlFor="balanceAmount" className="text-lg flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-neon-cyan" /> Valor do Investimento
        </Label>

        <div className="relative">
          <Input
            id="balanceAmount"
            type="number"
            placeholder="Digite o valor"
            value={balanceAmount}
            onChange={handleBalanceAmountChange}
            className="pl-10 h-14 text-lg bg-black/40 border-gray-800 focus:border-neon-cyan focus:ring-neon-cyan/20"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
        </div>

        {balanceError && (
          <div className="text-red-500 flex items-center gap-2 text-sm mt-1">
            <AlertCircle className="h-4 w-4" /> {balanceError}
          </div>
        )}
      </div>

      {/* Resumo do investimento */}
      {balanceAmount && !isNaN(Number(balanceAmount)) && Number(balanceAmount) > 0 && (
        <div className="bg-black/40 rounded-xl p-4 border border-gray-800">
          <h3 className="font-medium text-neon-cyan mb-3">Resumo do Investimento</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Valor a ser Investido:</span>
              <span className="font-medium">${Number.parseFloat(balanceAmount).toFixed(2)} USDT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Saldo Atual:</span>
              <span className={`font-medium ${newBalance && newBalance < 0 ? "text-red-500" : "text-neon-green"}`}>
                ${newBalance !== null ? newBalance.toFixed(2) : availableBalance.toFixed(2)} USDT
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Mensagem de sucesso */}
      {balanceSuccess && (
        <Alert className="bg-green-950/20 border-green-900/50 text-green-200">
          <AlertDescription className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-neon-green" />
            <span>Investimento realizado com sucesso!</span>
          </AlertDescription>
        </Alert>
      )}

      {/* Botão de envio */}
      <Button
        type="submit"
        className="w-full h-14 bg-gradient-to-r from-neon-cyan to-neon-green hover:from-neon-green hover:to-neon-cyan text-black font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 relative overflow-hidden group"
        disabled={isSubmittingBalance || !balanceAmount || !!balanceError || Number(balanceAmount) > availableBalance}
      >
        {isSubmittingBalance ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin h-5 w-5 border-2 border-black rounded-full border-t-transparent"></div>
            <span>Processando...</span>
          </div>
        ) : (
          <div className="relative z-10 flex items-center justify-center gap-2">
            Investir Agora <ArrowRight className="h-5 w-5" />
          </div>
        )}
        <span className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
      </Button>
    </form>
  )

  return (
    <Card className="gradient-border overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_50%)]"></div>

      <CardHeader className="relative z-10">
        <CardTitle className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-white via-neon-cyan to-white bg-clip-text text-transparent pb-2">
          Fazer Investimento
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10">
        <Tabs defaultValue="deposit" className="mb-6">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="deposit">Depósito</TabsTrigger>
            <TabsTrigger value="balance">Investir com Saldo</TabsTrigger>
          </TabsList>

          <TabsContent value="deposit">
            {!showWallet ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-neon-cyan" /> Valor do Investimento
                  </Label>

                  <div className="relative">
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Digite o valor"
                      value={amount}
                      onChange={handleAmountChange}
                      onBlur={validateAmount}
                      className="pl-10 h-14 text-lg bg-black/40 border-gray-800 focus:border-neon-cyan focus:ring-neon-cyan/20"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  </div>

                  {error && (
                    <div className="text-red-500 flex items-center gap-2 text-sm mt-1">
                      <AlertCircle className="h-4 w-4" /> {error}
                    </div>
                  )}
                </div>

                <div className="bg-black/40 rounded-xl p-4 space-y-2">
                  <h3 className="font-medium text-neon-cyan flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" /> Regras de Investimento
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-neon-cyan"></div>
                      Investimento mínimo: <span className="font-medium text-white">US$20</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-neon-cyan"></div>
                      Investimento máximo: <span className="font-medium text-white">US$20.000</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-neon-cyan"></div>
                      Moeda: <span className="font-medium text-white">USDT (rede BEP20)</span>
                    </li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-neon-cyan to-neon-green hover:from-neon-green hover:to-neon-cyan text-black font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 relative overflow-hidden group"
                  disabled={!amount || !!error}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Confirmar Investimento <ArrowRight className="h-5 w-5" />
                  </span>
                  <span className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-block rounded-full bg-neon-cyan/10 p-3 mb-4">
                    <CheckCircle className="h-8 w-8 text-neon-cyan" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Investimento Confirmado</h3>
                  <p className="text-gray-400">
                    Envie exatamente{" "}
                    <span className="text-white font-medium">${Number.parseFloat(amount).toFixed(2)} USDT</span> para a
                    carteira abaixo
                  </p>
                </div>

                <div className="bg-black/40 rounded-xl p-4">
                  <Label className="text-sm text-gray-400 mb-2 block">Carteira USDT (BEP20)</Label>
                  <div className="flex items-center">
                    <div className="bg-gray-900 p-3 rounded-l-lg border border-gray-800 flex-1 font-mono text-sm overflow-hidden text-ellipsis">
                      {walletAddress}
                    </div>
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      className="rounded-l-none h-12 border border-l-0 border-gray-800 bg-gray-900 hover:bg-gray-800"
                    >
                      {copied ? <CheckCircle className="h-5 w-5 text-neon-green" /> : <Copy className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>

                <Alert className="bg-amber-950/20 border-amber-900/50 text-amber-200">
                  <AlertDescription className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="font-medium">Atenção:</strong> Envie exatamente o valor informado para a
                      carteira exibida. Pagamentos diferentes podem causar atrasos.
                    </span>
                  </AlertDescription>
                </Alert>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    className="border-gray-700 hover:bg-gray-800"
                    onClick={() => setShowWallet(false)}
                  >
                    Voltar
                  </Button>

                  <Button className="bg-neon-cyan hover:bg-neon-cyan/80 text-black font-medium" asChild>
                    <Link href="/">Concluir</Link>
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="balance">{renderBalanceInvestmentForm()}</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
