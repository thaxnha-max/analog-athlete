/**
 * RecoveryHistory Component
 * 
 * Displays daily recovery metrics with visual progress indicators.
 */

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useWorkoutData } from "@/hooks/useWorkoutData";
import { DailyMetrics } from "@/lib/storage";
import { Heart, Droplet, Moon, Zap } from "lucide-react";

interface RecoveryHistoryProps {
  date?: string;
}

export function RecoveryHistory({ date }: RecoveryHistoryProps) {
  const { getMetricsForDate } = useWorkoutData();
  const [metrics, setMetrics] = useState<DailyMetrics | null>(null);

  useEffect(() => {
    const today = date || new Date().toISOString().split("T")[0];
    const data = getMetricsForDate(today);
    setMetrics(data);
  }, [date, getMetricsForDate]);

  if (!metrics) {
    return (
      <Card className="analog-panel border-2 border-[#111111] bg-[#fbf7ed] shadow-[8px_8px_0_#111111]">
        <CardContent className="flex flex-col items-center justify-center gap-3 py-8 text-center">
          <Heart className="h-8 w-8 text-[#5b5547]/40" />
          <p className="text-sm text-[#5b5547]">No recovery metrics logged yet for this date.</p>
        </CardContent>
      </Card>
    );
  }

  const getRecoveryStatus = (index: number) => {
    if (index >= 80) return "Excellent";
    if (index >= 60) return "Good";
    if (index >= 40) return "Fair";
    return "Needs Attention";
  };

  const getStatusColor = (index: number) => {
    if (index >= 80) return "text-[#123c35]";
    if (index >= 60) return "text-[#f4b860]";
    if (index >= 40) return "text-[#cb5a2d]";
    return "text-red-600";
  };

  return (
    <div className="space-y-4">
      {/* Recovery Index Card */}
      <Card className="analog-panel border-2 border-[#111111] bg-white shadow-[6px_6px_0_#111111]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-[#cb5a2d]" />
              <div>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#5b5547]">
                  Recovery Index
                </p>
                <p className={`font-display text-2xl uppercase ${getStatusColor(metrics.recoveryIndex)}`}>
                  {metrics.recoveryIndex}%
                </p>
              </div>
            </div>
            <p className={`font-display text-lg uppercase ${getStatusColor(metrics.recoveryIndex)}`}>
              {getRecoveryStatus(metrics.recoveryIndex)}
            </p>
          </div>
          <Progress value={metrics.recoveryIndex} className="h-3" />
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Sleep */}
        <Card className="analog-panel border-2 border-[#111111] bg-white shadow-[6px_6px_0_#111111]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Moon className="h-5 w-5 text-[#123c35]" />
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#5b5547]">
                Sleep Duration
              </p>
            </div>
            <p className="font-display text-3xl text-[#123c35]">
              {metrics.sleepHours.toFixed(1)}
              <span className="ml-1 text-lg">h</span>
            </p>
            <Progress
              value={Math.min((metrics.sleepHours / 8) * 100, 100)}
              className="mt-3 h-2"
            />
            <p className="mt-2 text-xs text-[#5b5547]">Target: 8 hours</p>
          </CardContent>
        </Card>

        {/* Hydration */}
        <Card className="analog-panel border-2 border-[#111111] bg-white shadow-[6px_6px_0_#111111]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Droplet className="h-5 w-5 text-[#cb5a2d]" />
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#5b5547]">
                Hydration Level
              </p>
            </div>
            <p className="font-display text-3xl text-[#cb5a2d]">
              {metrics.hydration}%
            </p>
            <Progress value={metrics.hydration} className="mt-3 h-2" />
            <p className="mt-2 text-xs text-[#5b5547]">Optimal: 80%+</p>
          </CardContent>
        </Card>

        {/* Focus Score */}
        <Card className="analog-panel border-2 border-[#111111] bg-white shadow-[6px_6px_0_#111111]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="h-5 w-5 text-[#f4b860]" />
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#5b5547]">
                Focus Score
              </p>
            </div>
            <p className="font-display text-3xl text-[#f4b860]">
              {metrics.focusScore}%
            </p>
            <Progress value={metrics.focusScore} className="mt-3 h-2" />
            <p className="mt-2 text-xs text-[#5b5547]">Mental readiness</p>
          </CardContent>
        </Card>

        {/* Momentum */}
        <Card className="analog-panel border-2 border-[#111111] bg-white shadow-[6px_6px_0_#111111]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="h-5 w-5 text-[#123c35]" />
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#5b5547]">
                Momentum
              </p>
            </div>
            <p className="font-display text-3xl text-[#123c35]">
              {metrics.momentum}%
            </p>
            <Progress value={metrics.momentum} className="mt-3 h-2" />
            <p className="mt-2 text-xs text-[#5b5547]">Training readiness</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="analog-panel border-2 border-[#111111] bg-[#fbf7ed] shadow-[6px_6px_0_#111111]">
        <CardContent className="p-4">
          <p className="font-display text-sm uppercase text-[#111111] mb-3">
            Recovery Recommendations
          </p>
          <ul className="space-y-2 text-sm text-[#403a31]">
            {metrics.sleepHours < 7 && (
              <li>• Prioritize sleep tonight - aim for 8+ hours</li>
            )}
            {metrics.hydration < 70 && (
              <li>• Increase water intake throughout the day</li>
            )}
            {metrics.recoveryIndex < 60 && (
              <li>• Consider a lighter workout or active recovery session</li>
            )}
            {metrics.recoveryIndex >= 80 && (
              <li>• You're well-recovered - great day for intensity training</li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
