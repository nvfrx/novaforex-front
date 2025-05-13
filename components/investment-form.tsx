// components/investment-form.tsx
'use client'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AlertCircle, Copy, CheckCircle, ArrowRight, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import api from '@/lib/axios'

export default function InvestmentForm() {
  const [amount, setAmount] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [showWallet, setShowWallet] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [qrcodeUrl, setQrcodeUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function validateAmount() {
    const value = parseFloat(amount)
    if (isNaN(value) || value < 1) {
      setError('Investimento mínimo de US$1')
      return false
    }
    if (value > 20000) {
      setError('Investimento máximo de US$20.000')
      return false
    }
    setError(null)
    return true
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateAmount()) return
    setIsSubmitting(true)
    try {
      const resp = await api.post('/investments/deposit', { amount: parseFloat(amount) })
      setWalletAddress(resp.data.address)
      setQrcodeUrl(resp.data.qrcode_url)
      setShowWallet(true)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao iniciar pagamento')
    } finally {
      setIsSubmitting(false)
    }
  }

  function copyToClipboard() {
    if (!walletAddress) return
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div>
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
                    onChange={e => { setAmount(e.target.value); if (error) setError(null) }}
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
                    <div className="h-1.5 w-1.5 rounded-full bg-neon-cyan" /> Investimento mínimo: <span className="font-medium text-white">US$1</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-neon-cyan" /> Investimento máximo: <span className="font-medium text-white">US$20.000</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-neon-cyan" /> Moeda: <span className="font-medium text-white">USDT (rede BEP20)</span>
                  </li>
                </ul>
              </div>

              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-neon-cyan to-neon-green hover:from-neon-green hover:to-neon-cyan text-black font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 relative overflow-hidden group"
                disabled={!amount || !!error || isSubmitting}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Confirmar Investimento <ArrowRight className="h-5 w-5" />
                </span>
                <span className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Button>
            </form>
          ) : (
            <div className="p-6 bg-black/40 rounded-xl space-y-6">
              <h3 className="font-medium text-neon-cyan flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-neon-green" /> Pagamento Iniciado
              </h3>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-400">Carteira USDT (BEP20)</Label>
                  <div className="flex">
                    <div className="flex-1 font-mono break-all bg-gray-900 p-2 rounded-l">
                      {walletAddress}
                    </div>
                    <Button onClick={copyToClipboard} className="rounded-l-none p-2">
                      {copied ? <CheckCircle /> : <Copy />}
                    </Button>
                  </div>
                </div>
                {qrcodeUrl && (
                  <div className="text-center">
                    <img src={qrcodeUrl} alt="QR Code" className="mx-auto h-64 w-64" />
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => setShowWallet(false)}>
                  Voltar
                </Button>
                <Button asChild>
                  <Link href="/">Concluir</Link>
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="balance">
          <div className="text-center py-8">
            <p className="text-lg text-gray-400">Em breve: investir com saldo</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
