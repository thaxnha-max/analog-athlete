/**
 * Recovery Page
 * 
 * Displays and manages daily recovery metrics including sleep, hydration, and readiness.
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus } from "lucide-react";
import { useLocation } from "wouter";
import { useWorkoutData } from "@/hooks/useWorkoutData";
import { RecoveryLogger } from "@/components/RecoveryLogger";
import { RecoveryHistory } from "@/components/RecoveryHistory";

export default function Recovery() {
  const [, setLocation] = useLocation();
  const [showLogger, setShowLogger] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const { data, isLoading } = useWorkoutData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground">Loading...</p>
      </div>
    );
  }

  const avgRecovery = data?.dailyMetrics.length
    ? Math.round(data.dailyMetrics.reduce((sum, m) => sum + m.recoveryIndex, 0) / data.dailyMetrics.length)
    : 0;

  const avgSleep = data?.dailyMetrics.length
    ? (data.dailyMetrics.reduce((sum, m) => sum + m.sleepHours, 0) / data.dailyMetrics.length).toFixed(1)
    : 0;

  const avgHydration = data?.dailyMetrics.length
    ? Math.round(data.dailyMetrics.reduce((sum, m) => sum + m.hydration, 0) / data.dailyMetrics.length)
    : 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="analog-grid pointer-events-none fixed inset-0 opacity-70" />
      <div className="analog-noise pointer-events-none fixed inset-0 opacity-60" />

      <header className="sticky top-0 z-40 border-b border-black/10 bg-[rgba(248,243,231,0.88)] backdrop-blur-md">
        <div className="container flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation("/")}
              className="rounded-lg border-2 border-[#111111] bg-white p-2 hover:bg-[#f0f0f0] transition"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[#5a5347]">
                Restoration Protocol
              </p>
              <h1 className="font-display text-2xl uppercase tracking-[0.06em] text-[#111111]">
                Recovery Metrics
              </h1>
            </div>
          </div>

          <Button
            onClick={() => setShowLogger(true)}
            className="rounded-full border-2 border-[#111111] bg-[#cb5a2d] px-5 text-[#fff8ef] shadow-[4px_4px_0_#111111] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
          >
            <Plus className="mr-2 h-4 w-4" />
            Log Recovery
          </Button>
        </div>
      </header>

      <main className="container relative py-6 sm:py-8 lg:py-10">
        {/* Summary Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Card className="analog-panel border-2 border-[#111111] bg-[#fbf7ed] shadow-[6px_6px_0_#111111]">
            <CardContent className="p-4">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#5b5547]">
                Avg Recovery Index
              </p>
              <p className="mt-2 font-display text-3xl uppercase text-[#cb5a2d]">
                {avgRecovery}%
              </p>
            </CardContent>
          </Card>

          <Card className="analog-panel border-2 border-[#111111] bg-[#fbf7ed] shadow-[6px_6px_0_#111111]">
            <CardContent className="p-4">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#5b5547]">
                Avg Sleep
              </p>
              <p className="mt-2 font-display text-3xl uppercase text-[#123c35]">
                {avgSleep}
                <span className="ml-1 text-lg">h</span>
              </p>
            </CardContent>
          </Card>

          <Card className="analog-panel border-2 border-[#111111] bg-[#fbf7ed] shadow-[6px_6px_0_#111111]">
            <CardContent className="p-4">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#5b5547]">
                Avg Hydration
              </p>
              <p className="mt-2 font-display text-3xl uppercase text-[#f4b860]">
                {avgHydration}%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Info Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <Card className="analog-panel border-2 border-[#111111] bg-white shadow-[6px_6px_0_#111111]">
            <CardHeader className="border-b-2 border-[#111111] pb-4">
              <CardTitle className="font-display text-lg uppercase">Recovery Tips</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-2 text-sm text-[#403a31]">
                <li>• Sleep 7-9 hours per night for optimal recovery</li>
                <li>• Drink 2-3 liters of water daily</li>
                <li>• Include 10-15 min of stretching post-workout</li>
                <li>• Monitor resting heart rate for overtraining</li>
                <li>• Take 1-2 full rest days per week</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="analog-panel border-2 border-[#111111] bg-white shadow-[6px_6px_0_#111111]">
            <CardHeader className="border-b-2 border-[#111111] pb-4">
              <CardTitle className="font-display text-lg uppercase">Recovery Signals</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-2 text-sm text-[#403a31]">
                <li>✓ Consistent sleep schedule</li>
                <li>✓ Clear skin and bright eyes</li>
                <li>✓ Stable energy throughout day</li>
                <li>✓ Positive mood and motivation</li>
                <li>✓ Fast heart rate recovery</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Date Selector */}
        <Card className="analog-panel mb-8 border-2 border-[#111111] bg-white shadow-[6px_6px_0_#111111]">
          <CardHeader className="border-b-2 border-[#111111] pb-4">
            <CardTitle className="font-display text-lg uppercase">Select Date</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded-[0.9rem] border-2 border-[#111111] bg-white px-4 py-2 font-sans text-[#111111]"
            />
          </CardContent>
        </Card>

        {/* Logger Modal */}
        {showLogger && (
          <div className="mb-8">
            <RecoveryLogger
              date={selectedDate}
              onClose={() => setShowLogger(false)}
            />
          </div>
        )}

        {/* Recovery History */}
        <div>
          <h2 className="mb-4 font-display text-2xl uppercase text-[#111111]">
            Recovery Metrics for {selectedDate}
          </h2>
          <RecoveryHistory date={selectedDate} />
        </div>
      </main>
    </div>
  );
}
