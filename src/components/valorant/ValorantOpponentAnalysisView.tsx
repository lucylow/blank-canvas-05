import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Target, Clock, Swords, Eye, ListChecks } from 'lucide-react';
import type { ValorantOpponentAnalysisOutput } from '@/types/valorantAgents';

interface Props { analysis: ValorantOpponentAnalysisOutput }

export const ValorantOpponentAnalysisView: React.FC<Props> = ({ analysis }) => {
  const { opponent_profile, exploitable_patterns, quick_rules } = analysis;

  const severityColor = (s: string) => {
    switch (s) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Valorant Opponent Analysis</h2>
          <p className="text-muted-foreground">Exploitable Patterns</p>
        </div>
        <Badge variant="outline" className="text-xs">Player-focused</Badge>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" /> Quick Rules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {quick_rules.map((r, i) => (
              <Badge key={i} variant="secondary">{r}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2"><Clock className="w-4 h-4" /> Likely Opener</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{opponent_profile.likelyOpener}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2"><Swords className="w-4 h-4" /> Economy Habits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {(opponent_profile.economy_habits || []).map((e, i) => (
                <Badge key={i} variant="outline">{e}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2"><Eye className="w-4 h-4" /> Post-Plant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {(opponent_profile.postplant_tendencies || []).map((e, i) => (
                <Badge key={i} variant="outline">{e}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ListChecks className="w-4 h-4" /> Exploitable Patterns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[380px]">
            <div className="space-y-3">
              {exploitable_patterns.map(p => (
                <div key={p.id} className="p-3 rounded-md border">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-sm">{p.category}: {p.pattern}</div>
                    <span className={`text-[10px] px-2 py-0.5 rounded ${severityColor(p.severity)}`}>{p.severity}</span>
                  </div>
                  {p.what_you_see && p.what_you_see.length > 0 && (
                    <ul className="list-disc pl-5 mt-2 text-xs text-muted-foreground">
                      {p.what_you_see.map((w, i) => (<li key={i}>{w}</li>))}
                    </ul>
                  )}
                  <div className="mt-2">
                    <div className="text-xs font-medium">Exploit:</div>
                    <ul className="list-disc pl-5 text-xs">
                      {p.exploit.map((e, i) => (<li key={i}>{e}</li>))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
