"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Phone, User, Users } from "lucide-react"

export default function CadastroPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    acceptTerms: false,
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem")
      return
    }

    setIsLoading(true)

    // Simulação de envio - substituir por integração real
    try {
      // Aqui seria implementada a lógica de cadastro
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Cadastro com dados:", formData)
      // Redirecionar para login ou dashboard após cadastro bem-sucedido
      // router.push("/login")
    } catch (error) {
      console.error("Erro no cadastro:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0D0D0D] p-4">
      <div className="w-full max-w-md space-y-6 relative z-10">
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

        {/* Card de Cadastro */}
        <div className="relative p-8 rounded-2xl border border-[#00FFFF]/20 bg-black/40 backdrop-blur-sm">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00FFFF]/10 to-[#3B82F6]/10 opacity-20"></div>

          <h2 className="text-2xl font-bold text-white mb-6 text-center">Criar Conta</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo de Nome */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-white/80 flex items-center gap-2">
                <User size={16} className="text-[#00FFFF]" />
                Nome Completo
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/60 border border-[#00FFFF]/40 focus:border-[#00FFFF] focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] text-white rounded-[16px] outline-none transition-all duration-300"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>

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

            {/* Campo de Telefone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-white/80 flex items-center gap-2">
                <Phone size={16} className="text-[#00FFFF]" />
                Telefone (WhatsApp)
              </label>
              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/60 border border-[#00FFFF]/40 focus:border-[#00FFFF] focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] text-white rounded-[16px] outline-none transition-all duration-300"
                  placeholder="(00) 00000-0000"
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

            {/* Campo de Confirmar Senha */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-white/80 flex items-center gap-2">
                <Lock size={16} className="text-[#00FFFF]" />
                Confirmar Senha
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/60 border border-[#00FFFF]/40 focus:border-[#00FFFF] focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] text-white rounded-[16px] outline-none transition-all duration-300"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Campo de Código de Indicação (opcional) */}
            <div className="space-y-2">
              <label htmlFor="referralCode" className="text-sm font-medium text-white/80 flex items-center gap-2">
                <Users size={16} className="text-[#00FFFF]" />
                Código de Indicação <span className="text-gray-500 text-xs">(opcional)</span>
              </label>
              <div className="relative">
                <input
                  id="referralCode"
                  name="referralCode"
                  type="text"
                  value={formData.referralCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/60 border border-[#00FFFF]/40 focus:border-[#00FFFF] focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] text-white rounded-[16px] outline-none transition-all duration-300"
                  placeholder="Código de quem indicou você"
                />
              </div>
            </div>

            {/* Checkbox de Termos */}
            <div className="flex items-start space-x-3 mt-6">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                required
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-[#00FFFF]/40 bg-black/60 text-[#00FFFF] focus:ring-[#00FFFF]/30"
              />
              <label htmlFor="acceptTerms" className="text-sm text-white/80">
                Aceito os{" "}
                <Link href="#" className="text-[#00FFFF] hover:underline">
                  Termos de Uso
                </Link>{" "}
                e a{" "}
                <Link href="#" className="text-[#00FFFF] hover:underline">
                  Política de Privacidade
                </Link>
              </label>
            </div>

            {/* Botão de Cadastro */}
            <button
              type="submit"
              disabled={isLoading || !formData.acceptTerms}
              className="w-full py-3 px-4 mt-6 bg-gradient-to-r from-[#00FFFF] to-[#3B82F6] text-white font-medium rounded-[16px] shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all duration-300 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
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
                    Processando...
                  </>
                ) : (
                  "Criar Conta"
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00FFFF] to-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </button>
          </form>

          {/* Link para voltar */}
          <div className="mt-6 flex justify-center">
            <Link
              href="/login"
              className="text-[#00FFFF]/80 hover:text-[#00FFFF] transition-colors duration-300 flex items-center gap-1"
            >
              <ArrowLeft size={16} />
              Já tenho conta? Entrar
            </Link>
          </div>
        </div>

        {/* Efeito de brilho */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFFF] to-[#3B82F6] rounded-2xl blur-3xl opacity-10 -z-10"></div>

        {/* Rodapé */}
        <div className="text-center text-xs text-white/50 mt-6">
          &copy; {new Date().getFullYear()} NovaForex. Todos os direitos reservados.
        </div>
      </div>
    </div>
  )
}
