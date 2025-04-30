"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DollarSign, AlertCircle, Wallet, Clock, CheckCircle, ArrowRight, Info, AlertTriangle, Ban } from "lucide-react"
import { motion } from "framer-motion"

export default function WithdrawalForm() {
  const [amount, setAmount] = useState<string>("")
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [hasDailyWithdrawal, setHasDailyWithdrawal] = useState(false)

  // Simular verificação de saque diário (normalmente viria do backend)
  useEffect(() => {
    // Simulação: 30% de chance de já ter feito saque no dia
    const hasWithdrawn = Math.random() < 0.3
    setHasDailyWithdrawal(hasWithdrawn)
  }, [])

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAmount(value)

    // Clear error when user starts typing again
    if (error) setError(null)
  }

  const handleWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setWalletAddress(value)

    // Clear error when user starts typing again
    if (error) setError(null)
  }

  const validateForm = () => {
    // Verificar se já fez saque no dia
    if (hasDailyWithdrawal) {
      setError("Você já atingiu o limite diário de saques (1 por dia).")
      return false
    }

    // Validar valor
    const numAmount = Number.parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Por favor, insira um valor válido.")
      return false
    }

    if (numAmount < 20) {
      setError("O valor mínimo de saque é US$20.")
      return false
    }

    if (numAmount > 5000) {
      setError("O valor máximo de saque diário é US$5.000.")
      return false
    }

    // Validar carteira
    if (!walletAddress || walletAddress.trim().length < 10) {
      setError("Por favor, insira um endereço de carteira válido.")
      return false
    }

    setError(null)
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simular envio para API
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSuccess(true)
      }, 2000)
    }
  }

  // Renderizar o formulário de saque
  const renderWithdrawalForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informações importantes */}
      <div className="bg-black/40 rounded-xl p-4 border border-gray-800">
        <h3 className="font-medium text-neon-cyan flex items-center gap-2 mb-3">
          <Info className="h-4 w-4" /> Informações Importantes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-start gap-2 bg-black/40 p-3 rounded-lg">
            <div className="h-5 w-5 mt-0.5 rounded-full bg-neon-green/10 flex items-center justify-center flex-shrink-0">
              <DollarSign className="h-3 w-3 text-neon-green" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Saque mínimo</p>
              <p className="text-sm font-medium">$20</p>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-black/40 p-3 rounded-lg">
            <div className="h-5 w-5 mt-0.5 rounded-full bg-neon-green/10 flex items-center justify-center flex-shrink-0">
              <DollarSign className="h-3 w-3 text-neon-green" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Saque máximo diário</p>
              <p className="text-sm font-medium">$5.000</p>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-black/40 p-3 rounded-lg">
            <div className="h-5 w-5 mt-0.5 rounded-full bg-neon-green/10 flex items-center justify-center flex-shrink-0">
              <Clock className="h-3 w-3 text-neon-green" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Frequência</p>
              <p className="text-sm font-medium">1 saque por dia</p>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-black/40 p-3 rounded-lg">
            <div className="h-5 w-5 mt-0.5 rounded-full bg-neon-green/10 flex items-center justify-center flex-shrink-0">
              <Wallet className="h-3 w-3 text-neon-green" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Método</p>
              <p className="text-sm font-medium">USDT (rede BEP20)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerta de limite diário */}
      {hasDailyWithdrawal && (
        <Alert className="bg-red-950/20 border-red-900/50 text-red-200">
          <AlertDescription className="flex items-start gap-2">
            <Ban className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <span>
              <strong className="font-medium">Limite atingido:</strong> Você já realizou um saque hoje. Apenas 1 saque
              por dia é permitido.
            </span>
          </AlertDescription>
        </Alert>
      )}

      {/* Campo de valor */}
      <div className="space-y-2">
        <Label htmlFor="amount" className="text-lg flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-neon-cyan" /> Valor do Saque
        </Label>

        <div className="relative">
          <Input
            id="amount"
            type="number"
            placeholder="Digite o valor em dólares"
            value={amount}
            onChange={handleAmountChange}
            className="pl-10 h-14 text-lg bg-black/40 border-gray-800 focus:border-neon-cyan focus:ring-neon-cyan/20"
            disabled={hasDailyWithdrawal}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
        </div>
      </div>

      {/* Campo de carteira */}
      <div className="space-y-2">
        <Label htmlFor="wallet" className="text-lg flex items-center gap-2">
          <Wallet className="h-5 w-5 text-neon-cyan" /> Carteira USDT (BEP20)
        </Label>

        <Input
          id="wallet"
          type="text"
          placeholder="Endereço da sua carteira USDT (BEP20)"
          value={walletAddress}
          onChange={handleWalletChange}
          className="h-14 text-lg bg-black/40 border-gray-800 focus:border-neon-cyan focus:ring-neon-cyan/20"
          disabled={hasDailyWithdrawal}
        />
      </div>

      {/* Mensagem de erro */}
      {error && (
        <div className="text-red-500 flex items-center gap-2 text-sm mt-1">
          <AlertCircle className="h-4 w-4" /> {error}
        </div>
      )}

      {/* Alerta de processamento */}
      <Alert className="bg-amber-950/20 border-amber-900/50 text-amber-200">
        <AlertDescription className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
          <span>
            <strong className="font-medium">Atenção:</strong> Os saques são processados em até 24 horas úteis. Verifique
            cuidadosamente o endereço da sua carteira.
          </span>
        </AlertDescription>
      </Alert>

      {/* Botão de envio */}
      <Button
        type="submit"
        className="w-full h-14 bg-black border border-neon-green text-neon-green hover:bg-neon-green/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 text-lg font-medium"
        disabled={isSubmitting || hasDailyWithdrawal}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin h-5 w-5 border-2 border-neon-green rounded-full border-t-transparent"></div>
            <span>Processando...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span>Solicitar Saque</span>
            <ArrowRight className="h-5 w-5" />
          </div>
        )}
      </Button>
    </form>
  )

  // Renderizar mensagem de sucesso
  const renderSuccessMessage = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-8"
    >
      <div className="rounded-full bg-neon-green/20 p-6 mb-6">
        <CheckCircle className="h-16 w-16 text-neon-green" />
      </div>

      <h3 className="text-2xl font-bold mb-2 text-center">Solicitação Enviada com Sucesso!</h3>
      <p className="text-gray-400 text-center mb-8 max-w-md">
        Sua solicitação de saque foi recebida e será processada em até 24 horas úteis. Você receberá uma notificação
        quando o saque for concluído.
      </p>

      <div className="bg-black/40 rounded-xl p-4 border border-gray-800 w-full max-w-md">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Valor solicitado:</span>
            <span className="font-medium">${Number.parseFloat(amount).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Carteira:</span>
            <span className="font-medium truncate max-w-[200px]">{walletAddress}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Status:</span>
            <span className="text-amber-400 flex items-center gap-1">
              <Clock className="h-4 w-4" /> Em processamento
            </span>
          </div>
        </div>
      </div>

      <Button
        className="mt-8 bg-neon-cyan hover:bg-neon-cyan/80 text-black"
        onClick={() => {
          setIsSuccess(false)
          setAmount("")
          setWalletAddress("")
        }}
      >
        Fazer Nova Solicitação
      </Button>
    </motion.div>
  )

  return (
    <Card className="gradient-border overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_50%)]"></div>

      <CardHeader className="relative z-10">
        <CardTitle className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-white via-neon-cyan to-white bg-clip-text text-transparent pb-2">
          Efetuar Saque
        </CardTitle>
        <p className="text-gray-400 text-center">Solicite seu saque de forma rápida e segura.</p>
      </CardHeader>

      <CardContent className="relative z-10">{isSuccess ? renderSuccessMessage() : renderWithdrawalForm()}</CardContent>
    </Card>
  )
}
