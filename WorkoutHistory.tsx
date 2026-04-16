/**
 * WorkoutHistory Component
 * 
 * Displays logged workouts for a given date with edit and delete options.
 * Integrates with the Neo-Retro design system.
 */

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useWorkoutData } from "@/hooks/useWorkoutData";
import { WorkoutSession } from "@/lib/storage";
import { Trash2, Edit2, Footprints, Clock, Zap } from "lucide-react";

interface WorkoutHistoryProps {
  date?: string;
}

export function WorkoutHistory({ date }: WorkoutHistoryProps) {
  const { getWorkoutsForDate, deleteWorkout } = useWorkoutData();
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);

  useEffect(() => {
    const today = date || new Date().toISOString().split("T")[0];
    const data = getWorkoutsForDate(today);
    setWorkouts(data);
  }, [date, getWorkoutsForDate]);

  const handleDelete = (id: string) => {
    deleteWorkout(id);
    setWorkouts(workouts.filter((w) => w.id !== id));
    toast.success("Workout deleted");
  };

  if (workouts.length === 0) {
    return (
      <Card className="analog-panel border-2 border-[#111111] bg-[#fbf7ed] shadow-[8px_8px_0_#111111]">
        <CardContent className="flex flex-col items-center justify-center gap-3 py-8 text-center">
          <Footprints className="h-8 w-8 text-[#5b5547]/40" />
          <p className="text-sm text-[#5b5547]">No workouts logged yet for this date.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {workouts.map((workout) => (
        <Card
          key={workout.id}
          className="analog-panel border-2 border-[#111111] bg-white shadow-[6px_6px_0_#111111] transition hover:shadow-[8px_8px_0_#111111]"
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Badge className="rounded-full border border-[#111111] bg-[#cb5a2d] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white">
                    {workout.type}
                  </Badge>
                  {workout.completed && (
                    <Badge className="rounded-full border border-[#111111] bg-[#123c35] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white">
                      Completed
                    </Badge>
                  )}
                </div>

                <h4 className="mt-2 font-display text-lg uppercase text-[#111111]">
                  {workout.title}
                </h4>

                <div className="mt-3 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-[#403a31]">
                    <Clock className="h-4 w-4" />
                    <span>{workout.duration} min</span>
                  </div>

                  {workout.distance && (
                    <div className="flex items-center gap-2 text-sm text-[#403a31]">
                      <Footprints className="h-4 w-4" />
                      <span>{workout.distance} km</span>
                    </div>
                  )}

                  {workout.pace && (
                    <div className="flex items-center gap-2 text-sm text-[#403a31]">
                      <Zap className="h-4 w-4" />
                      <span>{workout.pace}</span>
                    </div>
                  )}

                  {workout.calories && (
                    <div className="flex items-center gap-2 text-sm text-[#403a31]">
                      <Zap className="h-4 w-4" />
                      <span>{workout.calories} cal</span>
                    </div>
                  )}
                </div>

                {workout.notes && (
                  <p className="mt-3 text-sm text-[#5b5547]">{workout.notes}</p>
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
                  className="rounded-lg border border-[#cb5a2d] text-[#cb5a2d] hover:bg-[#cb5a2d]/10"
                  onClick={() => handleDelete(workout.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
