import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Check } from "lucide-react"

export default function RulesSection() {
  const rules = [
    { title: "Investimento mínimo", value: "$20" },
    { title: "Investimento máximo", value: "$20.000" },
    { title: "Saque mínimo", value: "$20" },
    { title: "Saque máximo", value: "$5.000 por dia" },
    { title: "Frequência de saques", value: "1 saque diário" },
    { title: "Comissão nível 1", value: "10%" },
    { title: "Comissão nível 2", value: "4%" },
    { title: "Comissão nível 3", value: "3%" },
    { title: "Comissão nível 4", value: "2%" },
    { title: "Comissão nível 5", value: "1%" },
  ]

  return (
    <Card className="gradient-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-neon-purple" />
          <span>Regras da Plataforma</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {rules.map((rule, index) => (
            <div key={index} className="p-3 rounded-xl bg-card/40 flex items-start">
              <div className="h-5 w-5 mt-0.5 mr-2 rounded-full bg-neon-green/10 flex items-center justify-center">
                <Check className="h-3 w-3 text-neon-green" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{rule.title}</p>
                <p className="text-sm font-medium">{rule.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
