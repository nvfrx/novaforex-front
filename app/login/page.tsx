// app/login/page.tsx
"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import api from "@/lib/axios"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      })

      console.log("Login bem-sucedido:", response.data)
      router.push("/")
    } catch (error: any) {
      console.error("Erro no login:", error.response?.data || error.message)
      // mostrar toast de erro
      toast.error("E-mail ou senha está incorreto")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Toast container */}
      <Toaster position="top-right" reverseOrder={false} />

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

          {/* Card de Login */}
          <div className="relative p-8 rounded-2xl border border-[#00FFFF]/20 bg-black/40 backdrop-blur-sm">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00FFFF]/10 to-[#3B82F6]/10 opacity-20 pointer-events-none"></div>

            <h2 className="text-2xl font-bold text-white mb-6 text-center">Acessar Conta</h2>

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
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/60 border border-[#00FFFF]/40 focus:border-[#00FFFF] focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] text-white rounded-[16px] outline-none transition-all duration-300"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              {/* Campo de Senha */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-white/80 flex items-center gap-2">
                  <Lock size={16} className="text-[#00FFFF]" />
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/60 border border-[#00FFFF]/40 focus:border-[#00FFFF] focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] text-white rounded-[16px] outline-none transition-all duration-300"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Link para recuperar senha */}
              <div className="flex justify-end">
                <Link
                  href="/recuperar-senha"
                  className="text-sm text-[#00FFFF]/80 hover:text-[#00FFFF] transition-colors duration-300"
                >
                  Esqueceu sua senha?
                </Link>
              </div>

              {/* Botão de Login */}
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
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2-647z"
                        ></path>
                      </svg>
                      Entrando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00FFFF] to-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/60">
                Não tem uma conta?{' '}
                <Link href="/cadastro" className="text-[#00FFFF] hover:text-[#00FFFF]/80 transition-colors duration-300">
                  Cadastre-se
                </Link>
              </p>
            </div>
          </div>

          {/* Efeito de brilho */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFFF] to-[#3B82F6] rounded-2xl blur-3xl opacity-10 -z-10"></div>
        </div>
      </div>
    </>
  )
}
