"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, Lock, Smartphone, Check, Eye, EyeOff, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import TwoFactorAuthModal from "@/components/two-factor-auth-modal"

export default function SecuritySettings() {
  // Estados para o formulário de senha
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Estados para 2FA
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false)
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)

  // Validação e envio do formulário de senha
  const validatePasswordForm = () => {
    // Resetar mensagens
    setPasswordError(null)

    // Validar senha atual (simulado)
    if (!currentPassword) {
      setPasswordError("Por favor, insira sua senha atual.")
      return false
    }

    // Validar nova senha
    if (newPassword.length < 8) {
      setPasswordError("A nova senha deve ter pelo menos 8 caracteres.")
      return false
    }

    // Validar confirmação de senha
    if (newPassword !== confirmPassword) {
      setPasswordError("As senhas não coincidem.")
      return false
    }

    return true
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validatePasswordForm()) {
      setIsSubmittingPassword(true)

      // Simular chamada de API
      setTimeout(() => {
        setIsSubmittingPassword(false)
        setPasswordSuccess(true)

        // Limpar campos
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")

        // Limpar mensagem de sucesso após alguns segundos
        setTimeout(() => {
          setPasswordSuccess(false)
        }, 5000)
      }, 1500)
    }
  }

  // Manipulação do 2FA
  const handle2FAActivation = () => {
    setIs2FAModalOpen(true)
  }

  const onComplete2FA = () => {
    setIs2FAEnabled(true)
    setIs2FAModalOpen(false)
  }

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-neon-cyan to-white bg-clip-text text-transparent pb-2 flex items-center justify-center gap-2">
          <Shield className="h-8 w-8 text-neon-cyan" /> Configurações de Segurança
        </h1>
        <p className="text-gray-400 mt-2">Mantenha sua conta segura com nossas ferramentas de proteção.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Seção de Alterar Senha */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="gradient-border overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_50%)]"></div>

            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Lock className="h-5 w-5 text-neon-green" /> Alterar Senha
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10">
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                {/* Senha Atual */}
                <div className="space-y-2">
                  <Label htmlFor="current-password" className="text-sm text-gray-400">
                    Senha Atual
                  </Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="pr-10 bg-black/40 border-gray-800 focus:border-neon-green focus:ring-neon-green/20"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Nova Senha */}
                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-sm text-gray-400">
                    Nova Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pr-10 bg-black/40 border-gray-800 focus:border-neon-green focus:ring-neon-green/20"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">A senha deve ter pelo menos 8 caracteres.</p>
                </div>

                {/* Confirmar Nova Senha */}
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-sm text-gray-400">
                    Confirmar Nova Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pr-10 bg-black/40 border-gray-800 focus:border-neon-green focus:ring-neon-green/20"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Mensagem de erro */}
                {passwordError && (
                  <Alert className="bg-red-950/20 border-red-900/50 text-red-200">
                    <AlertDescription className="flex items-center gap-2">
                      <X className="h-4 w-4 text-red-400" />
                      {passwordError}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Mensagem de sucesso */}
                {passwordSuccess && (
                  <Alert className="bg-green-950/20 border-green-900/50 text-green-200">
                    <AlertDescription className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-neon-green" />
                      Senha atualizada com sucesso!
                    </AlertDescription>
                  </Alert>
                )}

                {/* Botão de envio */}
                <Button
                  type="submit"
                  className="w-full bg-black border border-neon-green text-neon-green hover:bg-neon-green/10 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300"
                  disabled={isSubmittingPassword}
                >
                  {isSubmittingPassword ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-neon-green rounded-full border-t-transparent"></div>
                      <span>Atualizando...</span>
                    </div>
                  ) : (
                    "Atualizar Senha"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Seção de 2FA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="gradient-border overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.1),transparent_50%)]"></div>

            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Smartphone className="h-5 w-5 text-neon-cyan" /> Autenticação em Duas Etapas (2FA)
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10">
              <div className="space-y-4">
                <p className="text-gray-400">
                  Adicione uma camada extra de segurança usando um aplicativo autenticador como Google Authenticator ou
                  Authy.
                </p>

                <div className="flex items-center gap-2 p-3 bg-black/40 rounded-lg border border-gray-800">
                  <div className={`h-3 w-3 rounded-full ${is2FAEnabled ? "bg-neon-green" : "bg-gray-600"}`}></div>
                  <span className="text-sm">
                    Status:{" "}
                    <span className={is2FAEnabled ? "text-neon-green" : "text-gray-400"}>
                      {is2FAEnabled ? "Ativado" : "Desativado"}
                    </span>
                  </span>
                </div>

                <Button
                  onClick={handle2FAActivation}
                  className={`w-full ${
                    is2FAEnabled
                      ? "bg-black border border-red-500 text-red-500 hover:bg-red-500/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                      : "bg-black border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  } transition-all duration-300`}
                >
                  {is2FAEnabled ? "Desativar 2FA" : "Ativar 2FA"}
                </Button>

                {is2FAEnabled && (
                  <p className="text-xs text-gray-500 mt-2">
                    A autenticação em duas etapas está ativada. Você precisará inserir um código de verificação ao fazer
                    login.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Modal de 2FA */}
      <TwoFactorAuthModal isOpen={is2FAModalOpen} onClose={() => setIs2FAModalOpen(false)} onComplete={onComplete2FA} />
    </div>
  )
}
