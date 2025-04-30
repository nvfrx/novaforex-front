import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Award, Crown } from "lucide-react"

type LeaderProps = {
  position: number
  name: string
  amount: number
  avatar: string
}

const Leader = ({ position, name, amount, avatar }: LeaderProps) => {
  const getIcon = () => {
    switch (position) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Award className="h-5 w-5 text-gray-300" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return null
    }
  }

  const getPrize = () => {
    switch (position) {
      case 1:
        return "$1,000"
      case 2:
        return "$500"
      case 3:
        return "$250"
      default:
        return ""
    }
  }

  return (
    <div className="flex items-center p-4 rounded-xl bg-card/40 mb-3 hover:bg-card/60 transition-colors">
      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-neon-purple/10 text-neon-purple mr-3">
        {getIcon()}
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          <img src={avatar || "/placeholder.svg"} alt={name} className="h-8 w-8 rounded-full mr-3" />
          <span className="font-medium">{name}</span>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-bold">${amount.toLocaleString()}</div>
        <div className="text-xs text-neon-cyan">{getPrize()}</div>
      </div>
    </div>
  )
}

export default function LeaderboardSection() {
  const leaders = [
    { position: 1, name: "Alex Morgan", amount: 45800, avatar: "/thoughtful-portrait.png" },
    { position: 2, name: "Sarah Johnson", amount: 32400, avatar: "/diverse-group-chatting.png" },
    { position: 3, name: "David Lee", amount: 28100, avatar: "/diverse-group-chatting.png" },
    { position: 4, name: "Michael Chen", amount: 23600, avatar: "/diverse-group-chatting.png" },
    { position: 5, name: "Jessica Miller", amount: 19200, avatar: "/diverse-group-city.png" },
  ]

  return (
    <Card className="gradient-border h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-yellow-500" />
          <span>Programa de Líderes</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 rounded-xl bg-neon-purple/5 mb-4">
          <p className="text-sm">
            Ganhe recompensas mensais tornando-se um dos nossos principais líderes. Construa sua rede e ganhe até $1000
            por mês!
          </p>
        </div>

        <div>
          {leaders.map((leader) => (
            <Leader key={leader.position} {...leader} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
