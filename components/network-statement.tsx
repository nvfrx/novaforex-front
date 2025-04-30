"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, User, Network, Download, Search, Layers, DollarSign } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Tipo para os itens do extrato
type StatementItem = {
  id: string
  date: Date
  referralName: string
  networkLevel: number
  investmentAmount: number
  commissionAmount: number
}

export default function NetworkStatement() {
  const [loading, setLoading] = useState(true)
  const [statementData, setStatementData] = useState<StatementItem[]>([])
  const [dateFrom, setDateFrom] = useState<Date | undefined>(new Date(new Date().setMonth(new Date().getMonth() - 1)))
  const [dateTo, setDateTo] = useState<Date | undefined>(new Date())
  const [totalCommission, setTotalCommission] = useState(0)
  const [isFiltering, setIsFiltering] = useState(false)

  // Simular carregamento de dados do extrato
  useEffect(() => {
    // Dados simulados para o extrato
    const mockStatementData: StatementItem[] = [
      {
        id: "stmt-001",
        date: new Date(2024, 3, 25),
        referralName: "Carlos Silva",
        networkLevel: 1,
        investmentAmount: 2500,
        commissionAmount: 250,
      },
      {
        id: "stmt-002",
        date: new Date(2024, 3, 23),
        referralName: "Ana Oliveira",
        networkLevel: 1,
        investmentAmount: 1800,
        commissionAmount: 180,
      },
      {
        id: "stmt-003",
        date: new Date(2024, 3, 20),
        referralName: "Juliana Costa",
        networkLevel: 2,
        investmentAmount: 1500,
        commissionAmount: 60,
      },
      {
        id: "stmt-004",
        date: new Date(2024, 3, 18),
        referralName: "Marcos Santos",
        networkLevel: 2,
        investmentAmount: 2000,
        commissionAmount: 80,
      },
      {
        id: "stmt-005",
        date: new Date(2024, 3, 15),
        referralName: "Patrícia Mendes",
        networkLevel: 3,
        investmentAmount: 1800,
        commissionAmount: 54,
      },
      {
        id: "stmt-006",
        date: new Date(2024, 3, 12),
        referralName: "Lucas Ferreira",
        networkLevel: 3,
        investmentAmount: 2200,
        commissionAmount: 66,
      },
      {
        id: "stmt-007",
        date: new Date(2024, 3, 10),
        referralName: "Gabriel Martins",
        networkLevel: 4,
        investmentAmount: 1500,
        commissionAmount: 30,
      },
      {
        id: "stmt-008",
        date: new Date(2024, 3, 5),
        referralName: "Thiago Pereira",
        networkLevel: 5,
        investmentAmount: 1200,
        commissionAmount: 12,
      },
      {
        id: "stmt-009",
        date: new Date(2024, 3, 2),
        referralName: "Roberto Almeida",
        networkLevel: 1,
        investmentAmount: 3200,
        commissionAmount: 320,
      },
      {
        id: "stmt-010",
        date: new Date(2024, 2, 28),
        referralName: "Fernanda Lima",
        networkLevel: 2,
        investmentAmount: 1200,
        commissionAmount: 48,
      },
    ]

    // Calcular o total de comissões
    const total = mockStatementData.reduce((sum, item) => sum + item.commissionAmount, 0)

    // Simular tempo de carregamento
    setTimeout(() => {
      setStatementData(mockStatementData)
      setTotalCommission(total)
      setLoading(false)
    }, 1000)
  }, [])

  // Filtrar dados por data
  const handleFilter = () => {
    setIsFiltering(true)

    // Simular carregamento de dados filtrados
    setTimeout(() => {
      // Filtrar dados com base nas datas selecionadas
      const filteredData = statementData.filter((item) => {
        const itemDate = new Date(item.date)
        const from = dateFrom ? new Date(dateFrom) : new Date(0)
        const to = dateTo ? new Date(dateTo) : new Date()

        // Ajustar as datas para comparação (ignorar horas)
        from.setHours(0, 0, 0, 0)
        to.setHours(23, 59, 59, 999)
        itemDate.setHours(12, 0, 0, 0)

        return itemDate >= from && itemDate <= to
      })

      // Calcular o total de comissões filtradas
      const filteredTotal = filteredData.reduce((sum, item) => sum + item.commissionAmount, 0)

      setStatementData(filteredData)
      setTotalCommission(filteredTotal)
      setIsFiltering(false)
    }, 800)
  }

  // Exportar dados (simulado)
  const handleExport = () => {
    alert("Exportação de dados simulada. Em um ambiente real, isso geraria um arquivo CSV ou PDF.")
  }

  // Renderizar estado de carregamento
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin h-12 w-12 border-4 border-neon-cyan rounded-full border-t-transparent mb-4"></div>
        <p className="text-gray-400">Carregando seu extrato de comissões...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-neon-cyan to-white bg-clip-text text-transparent pb-2 flex items-center justify-center gap-2">
          <Network className="h-8 w-8 text-neon-cyan" /> Extrato da Rede
        </h1>
        <p className="text-gray-400 mt-2">Acompanhe os ganhos de comissões gerados pela sua rede.</p>
      </div>

      {/* Área de filtros */}
      <div className="bg-[#0e0e0e] rounded-xl p-6 border border-gray-800 shadow-md">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="space-y-2 flex-1">
            <label className="text-sm text-gray-400">Data Inicial</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-black/40 border-gray-800 hover:bg-black/60"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-neon-cyan" />
                  {dateFrom ? (
                    format(dateFrom, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#0e0e0e] border-gray-800">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={setDateFrom}
                  initialFocus
                  className="bg-[#0e0e0e]"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2 flex-1">
            <label className="text-sm text-gray-400">Data Final</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-black/40 border-gray-800 hover:bg-black/60"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-neon-cyan" />
                  {dateTo ? (
                    format(dateTo, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#0e0e0e] border-gray-800">
                <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus className="bg-[#0e0e0e]" />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleFilter}
              className="bg-black border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10"
              disabled={isFiltering}
            >
              {isFiltering ? (
                <div className="animate-spin h-4 w-4 border-2 border-neon-cyan rounded-full border-t-transparent mr-2"></div>
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              Buscar
            </Button>

            <Button onClick={handleExport} variant="outline" className="border-gray-700 hover:bg-gray-800">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </div>

      {/* Totalizador */}
      <div className="bg-gradient-to-r from-black/60 to-black/40 rounded-xl p-6 border border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-xl font-bold mb-1">Total de Comissões Recebidas</h3>
            <p className="text-gray-400">
              Período: {dateFrom ? format(dateFrom, "dd/MM/yyyy") : "Início"} até{" "}
              {dateTo ? format(dateTo, "dd/MM/yyyy") : "Hoje"}
            </p>
          </div>
          <div className="text-right mt-4 md:mt-0">
            <p className="text-3xl font-bold text-neon-green">US$ {totalCommission.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Tabela de extrato */}
      <div className="bg-[#0e0e0e] rounded-xl border border-gray-800 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-black/40">
              <TableRow className="hover:bg-transparent border-gray-800">
                <TableHead className="text-gray-400 font-medium">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-neon-cyan" /> Data
                  </div>
                </TableHead>
                <TableHead className="text-gray-400 font-medium">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-neon-cyan" /> Indicado
                  </div>
                </TableHead>
                <TableHead className="text-gray-400 font-medium">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-neon-cyan" /> Nível
                  </div>
                </TableHead>
                <TableHead className="text-gray-400 font-medium text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <DollarSign className="h-4 w-4 text-neon-cyan" /> Valor Investido
                  </div>
                </TableHead>
                <TableHead className="text-gray-400 font-medium text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <DollarSign className="h-4 w-4 text-neon-green" /> Comissão
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statementData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-400">
                    Nenhum registro encontrado para o período selecionado.
                  </TableCell>
                </TableRow>
              ) : (
                statementData.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className="border-gray-800 hover:bg-gray-900/50 transition-colors cursor-default"
                  >
                    <TableCell className="font-medium">{format(item.date, "dd/MM/yyyy")}</TableCell>
                    <TableCell>{item.referralName}</TableCell>
                    <TableCell>
                      <span className="bg-gray-800 px-2 py-1 rounded-md text-xs">Nível {item.networkLevel}</span>
                    </TableCell>
                    <TableCell className="text-right">US$ {item.investmentAmount.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-neon-green font-medium">
                      US$ {item.commissionAmount.toLocaleString()}
                    </TableCell>
                  </motion.tr>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
