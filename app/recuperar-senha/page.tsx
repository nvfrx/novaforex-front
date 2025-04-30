"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"

export default function RecuperarSenhaPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulação de envio de email - substituir por integração real
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Recuperação solicitada para:", email)
      setEmailSent(true)
    } catch (error) {
      console.error("Erro ao solicitar recuperação:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0D0D0D] p-4">
      <div className="w-full max-w-md space-y-8 relative">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/novaforex-logo-transparent.png"
            alt="NovaForex Logo"
            width={200}
            height={80}
            className="h-20 w-auto object-contain"
          />
        </div>

        {/* Card de Recuperação */}
        <div className="relative p-8 rounded-2xl border border-[#00FFFF]/20 bg-black/40 backdrop-blur-sm">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00FFFF]/10 to-[#3B82F6]/10 opacity-20"></div>

          <h2 className="text-2xl font-bold text-white mb-2 text-center">Recuperar Senha</h2>

          {!emailSent ? (
            <>
              <p className="text-white/60 text-center mb-6">
                Digite seu e-mail para receber um link de recuperação de senha
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Campo de Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/80 flex items-center gap-2">
                    <Mail size={16} className="text-[#00FFFF]" />
                    E-mail
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-black/60 border border-[#00FFFF]/40 focus:border-[#00FFFF] focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] text-white rounded-[16px] outline-none transition-all duration-300"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                {/* Botão de Enviar */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#00FFFF] to-[#3B82F6] text-white font-medium rounded-[16px] shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all duration-300 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      "Enviar Link de Recuperação"
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00FFFF] to-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00FFFF]/10 mb-4">
                <Mail size={32} className="text-[#00FFFF]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">E-mail Enviado!</h3>
              <p className="text-white/60 mb-4">
                Enviamos um link de recuperação para <span className="text-[#00FFFF]">{email}</span>
              </p>
              <p className="text-white/60 text-sm mb-4">
                Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
              </p>
              <button
                onClick={() => {
                  setEmailSent(false)
                  setEmail("")
                }}
                className="text-[#00FFFF] hover:text-[#00FFFF]/80 transition-colors duration-300"
              >
                Tentar com outro e-mail
              </button>
            </div>
          )}

          {/* Link para voltar */}
          <div className="mt-6 flex justify-center">
            <Link
              href="/login"
              className="text-[#00FFFF]/80 hover:text-[#00FFFF] transition-colors duration-300 flex items-center gap-1"
            >
              <ArrowLeft size={16} />
              Voltar para o login
            </Link>
          </div>
        </div>

        {/* Efeito de brilho */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFFF] to-[#3B82F6] rounded-2xl blur-3xl opacity-10 -z-10"></div>
      </div>
    </div>
  )
}
