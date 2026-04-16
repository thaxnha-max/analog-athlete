/**
 * FocusHistory Component
 * 
 * Displays logged focus sessions with quality scores and productivity metrics.
 */

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useWorkoutData } from "@/hooks/useWorkoutData";
import { FocusSession } from "@/lib/storage";
import { Trash2, Edit2, Brain, Clock } from "lucide-react";

interface FocusHistoryProps {
  date?: string;
}

export function FocusHistory({ date }: FocusHistoryProps) {
  const { getFocusForDate, deleteFocus } = useWorkoutData();
  const [sessions, setSessions] = useState<FocusSession[]>([]);

  useEffect(() => {
    const today = date || new Date().toISOString().split("T")[0];
    const data = getFocusForDate(today);
    setSessions(data);
  }, [date, getFocusForDate]);

  const handleDelete = (id: string) => {
    deleteFocus(id);
    setSessions(sessions.filter((s) => s.id !== id));
    toast.success("Focus session deleted");
  };

  const averageFocusScore = sessions.length > 0
    ? Math.round(sessions.reduce((sum, s) => sum + s.focusScore, 0) / sessions.length)
    : 0;

  if (sessions.length === 0) {
    return (
      <Card className="analog-panel border-2 border-[#111111] bg-[#fbf7ed] shadow-[8px_8px_0_#111111]">
        <CardContent className="flex flex-col items-center justify-center gap-3 py-8 text-center">
          <Brain className="h-8 w-8 text-[#5b5547]/40" />
          <p className="text-sm text-[#5b5547]">No focus sessions logged yet for this date.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Average Score */}
      <Card className="analog-panel border-2 border-[#111111] bg-white shadow-[6px_6px_0_#111111]">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#5b5547]">
                Average Focus Quality
              </p>
              <p className="mt-2 font-display text-3xl text-[#123c35]">
                {averageFocusScore}%
              </p>
            </div>
            <Progress value={averageFocusScore} className="h-3 w-32" />
          </div>
        </CardContent>
      </Card>

      {/* Sessions List */}
      <div className="space-y-3">
        {sessions.map((session) => (
          <Card
            key={session.id}
            className="analog-panel border-2 border-[#111111] bg-white shadow-[6px_6px_0_#111111] transition hover:shadow-[8px_8px_0_#111111]"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge className="rounded-full border border-[#111111] bg-[#123c35] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white">
                      {session.type}
                    </Badge>
                    {session.completed && (
                      <Badge className="rounded-full border border-[#111111] bg-[#cb5a2d] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white">
                        Completed
                      </Badge>
                    )}
                  </div>

                  <h4 className="mt-2 font-display text-lg uppercase text-[#111111]">
                    {session.title}
                  </h4>

                  <div className="mt-3 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm text-[#403a31]">
                      <Clock className="h-4 w-4" />
                      <span>{session.duration} min</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#403a31]">
                      <Brain className="h-4 w-4" />
                      <span className="font-semibold">{session.focusScore}% focus</span>
                    </div>
                  </div>

                  {/* Focus Score Progress Bar */}
                  <div className="mt-3">
                    <Progress value={session.focusScore} className="h-2" />
                  </div>

                  {session.notes && (
                    <p className="mt-3 text-sm text-[#5b5547]">{session.notes}</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-lg border border-[#111111] hover:bg-[#f0f0f0]"
                    onClick={() => toast("Edit feature coming soon")}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-lg border border-[#123c35] text-[#123c35] hover:bg-[#123c35]/10"
                    onClick={() => handleDelete(session.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
