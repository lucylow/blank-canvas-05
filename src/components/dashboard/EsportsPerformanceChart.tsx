import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EsportsPerformanceChartProps {
  lolData: any[];
  valorantData: any[];
}

export const EsportsPerformanceChart: React.FC<EsportsPerformanceChartProps> = ({
  lolData,
  valorantData,
}) => {
  return (
    <Card className="glass-card border-none shadow-none bg-transparent">
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <div>
          <CardTitle className="text-xl font-bold">Performance Analytics</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">Cross-game talent metrics</p>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="lol" className="space-y-6">
          <TabsList className="bg-muted/50 p-1 w-fit">
            <TabsTrigger value="lol" className="px-6">League of Legends</TabsTrigger>
            <TabsTrigger value="valorant" className="px-6">VALORANT</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lol" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lolData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="champion" 
                    fontSize={12} 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    fontSize={12} 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '12px' }} />
                  <Bar dataKey="win_rate" name="Win Rate %" fill="url(#colorWinRateLoL)" radius={[6, 6, 0, 0]} barSize={30} />
                  <Bar dataKey="kda" name="KDA" fill="url(#colorKdaLoL)" radius={[6, 6, 0, 0]} barSize={30} />
                  <defs>
                    <linearGradient id="colorWinRateLoL" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={1}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.6}/>
                    </linearGradient>
                    <linearGradient id="colorKdaLoL" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={1}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.6}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="valorant" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={valorantData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="agent" 
                    fontSize={12} 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    fontSize={12} 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '12px' }} />
                  <Bar dataKey="win_rate" name="Win Rate %" fill="url(#colorWinRateVal)" radius={[6, 6, 0, 0]} barSize={30} />
                  <Bar dataKey="kd" name="K/D Ratio" fill="url(#colorKdVal)" radius={[6, 6, 0, 0]} barSize={30} />
                  <defs>
                    <linearGradient id="colorWinRateVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={1}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0.6}/>
                    </linearGradient>
                    <linearGradient id="colorKdVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={1}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.6}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
