// app/cadastro/page.tsx
"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Phone, User, Users } from "lucide-react"
import api from "@/lib/axios"

export default function CadastroPage() {
  const router = useRouter()
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
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem")
      return
    }
  
    setIsLoading(true)
  
    try {
      const response = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        referralCode: formData.referralCode || undefined,
      })
  
      console.log("Cadastro realizado:", response.data)
      alert("Cadastro realizado com sucesso!")
      router.push("/login")
    } catch (error: any) {
      console.error("Erro no cadastro:", error)
      alert(error.response?.data?.message || "Erro inesperado no cadastro.")
    } finally {
      setIsLoading(false)
    }
  }
  

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0D0D0D] p-4">
      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="flex justify-center">
          <Image
            src="/novaforex-logo-transparent.png"
            alt="NovaForex Logo"
            width={200}
            height={80}
            className="h-20 w-auto object-contain"
          />
        </div>

        <div className="relative p-8 rounded-2xl border border-[#00FFFF]/20 bg-black/40 backdrop-blur-sm">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00FFFF]/10 to-[#3B82F6]/10 opacity-20 pointer-events-none"></div>

          <h2 className="text-2xl font-bold text-white mb-6 text-center">Criar Conta</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Nome Completo"
              icon={<User size={16} className="text-[#00FFFF]" />}
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome completo"
            />

            <InputField
              label="E-mail"
              icon={<Mail size={16} className="text-[#00FFFF]" />}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
            />

            <InputField
              label="Telefone (WhatsApp)"
              icon={<Phone size={16} className="text-[#00FFFF]" />}
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
            />

            <InputField
              label="Senha"
              icon={<Lock size={16} className="text-[#00FFFF]" />}
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              toggleVisibility={togglePasswordVisibility}
              isVisible={showPassword}
            />

            <InputField
              label="Confirmar Senha"
              icon={<Lock size={16} className="text-[#00FFFF]" />}
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              toggleVisibility={toggleConfirmPasswordVisibility}
              isVisible={showConfirmPassword}
            />

            <InputField
              label="Código de Indicação (opcional)"
              icon={<Users size={16} className="text-[#00FFFF]" />}
              name="referralCode"
              type="text"
              value={formData.referralCode}
              onChange={handleChange}
              placeholder="Código de quem indicou você"
            />

            <button
              type="submit"
              disabled={isLoading}
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

        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFFF] to-[#3B82F6] rounded-2xl blur-3xl opacity-10 -z-10"></div>

        <div className="text-center text-xs text-white/50 mt-6">
          &copy; {new Date().getFullYear()} NovaForex. Todos os direitos reservados.
        </div>
      </div>
    </div>
  )
}

interface InputFieldProps {
  label: string
  icon: React.ReactNode
  name: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  toggleVisibility?: () => void
  isVisible?: boolean
}

function InputField({
  label,
  icon,
  name,
  type,
  value,
  onChange,
  placeholder,
  toggleVisibility,
  isVisible,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-white/80 flex items-center gap-2">
        {icon}
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          required={name !== "referralCode"}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 bg-black/60 border border-[#00FFFF]/40 focus:border-[#00FFFF] focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] text-white rounded-[16px] outline-none transition-all duration-300"
          placeholder={placeholder}
        />
        {toggleVisibility && (
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  )
}