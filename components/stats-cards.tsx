// components/stats-cards.tsx
'use client';

import { useEffect, useState } from 'react';
import {
  Wallet,
  PiggyBank,
  Users,
  ArrowUpDown,
  TrendingUp,
  Network,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import api from '@/lib/axios';

type Stats = {
  totalInvested: number;
  dailyProfit: number;
  networkEarnings: number;
  withdrawalsPending: number;
};

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  color,
  glowClass,
  isAnimated = false,
  isNegative = false,
  isPercentage = false,
  customStyle = '',
  customValueClass = '',
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  color: string;
  glowClass: string;
  isAnimated?: boolean;
  isNegative?: boolean;
  isPercentage?: boolean;
  customStyle?: string;
  customValueClass?: string;
}) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const formattedValue = () => {
    if (isPercentage && typeof displayValue === 'number') {
      return `${displayValue > 0 ? '+' : ''}${displayValue.toFixed(2)}%`;
    }
    if (typeof displayValue === 'number') {
      const num = displayValue.toFixed(2);
      return isNegative ? `-${Math.abs(Number(num)).toFixed(2)}` : num;
    }
    return displayValue;
  };

  return (
    <Card className={cn('gradient-border relative card-glow', customStyle)}>
      <CardContent className="flex items-center p-3 sm:p-4 md:p-6">
        <div
          className={`flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full mr-3 md:mr-4 ${color} icon-container`}
          style={{ '--neon-color': glowClass } as React.CSSProperties}
        >
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-muted-foreground truncate">
            {title}
          </p>
          <h3
            className={cn(
              'text-base sm:text-xl md:text-2xl font-bold truncate',
              isAnimated && 'transition-all duration-500',
              isNegative ? 'text-red-400' : '',
              customValueClass
            )}
          >
            {formattedValue()}
          </h3>
          <p className="text-[10px] xs:text-xs text-muted-foreground mt-0.5 md:mt-1 truncate">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default function StatsCards() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api.get<Stats>('/dashboard/stats').then(({ data }) => {
      setStats(data);
    });
  }, []);

  if (!stats) {
    return <div>Carregando...</div>;
  }

  const isDailyProfitNegative = stats.dailyProfit < 0;

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      <StatCard
        title="Saldo Total"
        value={stats.totalInvested}
        description="Disponível para investimentos"
        icon={Wallet}
        color="bg-neon-blue/10 text-neon-blue"
        glowClass="#3b82f6"
        isAnimated
        isNegative={stats.totalInvested < 0}
      />
      <StatCard
        title="Total Investido"
        value={stats.totalInvested}
        description="Em investimentos ativos"
        icon={PiggyBank}
        color="bg-neon-purple/10 text-neon-purple"
        glowClass="#8b5cf6"
      />
      <StatCard
        title="Saldo de Comissões"
        value={stats.networkEarnings}
        description="De indicações"
        icon={Users}
        color="bg-neon-cyan/10 text-neon-cyan"
        glowClass="#06b6d4"
      />
      <StatCard
        title="Total de Saques"
        value={stats.withdrawalsPending}
        description="Histórico completo"
        icon={ArrowUpDown}
        color="bg-neon-blue/10 text-neon-blue"
        glowClass="#3b82f6"
      />
      <StatCard
        title="Rendimento do Dia"
        value={stats.dailyProfit}
        description="Meta diária: 3%"
        icon={TrendingUp}
        color={
          isDailyProfitNegative
            ? 'bg-red-500/10 text-red-400'
            : 'bg-neon-cyan/10 text-neon-cyan'
        }
        glowClass={isDailyProfitNegative ? '#ef4444' : '#06b6d4'}
        isAnimated
        isNegative={isDailyProfitNegative}
        isPercentage
      />
      <StatCard
        title="Minha Rede"
        value={`${stats.networkEarnings} pessoas`}
        description="Total de indicados"
        icon={Network}
        color="bg-neon-purple/10 text-neon-purple"
        glowClass="#8b5cf6"
      />
    </div>
  );
}
