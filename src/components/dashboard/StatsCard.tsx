import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'destructive';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  color = 'primary',
}) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
    destructive: 'bg-destructive/10 text-destructive',
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-accent' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-card overflow-hidden hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 border-muted/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{title}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-extrabold tracking-tight">{value}</p>
                {trend && trendValue && (
                  <div className={cn('flex items-center gap-0.5 text-xs font-bold', trendColor)}>
                    <TrendIcon className="h-3 w-3" />
                    {trendValue}
                  </div>
                )}
              </div>
              {subtitle && (
                <p className="text-[10px] text-muted-foreground font-medium">{subtitle}</p>
              )}
            </div>
            <div
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm transition-transform hover:scale-110 duration-300',
                colorClasses[color]
              )}
            >
              <Icon className="h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
