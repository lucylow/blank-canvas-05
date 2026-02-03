import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, CheckCircle, Info, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Insight } from '@/types';

interface InsightCardProps {
  insight: Insight;
  onAction?: () => void;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight, onAction }) => {
  const typeConfig = {
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-l-amber-500',
      iconColor: 'text-amber-500',
    },
    improvement: {
      icon: TrendingUp,
      bgColor: 'bg-secondary/10',
      borderColor: 'border-l-secondary',
      iconColor: 'text-secondary',
    },
    success: {
      icon: CheckCircle,
      bgColor: 'bg-accent/10',
      borderColor: 'border-l-accent',
      iconColor: 'text-accent',
    },
    info: {
      icon: Info,
      bgColor: 'bg-primary/10',
      borderColor: 'border-l-primary',
      iconColor: 'text-primary',
    },
  };

  const config = typeConfig[insight.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={cn(
          'glass-card border-l-4 transition-all hover:shadow-xl hover:translate-y-[-2px] duration-300',
          config.borderColor
        )}
      >
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-inner',
                config.bgColor
              )}
            >
              <Icon className={cn('h-6 w-6', config.iconColor)} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center justify-between gap-2">
                <h4 className="font-bold text-base truncate">{insight.title}</h4>
                <span
                  className={cn(
                    'rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                    insight.priority === 'high'
                      ? 'bg-destructive/20 text-destructive border border-destructive/20'
                      : insight.priority === 'medium'
                      ? 'bg-amber-500/20 text-amber-500 border border-amber-500/20'
                      : 'bg-muted text-muted-foreground border border-border'
                  )}
                >
                  {insight.priority}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{insight.description}</p>

              {insight.actionable && onAction && (
                <Button
                  variant="link"
                  size="sm"
                  className="mt-3 -ml-3 text-primary font-semibold hover:no-underline group"
                  onClick={onAction}
                >
                  Take Action
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
