/*
  Analog Athlete design note for this file:
  Neo-Retro Swiss-modernist instrumentation. Use asymmetry, industrial labels,
  oversized numerals, disciplined spacing, and tactile utility panels.
  Every section should feel like part of a calibrated training-and-focus board.
*/
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useLocation } from "wouter";
import {
  ArrowRight,
  CalendarRange,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Dumbbell,
  Flame,
  Focus,
  Footprints,
  Gauge,
  Goal,
  LayoutGrid,
  MoonStar,
  NotebookPen,
  TimerReset,
  Trophy,
  Waves,
} from "lucide-react";

const heroStats = [
  { label: "Focus score", value: "86", suffix: "%", tone: "text-[#0f3b35]" },
  { label: "Sprint cadence", value: "4", suffix: "x", tone: "text-[#cb5a2d]" },
  { label: "Recovery avg", value: "7.8", suffix: "h", tone: "text-[#7a6a24]" },
];

const commandModules = [
  {
    title: "Workout block",
    meta: "06:30 AM",
    detail: "Lower body + tempo intervals",
    accent: "bg-[#cb5a2d]",
    icon: Dumbbell,
  },
  {
    title: "Focus block",
    meta: "09:00 AM",
    detail: "Deep work sprint / product planning",
    accent: "bg-[#123c35]",
    icon: Focus,
  },
  {
    title: "Recovery block",
    meta: "08:30 PM",
    detail: "Hydrate, stretch, notebook review",
    accent: "bg-[#bba645]",
    icon: MoonStar,
  },
];

const habitRows = [
  {
    label: "Move",
    cells: [true, true, true, true, false, true, true],
    tone: "bg-[#cb5a2d]",
  },
  {
    label: "Focus",
    cells: [true, true, false, true, true, true, false],
    tone: "bg-[#123c35]",
  },
  {
    label: "Sleep",
    cells: [true, true, true, false, true, true, true],
    tone: "bg-[#bba645]",
  },
];

const metricPanels = [
  {
    title: "Tempo run",
    value: "5.8",
    unit: "km",
    note: "Above target pace by 4%",
    icon: Footprints,
  },
  {
    title: "Focus sprints",
    value: "03",
    unit: "blocks",
    note: "Two high-output blocks completed",
    icon: TimerReset,
  },
  {
    title: "Hydration",
    value: "72",
    unit: "%",
    note: "1 more bottle to hit the mark",
    icon: Waves,
  },
];

const weeklyLog = [
  { day: "Mon", training: "Intervals", productivity: "Deep work", score: "88" },
  { day: "Tue", training: "Strength", productivity: "Planning", score: "81" },
  { day: "Wed", training: "Recovery", productivity: "Writing", score: "76" },
  { day: "Thu", training: "Tempo", productivity: "Ops review", score: "90" },
  { day: "Fri", training: "Upper body", productivity: "Design", score: "84" },
];

const dashboardCards = [
  {
    title: "14-day streak",
    value: "14",
    subtitle: "Consistent training + planning",
    tag: "Momentum",
  },
  {
    title: "Today’s target",
    value: "3",
    subtitle: "Priority tasks after workout",
    tag: "Focus",
  },
  {
    title: "Recovery index",
    value: "82",
    subtitle: "Sleep, hydration, mobility trend",
    tag: "Balance",
  },
];

function placeholderFeature(feature: string) {
  toast(`${feature} is coming soon.`);
}

export default function Home() {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="analog-grid pointer-events-none fixed inset-0 opacity-70" />
      <div className="analog-noise pointer-events-none fixed inset-0 opacity-60" />

      <header className="sticky top-0 z-40 border-b border-black/10 bg-[rgba(248,243,231,0.88)] backdrop-blur-md">
        <div className="container flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <div className="analog-stamp flex h-11 w-11 items-center justify-center rounded-[0.85rem] border-2 border-[#111111] bg-[#cb5a2d] text-[0.7rem] font-black uppercase tracking-[0.24em] text-[#f7f1e3] shadow-[4px_4px_0_#111111]">
              AA
            </div>
            <div>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[#5a5347]">
                Hybrid Fitness × Productivity
              </p>
              <h1 className="font-display text-2xl uppercase tracking-[0.06em] text-[#111111] sm:text-3xl">
                Analog Athlete
              </h1>
            </div>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            {[
              { label: "Dashboard", action: () => setLocation("/dashboard") },
              { label: "Sessions", action: () => setLocation("/sessions") },
              { label: "Focus", action: () => setLocation("/focus") },
              { label: "Recovery", action: () => setLocation("/recovery") },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="rounded-full border border-black/15 bg-[#f7f1e3] px-4 py-2 font-sans text-sm font-semibold text-[#222222] transition hover:-translate-y-0.5 hover:bg-white"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <Button
            onClick={() => placeholderFeature("Launch planner")}
            className="rounded-full border-2 border-[#111111] bg-[#123c35] px-5 text-[#f4f0e6] shadow-[4px_4px_0_#111111] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
          >
            Launch planner
          </Button>
        </div>
      </header>

      <main className="container relative py-6 sm:py-8 lg:py-10">
        <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="analog-panel overflow-hidden border-2 border-[#111111] bg-[#f6efdf] shadow-[8px_8px_0_#111111]">
            <CardContent className="p-0">
              <div className="grid gap-0 lg:grid-cols-[0.88fr_1.12fr]">
                <div className="flex flex-col justify-between gap-6 border-b-2 border-[#111111] p-6 sm:p-8 lg:border-b-0 lg:border-r-2">
                  <div className="space-y-4">
                    <Badge className="w-fit rounded-full border border-[#111111] bg-[#f7f1e3] px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[#111111]">
                      Personal operating system
                    </Badge>
                    <h2 className="max-w-xl font-display text-[2.65rem] uppercase leading-[0.92] tracking-[0.03em] text-[#111111] sm:text-[3.8rem]">
                      Train with rhythm. Work with intent.
                    </h2>
                    <p className="max-w-lg text-base leading-7 text-[#403a31] sm:text-lg">
                      Analog Athlete merges interval training, daily planning, and recovery cues into one calibrated interface designed for disciplined momentum.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={() => setLocation("/sessions")}
                      className="rounded-full border-2 border-[#111111] bg-[#cb5a2d] px-5 text-[#fff8ef] shadow-[4px_4px_0_#111111] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                    >
                      Start today's cadence
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => placeholderFeature("Review weekly board")}
                      className="rounded-full border-2 border-[#111111] bg-[#f7f1e3] px-5 text-[#111111] shadow-[4px_4px_0_#111111] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                    >
                      Review weekly board
                    </Button>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {heroStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-[1.25rem] border-2 border-[#111111] bg-[#fbf7ed] p-4 shadow-[4px_4px_0_#111111]"
                      >
                        <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#5b5547]">
                          {stat.label}
                        </p>
                        <p className={`mt-2 font-display text-4xl uppercase ${stat.tone}`}>
                          {stat.value}
                          <span className="ml-1 text-xl">{stat.suffix}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative min-h-[360px] overflow-hidden bg-[#ece2cf] p-4 sm:p-5">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663560501049/LFEKxDbHyJMwohauqrdspw/analog-athlete-hero-mA6h8hRyNhKVUhZaPWVc7F.webp"
                    alt="Neo-Retro Analog Athlete editorial collage"
                    className="h-full min-h-[330px] w-full rounded-[1.6rem] border-2 border-[#111111] object-cover shadow-[8px_8px_0_#111111]"
                  />
                  <div className="absolute bottom-8 left-8 max-w-[16rem] rounded-[1.1rem] border-2 border-[#111111] bg-[rgba(247,241,227,0.93)] p-4 shadow-[6px_6px_0_#111111] backdrop-blur-sm">
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[#5b5547]">
                      Today’s calibration
                    </p>
                    <p className="mt-2 font-display text-3xl uppercase text-[#111111]">
                      05 focus cycles
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#403a31]">
                      Built to balance output, movement, and deliberate recovery.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-5">
            <Card className="analog-panel border-2 border-[#111111] bg-[#123c35] text-[#f4f0e6] shadow-[8px_8px_0_#111111]">
              <CardContent className="space-y-6 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#d7cfbb]">
                      Daily command rail
                    </p>
                    <h3 className="mt-2 font-display text-3xl uppercase tracking-[0.05em]">
                      Planned cadence
                    </h3>
                  </div>
                  <Gauge className="h-6 w-6 text-[#f0c443]" />
                </div>

                <div className="space-y-3">
                  {commandModules.map((module) => {
                    const Icon = module.icon;
                    return (
                      <div
                        key={module.title}
                        className="rounded-[1.3rem] border border-white/20 bg-white/8 p-4 backdrop-blur-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-11 w-11 items-center justify-center rounded-full border border-[#111111] ${module.accent}`}>
                              <Icon className="h-5 w-5 text-[#f7f1e3]" />
                            </div>
                            <div>
                              <p className="font-display text-xl uppercase">{module.title}</p>
                              <p className="text-sm text-[#ddd2c0]">{module.detail}</p>
                            </div>
                          </div>
                          <span className="font-mono text-[0.74rem] uppercase tracking-[0.22em] text-[#f0c443]">
                            {module.meta}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-[1.2rem] border border-dashed border-white/35 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#d7cfbb]">
                        Focus pressure
                      </p>
                      <p className="mt-2 text-3xl font-display uppercase">67 / 100</p>
                    </div>
                    <Focus className="h-9 w-9 text-[#f0c443]" />
                  </div>
                  <Progress value={67} className="mt-4 h-3 bg-white/15" />
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-3">
              {dashboardCards.map((card) => (
                <Card
                  key={card.title}
                  className="border-2 border-[#111111] bg-[#f7f1e3] shadow-[6px_6px_0_#111111]"
                >
                  <CardContent className="p-5">
                    <p className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-[#5b5547]">
                      {card.tag}
                    </p>
                    <p className="mt-3 font-display text-[2.5rem] uppercase leading-none text-[#111111]">
                      {card.value}
                    </p>
                    <h4 className="mt-3 font-sans text-base font-semibold text-[#24201a]">
                      {card.title}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-[#534b3f]">{card.subtitle}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[0.72fr_1.28fr]">
          <Card className="border-2 border-[#111111] bg-[#f7f1e3] shadow-[8px_8px_0_#111111]">
            <CardContent className="space-y-6 p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#5b5547]">
                    Pocket mode
                  </p>
                  <h3 className="mt-2 font-display text-3xl uppercase text-[#111111]">
                    Mobile rhythm
                  </h3>
                </div>
                <Button
                  variant="outline"
                  onClick={() => placeholderFeature("Mobile routine builder")}
                  className="rounded-full border-2 border-[#111111] bg-[#fbf7ed] shadow-[4px_4px_0_#111111] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                >
                  Preview flow
                </Button>
              </div>

              <div className="rounded-[1.75rem] border-2 border-[#111111] bg-[#efe4d2] p-3 shadow-[6px_6px_0_#111111]">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663560501049/LFEKxDbHyJMwohauqrdspw/analog-athlete-mobile-art-SZ2muZDUMmFrum7mUwB65t.webp"
                  alt="Analog Athlete mobile planner art"
                  className="mx-auto w-full max-w-[22rem] rounded-[1.3rem] object-cover"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                {metricPanels.map((panel) => {
                  const Icon = panel.icon;
                  return (
                    <div
                      key={panel.title}
                      className="flex items-center gap-4 rounded-[1.2rem] border-2 border-[#111111] bg-[#fbf7ed] p-4 shadow-[4px_4px_0_#111111]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#111111] bg-[#123c35] text-[#f7f1e3]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-[#5b5547]">
                          {panel.title}
                        </p>
                        <p className="mt-1 font-display text-3xl uppercase text-[#111111]">
                          {panel.value}
                          <span className="ml-1 text-base">{panel.unit}</span>
                        </p>
                        <p className="text-sm text-[#51493e]">{panel.note}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-5">
            <Card className="overflow-hidden border-2 border-[#111111] bg-[#f6efdf] shadow-[8px_8px_0_#111111]">
              <CardContent className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr] p-0">
                <div className="border-b-2 border-[#111111] p-6 lg:border-b-0 lg:border-r-2">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#5b5547]">
                        Operations board
                      </p>
                      <h3 className="mt-2 font-display text-3xl uppercase text-[#111111]">
                        Week at a glance
                      </h3>
                    </div>
                    <CalendarRange className="h-6 w-6 text-[#cb5a2d]" />
                  </div>

                  <div className="mt-6 overflow-hidden rounded-[1.4rem] border-2 border-[#111111] bg-[#fbf7ed]">
                    <div className="grid grid-cols-[0.65fr_1fr_1fr_0.55fr] border-b-2 border-[#111111] bg-[#111111] px-4 py-3 text-[0.72rem] font-mono uppercase tracking-[0.22em] text-[#f7f1e3]">
                      <span>Day</span>
                      <span>Training</span>
                      <span>Productivity</span>
                      <span className="text-right">Score</span>
                    </div>
                    {weeklyLog.map((row, index) => (
                      <div
                        key={row.day}
                        className={`grid grid-cols-[0.65fr_1fr_1fr_0.55fr] items-center px-4 py-4 ${
                          index !== weeklyLog.length - 1 ? "border-b border-black/10" : ""
                        }`}
                      >
                        <span className="font-display text-xl uppercase text-[#111111]">{row.day}</span>
                        <span className="text-sm font-semibold text-[#2f2b25]">{row.training}</span>
                        <span className="text-sm text-[#544d40]">{row.productivity}</span>
                        <span className="text-right font-display text-2xl text-[#123c35]">{row.score}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 bg-[#ece2cf] p-6">
                  <div className="rounded-[1.35rem] border-2 border-[#111111] bg-[#f7f1e3] p-4 shadow-[4px_4px_0_#111111]">
                    <p className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-[#5b5547]">
                      Recovery balance
                    </p>
                    <p className="mt-2 font-display text-[3rem] uppercase leading-none text-[#111111]">
                      82
                    </p>
                    <Progress value={82} className="mt-4 h-3 bg-[#ddd2bd]" />
                    <p className="mt-3 text-sm leading-6 text-[#50473a]">
                      Stable sleep and hydration are keeping output sustainable.
                    </p>
                  </div>

                  <div className="rounded-[1.35rem] border-2 border-[#111111] bg-[#123c35] p-4 text-[#f5f0e7] shadow-[4px_4px_0_#111111]">
                    <p className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-[#d8cfbd]">
                      Current mode
                    </p>
                    <p className="mt-2 font-display text-3xl uppercase">Deep work after movement</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-[#ede4d0]">
                      <Clock3 className="h-4 w-4" />
                      35-minute sprint queued after cooldown
                    </div>
                  </div>

                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663560501049/LFEKxDbHyJMwohauqrdspw/analog-athlete-dashboard-art-XVWvxKoTq8c9QaFNhiewAK.webp"
                    alt="Analog Athlete dashboard-inspired artwork"
                    className="w-full rounded-[1.35rem] border-2 border-[#111111] bg-[#f7f1e3] object-cover shadow-[4px_4px_0_#111111]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#111111] bg-[#f7f1e3] shadow-[8px_8px_0_#111111]">
              <CardContent className="grid gap-5 p-6 lg:grid-cols-[0.95fr_1.05fr]">
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#5b5547]">
                    Habit calibration
                  </p>
                  <h3 className="mt-2 font-display text-3xl uppercase text-[#111111]">
                    Consistency matrix
                  </h3>
                  <p className="mt-3 max-w-lg text-base leading-7 text-[#40392e]">
                    One glance shows whether your training and focus routines are moving in sync or slipping out of rhythm.
                  </p>

                  <div className="mt-6 space-y-3">
                    {habitRows.map((row) => (
                      <div key={row.label} className="grid grid-cols-[88px_1fr] items-center gap-3">
                        <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#4c453a]">
                          {row.label}
                        </span>
                        <div className="grid grid-cols-7 gap-2">
                          {row.cells.map((active, idx) => (
                            <div
                              key={`${row.label}-${idx}`}
                              className={`flex h-10 items-center justify-center rounded-[0.8rem] border-2 border-[#111111] bg-[#fbf7ed] ${
                                active ? row.tone : "bg-transparent"
                              }`}
                            >
                              {active ? (
                                <CheckCircle2 className="h-4 w-4 text-[#f7f1e3]" />
                              ) : (
                                <div className="h-3 w-3 rounded-full border border-black/30" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.4rem] border-2 border-[#111111] bg-[#efe4d2] p-5 shadow-[4px_4px_0_#111111]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#5b5547]">
                        Strategic modules
                      </p>
                      <h4 className="mt-2 font-display text-2xl uppercase text-[#111111]">
                        What makes the system work
                      </h4>
                    </div>
                    <LayoutGrid className="h-5 w-5 text-[#123c35]" />
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      {
                        title: "Training planning",
                        desc: "Intervals, strength blocks, and recovery arranged as one weekly board.",
                        icon: Trophy,
                      },
                      {
                        title: "Focus architecture",
                        desc: "Work sessions tied to physiological energy instead of random notifications.",
                        icon: NotebookPen,
                      },
                      {
                        title: "Daily calibration",
                        desc: "Scores, checklists, and sleep markers keep performance visible and actionable.",
                        icon: Goal,
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.title}
                          onClick={() => placeholderFeature(item.title)}
                          className="group flex w-full items-start gap-4 rounded-[1.15rem] border-2 border-[#111111] bg-[#fbf7ed] p-4 text-left shadow-[4px_4px_0_#111111] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#111111] bg-[#cb5a2d] text-[#f7f1e3]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-sans text-base font-semibold text-[#1f1b17]">
                              {item.title}
                            </p>
                            <p className="mt-1 text-sm leading-6 text-[#564f43]">{item.desc}</p>
                          </div>
                          <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-[#111111] transition group-hover:translate-x-1" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-[#111111] bg-[#f1e7d6]">
        <div className="container flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl uppercase text-[#111111]">Analog Athlete</p>
            <p className="text-sm text-[#554e42]">
              Neo-Retro frontend concept for a hybrid fitness and productivity workflow.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => placeholderFeature("Insights archive")}
              className="rounded-full border-2 border-[#111111] bg-[#fbf7ed] shadow-[4px_4px_0_#111111] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            >
              Insights archive
            </Button>
            <Button
              onClick={() => placeholderFeature("Build routine")}
              className="rounded-full border-2 border-[#111111] bg-[#123c35] text-[#f6f1e7] shadow-[4px_4px_0_#111111] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            >
              Build routine
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
