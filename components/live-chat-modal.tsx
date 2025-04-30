"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { X, Send, MessageSquare, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: number
  text: string
  sender: "user" | "agent"
  timestamp: Date
}

interface LiveChatModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LiveChatModal({ isOpen, onClose }: LiveChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isConnecting, setIsConnecting] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Simular conexão inicial
  useEffect(() => {
    if (isOpen) {
      setIsConnecting(true)
      setMessages([])

      // Simular tempo de conexão
      setTimeout(() => {
        setIsConnecting(false)

        // Adicionar mensagem de boas-vindas do agente
        setMessages([
          {
            id: 1,
            text: "Olá! Bem-vindo ao suporte da Quantum Flux. Como posso ajudar você hoje?",
            sender: "agent",
            timestamp: new Date(),
          },
        ])
      }, 2000)
    }
  }, [isOpen])

  // Rolar para o final da conversa quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Enviar mensagem
  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    // Adicionar mensagem do usuário
    const userMessage: Message = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Simular agente digitando
    setIsTyping(true)

    // Simular resposta do agente após um tempo
    setTimeout(() => {
      setIsTyping(false)

      // Respostas pré-definidas baseadas em palavras-chave
      let agentResponse = "Entendi. Vou verificar isso para você. Há mais alguma coisa em que posso ajudar?"

      const lowerCaseMessage = newMessage.toLowerCase()

      if (
        lowerCaseMessage.includes("olá") ||
        lowerCaseMessage.includes("oi") ||
        lowerCaseMessage.includes("bom dia") ||
        lowerCaseMessage.includes("boa tarde") ||
        lowerCaseMessage.includes("boa noite")
      ) {
        agentResponse = "Olá! Como posso ajudar você hoje?"
      } else if (lowerCaseMessage.includes("saque") || lowerCaseMessage.includes("sacar")) {
        agentResponse =
          "Para realizar um saque, acesse a seção 'Efetuar saque' no menu lateral. Lá você encontrará todas as instruções necessárias. O valor mínimo para saque é de $20 e o máximo diário é de $5.000."
      } else if (lowerCaseMessage.includes("investir") || lowerCaseMessage.includes("investimento")) {
        agentResponse =
          "Para fazer um novo investimento, acesse a seção 'Fazer investimento' no menu lateral. Oferecemos rendimentos diários competitivos e o valor mínimo para investimento é de $20."
      } else if (lowerCaseMessage.includes("senha") || lowerCaseMessage.includes("esqueci")) {
        agentResponse =
          "Para redefinir sua senha, acesse a seção 'Segurança' no menu lateral. Se você não conseguir acessar sua conta, por favor, envie um e-mail para suporte@quantumflux.com com seu nome completo e endereço de e-mail cadastrado."
      }

      const agentMessage: Message = {
        id: Date.now(),
        text: agentResponse,
        sender: "agent",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, agentMessage])
    }, 1500)
  }

  // Lidar com tecla Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="bg-[#0e0e0e] border border-gray-800 rounded-xl w-full max-w-md overflow-hidden shadow-[0_0_25px_rgba(16,185,129,0.2)] flex flex-col h-[500px]"
      >
        {/* Cabeçalho */}
        <div className="border-b border-gray-800 p-4 flex justify-between items-center bg-black/40">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-neon-green/20 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-neon-green" />
            </div>
            <div>
              <h2 className="text-lg font-medium">Suporte Quantum Flux</h2>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-neon-green"></div>
                <span className="text-xs text-gray-400">Online</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Área de mensagens */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isConnecting ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin h-8 w-8 border-2 border-neon-green rounded-full border-t-transparent"></div>
                <p className="text-gray-400">Conectando ao suporte...</p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === "user" ? "bg-neon-green/20 text-white" : "bg-gray-800/50 text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.sender === "agent" ? (
                        <div className="h-6 w-6 rounded-full bg-neon-green/20 flex items-center justify-center">
                          <MessageSquare className="h-3 w-3 text-neon-green" />
                        </div>
                      ) : (
                        <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <User className="h-3 w-3 text-blue-400" />
                        </div>
                      )}
                      <span className="text-xs text-gray-400">{message.sender === "user" ? "Você" : "Atendente"}</span>
                      <span className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-gray-800/50 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="h-6 w-6 rounded-full bg-neon-green/20 flex items-center justify-center">
                        <MessageSquare className="h-3 w-3 text-neon-green" />
                      </div>
                      <span className="text-xs text-gray-400">Atendente</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse"></div>
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-100"></div>
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Área de input */}
        <div className="border-t border-gray-800 p-4 bg-black/40">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-black/40 border-gray-800 focus:border-neon-green focus:ring-neon-green/20"
              disabled={isConnecting}
            />
            <Button
              onClick={handleSendMessage}
              className="bg-neon-green hover:bg-neon-green/80 text-black"
              disabled={!newMessage.trim() || isConnecting}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
