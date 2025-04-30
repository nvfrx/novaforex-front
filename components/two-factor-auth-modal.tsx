"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { QrCode, Smartphone, Check, X, Copy, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TwoFactorAuthModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

export default function TwoFactorAuthModal({ isOpen, onClose, onComplete }: TwoFactorAuthModalProps) {
  const [step, setStep] = useState(1)
  const [verificationCode, setVerificationCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [secretKey] = useState("ABCDEF123456") // Simulação de chave secreta

  // Função para copiar a chave secreta
  const copySecretKey = () => {
    navigator.clipboard.writeText(secretKey)
  }

  // Validar e enviar o código
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!verificationCode || verificationCode.length !== 6) {
      setError("Por favor, insira um código de 6 dígitos.")
      return
    }

    setIsSubmitting(true)

    // Simular verificação do código
    setTimeout(() => {
      setIsSubmitting(false)

      // Simulação: código 123456 é válido
      if (verificationCode === "123456") {
        setStep(3) // Sucesso
        setTimeout(() => {
          onComplete()
        }, 2000)
      } else {
        setError("Código inválido. Por favor, tente novamente.")
      }
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={`step-${step}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-[#0e0e0e] border border-gray-800 rounded-xl w-full max-w-md overflow-hidden shadow-[0_0_25px_rgba(16,185,129,0.2)]"
        >
          {/* Cabeçalho */}
          <div className="border-b border-gray-800 p-4 flex justify-between items-center">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-neon-cyan" />
              Configurar Autenticação em Duas Etapas
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
              disabled={isSubmitting}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Conteúdo */}
          <div className="p-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Passo 1: Escaneie o QR Code</h3>
                  <p className="text-gray-400 text-sm">
                    Use um aplicativo autenticador como Google Authenticator ou Authy para escanear o QR code abaixo.
                  </p>
                </div>

                {/* QR Code (simulado) */}
                <div className="flex justify-center">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="w-48 h-48 relative">
                      <QrCode className="w-full h-full text-black" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black rounded-lg p-1">
                          <Smartphone className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chave secreta */}
                <div className="space-y-2">
                  <Label className="text-sm text-gray-400">Ou insira esta chave manualmente:</Label>
                  <div className="flex">
                    <div className="flex-1 bg-black/40 border border-gray-800 rounded-l-md p-2 font-mono text-sm">
                      {secretKey}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-l-none border border-l-0 border-gray-800"
                      onClick={copySecretKey}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={() => setStep(2)}
                  className="w-full bg-black border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
                >
                  Continuar <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Passo 2: Verifique o Código</h3>
                  <p className="text-gray-400 text-sm">
                    Insira o código de 6 dígitos gerado pelo seu aplicativo autenticador.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="verification-code" className="text-sm text-gray-400">
                      Código de Verificação
                    </Label>
                    <Input
                      id="verification-code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                      className="bg-black/40 border-gray-800 focus:border-neon-cyan focus:ring-neon-cyan/20 text-center text-lg tracking-widest"
                      placeholder="000000"
                      maxLength={6}
                      autoComplete="off"
                    />
                    <p className="text-xs text-gray-500">Dica: Para testar, use o código 123456</p>
                  </div>

                  {error && (
                    <div className="text-red-400 text-sm flex items-center gap-2">
                      <X className="h-4 w-4" />
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 border-gray-800 hover:bg-gray-800/50"
                      onClick={() => setStep(1)}
                      disabled={isSubmitting}
                    >
                      Voltar
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-black border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin h-4 w-4 border-2 border-neon-cyan rounded-full border-t-transparent"></div>
                          <span>Verificando...</span>
                        </div>
                      ) : (
                        "Verificar"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 text-center py-4">
                <div className="flex justify-center">
                  <div className="rounded-full bg-neon-green/20 p-4">
                    <Check className="h-12 w-12 text-neon-green" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-neon-green">2FA Ativado com Sucesso!</h3>
                  <p className="text-gray-400">Sua conta agora está protegida com autenticação em duas etapas.</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
