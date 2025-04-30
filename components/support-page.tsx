"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageCircle, Send, X, MessageSquare, Users, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import LiveChatModal from "@/components/live-chat-modal"

export default function SupportPage() {
  // Estados para o formulário
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Estado para o modal de chat ao vivo
  const [isChatModalOpen, setIsChatModalOpen] = useState(false)

  // Validação e envio do formulário
  const validateForm = () => {
    // Resetar mensagens
    setFormError(null)

    // Validar nome
    if (!name.trim()) {
      setFormError("Por favor, insira seu nome.")
      return false
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim() || !emailRegex.test(email)) {
      setFormError("Por favor, insira um email válido.")
      return false
    }

    // Validar mensagem
    if (!message.trim()) {
      setFormError("Por favor, insira sua mensagem.")
      return false
    }

    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simular envio para API
      setTimeout(() => {
        setIsSubmitting(false)
        setFormSuccess(true)

        // Limpar campos
        setName("")
        setEmail("")
        setMessage("")

        // Limpar mensagem de sucesso após alguns segundos
        setTimeout(() => {
          setFormSuccess(false)
        }, 5000)
      }, 1500)
    }
  }

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-neon-cyan to-white bg-clip-text text-transparent pb-2 flex items-center justify-center gap-2">
          <MessageCircle className="h-8 w-8 text-neon-cyan" /> Suporte
        </h1>
        <p className="text-gray-400 mt-2">Escolha o melhor canal para se comunicar com nossa equipe e comunidade.</p>
      </div>

      {/* Seções de Contato */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chat ao Vivo */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="gradient-border overflow-hidden h-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_50%)]"></div>

            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-xl">
                <MessageSquare className="h-5 w-5 text-neon-green" /> Chat ao Vivo
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10 flex flex-col h-[calc(100%-80px)]">
              <p className="text-gray-400 mb-6">Converse diretamente com nosso atendente em tempo real.</p>

              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-xs aspect-square bg-black/40 rounded-lg border border-gray-800 flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 rounded-full bg-neon-green/10 flex items-center justify-center mb-4">
                    <MessageSquare className="h-8 w-8 text-neon-green" />
                  </div>
                  <p className="text-center text-gray-400 mb-6">Nossos atendentes estão prontos para ajudar você.</p>
                  <Button
                    onClick={() => setIsChatModalOpen(true)}
                    className="w-full bg-black border border-neon-green text-neon-green hover:bg-neon-green/10 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300"
                  >
                    Iniciar Chat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* WhatsApp */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="gradient-border overflow-hidden h-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.1),transparent_50%)]"></div>

            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Phone className="h-5 w-5 text-neon-green" /> Fale Conosco pelo WhatsApp
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10 flex flex-col h-[calc(100%-80px)]">
              <p className="text-gray-400 mb-6">Entre em contato diretamente com nossa equipe via WhatsApp.</p>

              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-xs aspect-square bg-black/40 rounded-lg border border-gray-800 flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 rounded-full bg-green-600/20 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <p className="text-center text-gray-400 mb-6">Atendimento rápido e personalizado via WhatsApp.</p>
                  <Button
                    onClick={() => window.open("https://wa.me/5511999999999", "_blank")}
                    className="w-full bg-green-600 hover:bg-green-700 text-white hover:shadow-[0_0_15px_rgba(22,163,74,0.5)] transition-all duration-300"
                  >
                    Iniciar Chat no WhatsApp
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Telegram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="gradient-border overflow-hidden h-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_50%)]"></div>

            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>{" "}
                Entre no nosso Grupo do Telegram
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10 flex flex-col h-[calc(100%-80px)]">
              <p className="text-gray-400 mb-6">
                Junte-se ao nosso grupo de suporte e fique por dentro de todas as novidades.
              </p>

              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-xs aspect-square bg-black/40 rounded-lg border border-gray-800 flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-400"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </div>
                  <p className="text-center text-gray-400 mb-6">
                    Participe do nosso grupo oficial no Telegram para suporte e novidades.
                  </p>
                  <Button
                    onClick={() => window.open("https://t.me/quantumflux", "_blank")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all duration-300"
                  >
                    Entrar no Telegram
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Comunidade WhatsApp */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="gradient-border overflow-hidden h-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.1),transparent_50%)]"></div>

            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Users className="h-5 w-5 text-neon-green" /> Participe da nossa Comunidade no WhatsApp
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10 flex flex-col h-[calc(100%-80px)]">
              <p className="text-gray-400 mb-6">Converse com outros membros, compartilhe experiências e interaja.</p>

              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-xs aspect-square bg-black/40 rounded-lg border border-gray-800 flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 rounded-full bg-green-600/20 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <p className="text-center text-gray-400 mb-6">
                    Participe da nossa comunidade no WhatsApp e conecte-se com outros investidores.
                  </p>
                  <Button
                    onClick={() => window.open("https://chat.whatsapp.com/quantumflux", "_blank")}
                    className="w-full bg-green-600 hover:bg-green-700 text-white hover:shadow-[0_0_15px_rgba(22,163,74,0.5)] transition-all duration-300"
                  >
                    Entrar na Comunidade do WhatsApp
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Formulário de Dúvidas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="gradient-border overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05),transparent_70%)]"></div>

          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Send className="h-5 w-5 text-neon-cyan" /> Não encontrou o que precisa?
            </CardTitle>
          </CardHeader>

          <CardContent className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm text-gray-400">
                    Nome
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-black/40 border-gray-800 focus:border-neon-green focus:ring-neon-green/20"
                    placeholder="Seu nome"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-gray-400">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-black/40 border-gray-800 focus:border-neon-green focus:ring-neon-green/20"
                    placeholder="seu.email@exemplo.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm text-gray-400">
                  Mensagem
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[120px] bg-black/40 border-gray-800 focus:border-neon-green focus:ring-neon-green/20"
                  placeholder="Descreva sua dúvida ou problema..."
                />
              </div>

              {/* Mensagem de erro */}
              {formError && (
                <Alert className="bg-red-950/20 border-red-900/50 text-red-200">
                  <AlertDescription className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-400" />
                    {formError}
                  </AlertDescription>
                </Alert>
              )}

              {/* Mensagem de sucesso */}
              {formSuccess && (
                <Alert className="bg-green-950/20 border-green-900/50 text-green-200">
                  <AlertDescription className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-neon-green"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.
                  </AlertDescription>
                </Alert>
              )}

              {/* Botão de envio */}
              <Button
                type="submit"
                className="w-full bg-black border border-neon-green text-neon-green hover:bg-neon-green/10 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-neon-green rounded-full border-t-transparent"></div>
                    <span>Enviando...</span>
                  </div>
                ) : (
                  "Enviar Mensagem"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal de Chat ao Vivo */}
      <LiveChatModal isOpen={isChatModalOpen} onClose={() => setIsChatModalOpen(false)} />
    </div>
  )
}
