"use client"

import { useState, useEffect } from "react"
import { Network, User, Calendar, DollarSign, Users } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Tipo para os indicados
type Referral = {
  id: string
  name: string
  date: Date
  investmentAmount: number
  avatar?: string
}

// Tipo para os níveis da rede
type NetworkLevel = {
  level: number
  referrals: Referral[]
  totalInvestment: number
  commissionRate: number
}

export default function NetworkAccordion() {
  const [networkData, setNetworkData] = useState<NetworkLevel[]>([])
  const [loading, setLoading] = useState(true)
  const [totalNetworkInvestment, setTotalNetworkInvestment] = useState(0)

  // Simular carregamento de dados da rede
  useEffect(() => {
    // Dados simulados para a rede
    const mockNetworkData: NetworkLevel[] = [
      {
        level: 1,
        commissionRate: 10,
        totalInvestment: 0,
        referrals: [
          {
            id: "ref-101",
            name: "Carlos Silva",
            date: new Date(2023, 9, 15),
            investmentAmount: 2500,
          },
          {
            id: "ref-102",
            name: "Ana Oliveira",
            date: new Date(2023, 10, 3),
            investmentAmount: 1800,
          },
          {
            id: "ref-103",
            name: "Roberto Almeida",
            date: new Date(2023, 11, 22),
            investmentAmount: 3200,
          },
        ],
      },
      {
        level: 2,
        commissionRate: 4,
        totalInvestment: 0,
        referrals: [
          {
            id: "ref-201",
            name: "Juliana Costa",
            date: new Date(2023, 10, 18),
            investmentAmount: 1500,
          },
          {
            id: "ref-202",
            name: "Marcos Santos",
            date: new Date(2023, 11, 5),
            investmentAmount: 2000,
          },
          {
            id: "ref-203",
            name: "Fernanda Lima",
            date: new Date(2023, 11, 30),
            investmentAmount: 1200,
          },
          {
            id: "ref-204",
            name: "Ricardo Gomes",
            date: new Date(2024, 0, 10),
            investmentAmount: 3500,
          },
        ],
      },
      {
        level: 3,
        commissionRate: 3,
        totalInvestment: 0,
        referrals: [
          {
            id: "ref-301",
            name: "Patrícia Mendes",
            date: new Date(2023, 11, 12),
            investmentAmount: 1800,
          },
          {
            id: "ref-302",
            name: "Lucas Ferreira",
            date: new Date(2023, 11, 25),
            investmentAmount: 2200,
          },
          {
            id: "ref-303",
            name: "Camila Rodrigues",
            date: new Date(2024, 0, 5),
            investmentAmount: 1000,
          },
        ],
      },
      {
        level: 4,
        commissionRate: 2,
        totalInvestment: 0,
        referrals: [
          {
            id: "ref-401",
            name: "Gabriel Martins",
            date: new Date(2023, 11, 28),
            investmentAmount: 1500,
          },
          {
            id: "ref-402",
            name: "Isabela Souza",
            date: new Date(2024, 0, 15),
            investmentAmount: 2800,
          },
        ],
      },
      {
        level: 5,
        commissionRate: 1,
        totalInvestment: 0,
        referrals: [
          {
            id: "ref-501",
            name: "Thiago Pereira",
            date: new Date(2024, 0, 20),
            investmentAmount: 1200,
          },
        ],
      },
    ]

    // Calcular o total de investimento por nível
    const processedData = mockNetworkData.map((level) => {
      const totalInvestment = level.referrals.reduce((sum, referral) => sum + referral.investmentAmount, 0)
      return {
        ...level,
        totalInvestment,
      }
    })

    // Calcular o total geral de investimentos
    const totalNetwork = processedData.reduce((sum, level) => sum + level.totalInvestment, 0)

    // Simular tempo de carregamento
    setTimeout(() => {
      setNetworkData(processedData)
      setTotalNetworkInvestment(totalNetwork)
      setLoading(false)
    }, 1000)
  }, [])

  // Renderizar estado de carregamento
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin h-12 w-12 border-4 border-neon-cyan rounded-full border-t-transparent mb-4"></div>
        <p className="text-gray-400">Carregando sua rede de indicados...</p>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {/* Título principal */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-neon-cyan to-white bg-clip-text text-transparent pb-2 flex items-center justify-center gap-2">
          <Network className="h-8 w-8 text-neon-cyan" /> Minha Rede
        </h1>
      </div>

      {/* Acordeão de níveis */}
      <Accordion type="single" collapsible className="space-y-4">
        {networkData.map((level) => (
          <AccordionItem
            key={`level-${level.level}`}
            value={`level-${level.level}`}
            className="border border-gray-800 rounded-xl overflow-hidden bg-black/40 shadow-md"
          >
            <AccordionTrigger className="px-6 py-4 hover:bg-black/60 transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-neon-cyan/10 p-2 rounded-full">
                  <Users className="h-5 w-5 text-neon-cyan" />
                </div>
                <div className="text-left">
                  <h2 className="text-xl font-bold text-white">Nível {level.level}</h2>
                  <p className="text-sm text-gray-400">
                    {level.referrals.length} indicados · US$ {level.totalInvestment.toLocaleString()}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Cards dos indicados */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                    {level.referrals.length === 0 ? (
                      <div className="col-span-full bg-[#0e0e0e] rounded-[16px] p-6 text-center">
                        <p className="text-gray-400">Nenhum indicado neste nível</p>
                      </div>
                    ) : (
                      level.referrals.map((referral, index) => (
                        <motion.div
                          key={referral.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{
                            y: -5,
                            boxShadow:
                              "0 10px 25px -5px rgba(0, 255, 178, 0.15), 0 5px 10px -5px rgba(0, 255, 178, 0.1)",
                          }}
                          className="bg-[#0e0e0e] rounded-[16px] p-5 border border-gray-800 hover:border-gray-700 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="bg-gray-900 rounded-full p-2">
                                <User className="h-4 w-4 text-neon-cyan" />
                              </div>
                              <h4 className="text-white font-medium text-lg">{referral.name}</h4>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>Data de Cadastro: {referral.date.toLocaleDateString("pt-BR")}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                              <DollarSign className="h-3.5 w-3.5 text-[#00FFB2]" />
                              <span className="text-[#00FFB2] font-medium">
                                Total Investido: US$ {referral.investmentAmount.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>

                  {/* Total do nível */}
                  <div className="bg-black/60 rounded-xl p-4 border border-gray-800">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-400">Total de Investimentos do Nível {level.level}:</p>
                      <p className="text-xl font-bold text-neon-green">US$ {level.totalInvestment.toLocaleString()}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Total geral */}
      <div className="bg-gradient-to-r from-black/60 to-black/40 rounded-xl p-6 border border-gray-800 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold mb-1">Total Geral da Rede</h3>
            <p className="text-gray-400">Soma de todos os investimentos em todos os níveis</p>
          </div>
          <div className="text-right mt-4 md:mt-0">
            <p className="text-3xl font-bold text-neon-green">US$ {totalNetworkInvestment.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
