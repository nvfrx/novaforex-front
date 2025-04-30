"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  CalendarIcon,
  ArrowUpDown,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowDown,
  ArrowUp,
  Wallet,
  Filter,
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer"

// Tipo para os itens do extrato
type TransactionType = "deposit" | "withdrawal"
type TransactionStatus = "approved" | "pending" | "rejected"

type Transaction = {
  id: string
  date: Date
  type: TransactionType
  amount: number
  status: TransactionStatus
  method: string
}

export default function FinancialStatement() {
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [dateFrom, setDateFrom] = useState<Date | undefined>(new Date(new Date().setMonth(new Date().getMonth() - 1)))
  const [dateTo, setDateTo] = useState<Date | undefined>(new Date())
  const [transactionType, setTransactionType] = useState<string>("all")
  const [isFiltering, setIsFiltering] = useState(false)
  const [totalDeposits, setTotalDeposits] = useState(0)
  const [totalWithdrawals, setTotalWithdrawals] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar se é dispositivo móvel
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Verificar no carregamento inicial
    checkIfMobile()

    // Adicionar listener para redimensionamento
    window.addEventListener("resize", checkIfMobile)

    // Limpar listener
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Simular carregamento de dados do extrato
  useEffect(() => {
    // Dados simulados para o extrato
    const mockTransactions: Transaction[] = [
      {
        id: "tx-001",
        date: new Date(2024, 3, 25),
        type: "deposit",
        amount: 1000,
        status: "approved",
        method: "USDT BEP20",
      },
      {
        id: "tx-002",
        date: new Date(2024, 3, 23),
        type: "withdrawal",
        amount: 500,
        status: "approved",
        method: "USDT BEP20",
      },
      {
        id: "tx-003",
        date: new Date(2024, 3, 20),
        type: "deposit",
        amount: 2500,
        status: "approved",
        method: "USDT BEP20",
      },
      {
        id: "tx-004",
        date: new Date(2024, 3, 18),
        type: "withdrawal",
        amount: 1200,
        status: "pending",
        method: "USDT BEP20",
      },
      {
        id: "tx-005",
        date: new Date(2024, 3, 15),
        type: "deposit",
        amount: 3000,
        status: "approved",
        method: "USDT BEP20",
      },
      {
        id: "tx-006",
        date: new Date(2024, 3, 12),
        type: "withdrawal",
        amount: 800,
        status: "rejected",
        method: "USDT BEP20",
      },
      {
        id: "tx-007",
        date: new Date(2024, 3, 10),
        type: "deposit",
        amount: 1500,
        status: "pending",
        method: "USDT BEP20",
      },
      {
        id: "tx-008",
        date: new Date(2024, 3, 5),
        type: "withdrawal",
        amount: 300,
        status: "approved",
        method: "USDT BEP20",
      },
      {
        id: "tx-009",
        date: new Date(2024, 3, 2),
        type: "deposit",
        amount: 2000,
        status: "approved",
        method: "USDT BEP20",
      },
      {
        id: "tx-010",
        date: new Date(2024, 2, 28),
        type: "withdrawal",
        amount: 1000,
        status: "approved",
        method: "USDT BEP20",
      },
    ]

    // Simular tempo de carregamento
    setTimeout(() => {
      setTransactions(mockTransactions)
      setFilteredTransactions(mockTransactions)
      calculateTotals(mockTransactions)
      setLoading(false)
    }, 1500)
  }, [])

  // Calcular totais
  const calculateTotals = (data: Transaction[]) => {
    const deposits = data
      .filter((tx) => tx.type === "deposit" && tx.status === "approved")
      .reduce((sum, tx) => sum + tx.amount, 0)

    const withdrawals = data
      .filter((tx) => tx.type === "withdrawal" && tx.status === "approved")
      .reduce((sum, tx) => sum + tx.amount, 0)

    setTotalDeposits(deposits)
    setTotalWithdrawals(withdrawals)
  }

  // Filtrar dados
  const handleFilter = () => {
    setIsFiltering(true)

    // Simular carregamento de dados filtrados
    setTimeout(() => {
      // Filtrar dados com base nas datas e tipo selecionados
      const filtered = transactions.filter((tx) => {
        const txDate = new Date(tx.date)
        const from = dateFrom ? new Date(dateFrom) : new Date(0)
        const to = dateTo ? new Date(dateTo) : new Date()

        // Ajustar as datas para comparação (ignorar horas)
        from.setHours(0, 0, 0, 0)
        to.setHours(23, 59, 59, 999)
        txDate.setHours(12, 0, 0, 0)

        const dateMatch = txDate >= from && txDate <= to
        const typeMatch =
          transactionType === "all" ||
          (transactionType === "deposit" && tx.type === "deposit") ||
          (transactionType === "withdrawal" && tx.type === "withdrawal")

        return dateMatch && typeMatch
      })

      setFilteredTransactions(filtered)
      calculateTotals(filtered)
      setIsFiltering(false)
    }, 800)
  }

  // Renderizar status com ícone e cor apropriados
  const renderStatus = (status: TransactionStatus) => {
    switch (status) {
      case "approved":
        return (
          <div className="flex items-center gap-1 md:gap-1.5">
            <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 text-neon-green" />
            <span className="text-neon-green font-medium text-xs md:text-sm">Aprovado</span>
          </div>
        )
      case "pending":
        return (
          <div className="flex items-center gap-1 md:gap-1.5">
            <Clock className="h-3 w-3 md:h-4 md:w-4 text-amber-400" />
            <span className="text-amber-400 font-medium text-xs md:text-sm">Pendente</span>
          </div>
        )
      case "rejected":
        return (
          <div className="flex items-center gap-1 md:gap-1.5">
            <XCircle className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
            <span className="text-red-500 font-medium text-xs md:text-sm">Recusado</span>
          </div>
        )
    }
  }

  // Renderizar tipo de transação com badge colorido
  const renderTransactionType = (type: TransactionType) => {
    switch (type) {
      case "deposit":
        return (
          <div className="inline-flex items-center gap-1 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full bg-green-500/20 text-green-400 text-[10px] md:text-xs font-medium">
            <ArrowDown className="h-2.5 w-2.5 md:h-3 md:w-3" />
            <span>Depósito</span>
          </div>
        )
      case "withdrawal":
        return (
          <div className="inline-flex items-center gap-1 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full bg-red-500/20 text-red-400 text-[10px] md:text-xs font-medium">
            <ArrowUp className="h-2.5 w-2.5 md:h-3 md:w-3" />
            <span>Saque</span>
          </div>
        )
    }
  }

  // Renderizar skeletons durante o carregamento
  const renderSkeletons = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <TableRow key={`skeleton-${index}`} className="border-gray-800">
          <TableCell>
            <Skeleton className="h-5 md:h-6 w-16 md:w-24 bg-gray-800" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 md:h-6 w-16 md:w-20 bg-gray-800" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 md:h-6 w-12 md:w-16 bg-gray-800" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 md:h-6 w-16 md:w-20 bg-gray-800" />
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <Skeleton className="h-5 md:h-6 w-20 md:w-24 bg-gray-800" />
          </TableCell>
        </TableRow>
      ))
  }

  // Componente de filtros para dispositivos móveis
  const MobileFilters = () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 bg-black/40 border-gray-800 hover:bg-black/60"
        >
          <Filter className="h-4 w-4" />
          <span>Filtrar Transações</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-[#0e0e0e] border-t border-gray-800">
        <DrawerHeader>
          <DrawerTitle className="text-center text-white">Filtros</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Tipo de Transação</label>
            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger className="bg-black/40 border-gray-800 hover:bg-black/60">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent className="bg-[#0e0e0e] border-gray-800">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="deposit">Depósitos</SelectItem>
                <SelectItem value="withdrawal">Saques</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Data Inicial</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-black/40 border-gray-800 hover:bg-black/60"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-neon-cyan" />
                  {dateFrom ? format(dateFrom, "dd/MM/yyyy") : <span>Selecione uma data</span>}
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

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Data Final</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-black/40 border-gray-800 hover:bg-black/60"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-neon-cyan" />
                  {dateTo ? format(dateTo, "dd/MM/yyyy") : <span>Selecione uma data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#0e0e0e] border-gray-800">
                <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus className="bg-[#0e0e0e]" />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DrawerFooter className="border-t border-gray-800 pt-4">
          <Button
            onClick={() => {
              handleFilter()
            }}
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
          <DrawerClose asChild>
            <Button variant="outline" className="bg-black/40 border-gray-800 hover:bg-black/60">
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )

  // Componente de filtros para desktop
  const DesktopFilters = () => (
    <div className="bg-[#0e0e0e] rounded-xl p-4 md:p-6 border border-gray-800 shadow-md">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="space-y-2 flex-1">
          <label className="text-sm text-gray-400">Tipo de Transação</label>
          <Select value={transactionType} onValueChange={setTransactionType}>
            <SelectTrigger className="bg-black/40 border-gray-800 hover:bg-black/60">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent className="bg-[#0e0e0e] border-gray-800">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="deposit">Depósitos</SelectItem>
              <SelectItem value="withdrawal">Saques</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
                {dateTo ? format(dateTo, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : <span>Selecione uma data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#0e0e0e] border-gray-800">
              <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus className="bg-[#0e0e0e]" />
            </PopoverContent>
          </Popover>
        </div>

        <div>
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
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Cabeçalho */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-neon-cyan to-white bg-clip-text text-transparent pb-2 flex items-center justify-center gap-2">
          <ArrowUpDown className="h-6 w-6 md:h-8 md:w-8 text-neon-cyan" /> Extrato Financeiro
        </h1>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Acompanhe todos os seus depósitos e saques realizados.
        </p>
      </div>

      {/* Totalizador */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div className="bg-gradient-to-r from-black/60 to-black/40 rounded-xl p-4 md:p-6 border border-gray-800">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-gray-400 mb-1 md:mb-2">
              <ArrowDown className="h-4 w-4 md:h-5 md:w-5 text-neon-green" />
              <span className="text-sm md:text-base">Total Depositado</span>
            </div>
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-neon-green">
              {loading ? (
                <Skeleton className="h-6 md:h-8 w-24 md:w-32 bg-gray-800" />
              ) : (
                `US$ ${totalDeposits.toLocaleString()}`
              )}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-black/60 to-black/40 rounded-xl p-4 md:p-6 border border-gray-800">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-gray-400 mb-1 md:mb-2">
              <ArrowUp className="h-4 w-4 md:h-5 md:w-5 text-red-400" />
              <span className="text-sm md:text-base">Total Sacado</span>
            </div>
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
              {loading ? (
                <Skeleton className="h-6 md:h-8 w-24 md:w-32 bg-gray-800" />
              ) : (
                `US$ ${totalWithdrawals.toLocaleString()}`
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Área de filtros - Responsiva */}
      {isMobile ? <MobileFilters /> : <DesktopFilters />}

      {/* Tabela de extrato */}
      <div className="bg-[#0e0e0e] rounded-xl border border-gray-800 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-black/40">
              <TableRow className="hover:bg-transparent border-gray-800">
                <TableHead className="text-gray-400 font-medium text-xs md:text-sm">
                  <div className="flex items-center gap-1 md:gap-2">
                    <CalendarIcon className="h-3 w-3 md:h-4 md:w-4 text-neon-cyan" /> Data
                  </div>
                </TableHead>
                <TableHead className="text-gray-400 font-medium text-xs md:text-sm">
                  <div className="flex items-center gap-1 md:gap-2">
                    <ArrowUpDown className="h-3 w-3 md:h-4 md:w-4 text-neon-cyan" /> Tipo
                  </div>
                </TableHead>
                <TableHead className="text-gray-400 font-medium text-right text-xs md:text-sm">
                  <div className="flex items-center gap-1 md:gap-2 justify-end">
                    <Wallet className="h-3 w-3 md:h-4 md:w-4 text-neon-cyan" /> Valor
                  </div>
                </TableHead>
                <TableHead className="text-gray-400 font-medium text-xs md:text-sm">
                  <div className="flex items-center gap-1 md:gap-2">
                    <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 text-neon-cyan" /> Status
                  </div>
                </TableHead>
                <TableHead className="text-gray-400 font-medium hidden md:table-cell text-xs md:text-sm">
                  <div className="flex items-center gap-1 md:gap-2">
                    <Wallet className="h-3 w-3 md:h-4 md:w-4 text-neon-cyan" /> Método
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                renderSkeletons()
              ) : filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 md:py-8 text-gray-400 text-sm md:text-base">
                    Nenhuma transação encontrada para o período selecionado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((tx, index) => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className="border-gray-800 hover:bg-gray-900/50 transition-colors cursor-default"
                  >
                    <TableCell className="font-medium text-xs md:text-sm py-2 md:py-4">
                      {format(tx.date, "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell className="py-2 md:py-4">{renderTransactionType(tx.type)}</TableCell>
                    <TableCell className="text-right font-medium text-xs md:text-sm py-2 md:py-4">
                      US$ {tx.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="py-2 md:py-4">{renderStatus(tx.status)}</TableCell>
                    <TableCell className="hidden md:table-cell text-xs md:text-sm py-2 md:py-4">{tx.method}</TableCell>
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
