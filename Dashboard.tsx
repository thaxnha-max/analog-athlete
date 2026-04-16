/**
 * Dashboard Page
 * 
 * Weekly analytics dashboard with charts for workout trends, focus scores, and recovery patterns.
 */

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Brain, Heart } from "lucide-react";
import { useLocation } from "wouter";
import { useWorkoutData } from "@/hooks/useWorkoutData";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { data, isLoading } = useWorkoutData();
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [focusData, setFocusData] = useState<any[]>([]);
  const [workoutBreakdown, setWorkoutBreakdown] = useState<any[]>([]);

  useEffect(() => {
    if (!data) return;

    // Get last 7 days
    const today = new Date();
    const dates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split("T")[0];
    });

    // Build weekly workout data
    const weekly = dates.map((date) => {
      const workouts = data.workouts.filter((w) => w.date === date);
      const focusSessions = data.focusSessions.filter((f) => f.date === date);
      const metrics = data.dailyMetrics.find((m) => m.date === date);

      return {
        date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        workouts: workouts.length,
        duration: workouts.reduce((sum, w) => sum + w.duration, 0),
        focusSessions: focusSessions.length,
        focusScore: focusSessions.length > 0
          ? Math.round(focusSessions.reduce((sum, f) => sum + f.focusScore, 0) / focusSessions.length)
          : 0,
        recovery: metrics?.recoveryIndex || 0,
      };
    });

    // Build focus quality trend
    const focus = dates.map((date) => {
      const focusSessions = data.focusSessions.filter((f) => f.date === date);
      const avgScore = focusSessions.length > 0
        ? Math.round(focusSessions.reduce((sum, f) => sum + f.focusScore, 0) / focusSessions.length)
        : 0;

      return {
        date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        focusQuality: avgScore,
        sessions: focusSessions.length,
      };
    });

    // Workout type breakdown
    const typeCount: Record<string, number> = {};
    data.workouts.forEach((w) => {
      typeCount[w.type] = (typeCount[w.type] || 0) + 1;
    });

    const breakdown = Object.entries(typeCount).map(([type, count]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      value: count,
    }));

    setWeeklyData(weekly);
    setFocusData(focus);
    setWorkoutBreakdown(breakdown);
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground">Loading...</p>
      </div>
    );
  }

  const COLORS = ["#cb5a2d", "#123c35", "#f4b860", "#5b5547", "#8b7355"];

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
                Performance Metrics
              </p>
              <h1 className="font-display text-2xl uppercase tracking-[0.06em] text-[#111111]">
                Weekly Dashboard
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container relative py-6 sm:py-8 lg:py-10">
        {/* Summary Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-4">
          <Card className="analog-panel border-2 border-[#111111] bg-[#fbf7ed] shadow-[6px_6px_0_#111111]">
            <CardContent className="p-4">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#5b5547]">
                Total Workouts
              </p>
              <p className="mt-2 font-display text-3xl uppercase text-[#111111]">
                {data?.workouts.filter((w) => {
                  const d = new Date(w.date);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return d >= weekAgo;
                }).length || 0}
              </p>
            </CardContent>
          </Card>

          <Card className="analog-panel border-2 border-[#111111] bg-[#fbf7ed] shadow-[6px_6px_0_#111111]">
            <CardContent className="p-4">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#5b5547]">
                Focus Sessions
              </p>
              <p className="mt-2 font-display text-3xl uppercase text-[#123c35]">
                {data?.focusSessions.filter((f) => {
                  const d = new Date(f.date);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return d >= weekAgo;
                }).length || 0}
              </p>
            </CardContent>
          </Card>

          <Card className="analog-panel border-2 border-[#111111] bg-[#fbf7ed] shadow-[6px_6px_0_#111111]">
            <CardContent className="p-4">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#5b5547]">
                Avg Focus Score
              </p>
              <p className="mt-2 font-display text-3xl uppercase text-[#123c35]">
                {data?.focusSessions.length ? Math.round(
                  data.focusSessions.reduce((sum, f) => sum + f.focusScore, 0) / data.focusSessions.length
                ) : 0}%
              </p>
            </CardContent>
          </Card>

          <Card className="analog-panel border-2 border-[#111111] bg-[#fbf7ed] shadow-[6px_6px_0_#111111]">
            <CardContent className="p-4">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#5b5547]">
                Current Streak
              </p>
              <p className="mt-2 font-display text-3xl uppercase text-[#cb5a2d]">
                {data?.dailyMetrics.length || 0}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Weekly Activity Chart */}
          <Card className="analog-panel border-2 border-[#111111] bg-white shadow-[8px_8px_0_#111111]">
            <CardHeader className="border-b-2 border-[#111111] pb-4">
              <CardTitle className="flex items-center gap-2 font-display text-lg uppercase">
                <TrendingUp className="h-5 w-5" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#111111" />
                  <XAxis dataKey="date" stroke="#111111" />
                  <YAxis stroke="#111111" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f6efdf",
                      border: "2px solid #111111",
                      borderRadius: "0.9rem",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="duration" fill="#cb5a2d" name="Workout Duration (min)" />
                  <Bar dataKey="focusSessions" fill="#123c35" name="Focus Sessions" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Focus Quality Trend */}
          <Card className="analog-panel border-2 border-[#111111] bg-white shadow-[8px_8px_0_#111111]">
            <CardHeader className="border-b-2 border-[#111111] pb-4">
              <CardTitle className="flex items-center gap-2 font-display text-lg uppercase">
                <Brain className="h-5 w-5" />
                Focus Quality Trend
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={focusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#111111" />
                  <XAxis dataKey="date" stroke="#111111" />
                  <YAxis stroke="#111111" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f6efdf",
                      border: "2px solid #111111",
                      borderRadius: "0.9rem",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="focusQuality"
                    stroke="#123c35"
                    strokeWidth={3}
                    dot={{ fill: "#123c35", r: 5 }}
                    name="Focus Quality %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recovery Index */}
          <Card className="analog-panel border-2 border-[#111111] bg-white shadow-[8px_8px_0_#111111]">
            <CardHeader className="border-b-2 border-[#111111] pb-4">
              <CardTitle className="flex items-center gap-2 font-display text-lg uppercase">
                <Heart className="h-5 w-5" />
                Recovery Index
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#111111" />
                  <XAxis dataKey="date" stroke="#111111" />
                  <YAxis stroke="#111111" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f6efdf",
                      border: "2px solid #111111",
                      borderRadius: "0.9rem",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="recovery"
                    stroke="#f4b860"
                    strokeWidth={3}
                    dot={{ fill: "#f4b860", r: 5 }}
                    name="Recovery Index"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Workout Type Breakdown */}
          {workoutBreakdown.length > 0 && (
            <Card className="analog-panel border-2 border-[#111111] bg-white shadow-[8px_8px_0_#111111]">
              <CardHeader className="border-b-2 border-[#111111] pb-4">
                <CardTitle className="font-display text-lg uppercase">
                  Workout Type Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={workoutBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {workoutBreakdown.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#f6efdf",
                        border: "2px solid #111111",
                        borderRadius: "0.9rem",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
