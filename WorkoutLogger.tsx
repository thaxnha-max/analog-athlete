/**
 * WorkoutLogger Component
 * 
 * Allows users to log new workout sessions with persistent storage.
 * Integrates with the Neo-Retro design system.
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useWorkoutData } from "@/hooks/useWorkoutData";
import { Dumbbell, X } from "lucide-react";

type WorkoutType = "intervals" | "strength" | "recovery" | "tempo" | "upper" | "lower";

const WORKOUT_TYPES: { value: WorkoutType; label: string }[] = [
  { value: "intervals", label: "Intervals" },
  { value: "strength", label: "Strength" },
  { value: "recovery", label: "Recovery" },
  { value: "tempo", label: "Tempo" },
  { value: "upper", label: "Upper body" },
  { value: "lower", label: "Lower body" },
];

interface WorkoutLoggerProps {
  onClose?: () => void;
  date?: string;
}

export function WorkoutLogger({ onClose, date }: WorkoutLoggerProps) {
  const { addWorkout } = useWorkoutData();
  const [formData, setFormData] = useState({
    type: "intervals" as WorkoutType,
    title: "",
    duration: 30,
    distance: "",
    pace: "",
    calories: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const today = date || new Date().toISOString().split("T")[0];

      addWorkout({
        date: today,
        type: formData.type,
        title: formData.title || `${formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} session`,
        duration: formData.duration,
        distance: formData.distance ? parseFloat(formData.distance) : undefined,
        pace: formData.pace || undefined,
        calories: formData.calories ? parseInt(formData.calories) : undefined,
        notes: formData.notes,
        completed: true,
      });

      toast.success("Workout logged successfully!");
      setFormData({
        type: "intervals",
        title: "",
        duration: 30,
        distance: "",
        pace: "",
        calories: "",
        notes: "",
      });

      if (onClose) {
        onClose();
      }
    } catch (error) {
      toast.error("Failed to log workout");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="analog-panel border-2 border-[#111111] bg-[#f6efdf] shadow-[8px_8px_0_#111111]">
      <CardHeader className="border-b-2 border-[#111111] pb-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Dumbbell className="h-5 w-5 text-[#cb5a2d]" />
            <CardTitle className="font-display text-2xl uppercase tracking-[0.05em]">
              Log Workout
            </CardTitle>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-black/5 transition"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Workout Type */}
          <div className="space-y-2">
            <Label htmlFor="type" className="font-display text-sm uppercase">
              Workout Type
            </Label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value as WorkoutType })
              }
            >
              <SelectTrigger
                id="type"
                className="rounded-[0.9rem] border-2 border-[#111111] bg-white text-[#111111]"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {WORKOUT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="font-display text-sm uppercase">
              Title (Optional)
            </Label>
            <Input
              id="title"
              placeholder="e.g., Morning tempo run"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="rounded-[0.9rem] border-2 border-[#111111] bg-white text-[#111111]"
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration" className="font-display text-sm uppercase">
              Duration (minutes)
            </Label>
            <Input
              id="duration"
              type="number"
              min="1"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
              className="rounded-[0.9rem] border-2 border-[#111111] bg-white text-[#111111]"
            />
          </div>

          {/* Distance */}
          <div className="space-y-2">
            <Label htmlFor="distance" className="font-display text-sm uppercase">
              Distance (km) - Optional
            </Label>
            <Input
              id="distance"
              type="number"
              step="0.1"
              placeholder="5.8"
              value={formData.distance}
              onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
              className="rounded-[0.9rem] border-2 border-[#111111] bg-white text-[#111111]"
            />
          </div>

          {/* Pace */}
          <div className="space-y-2">
            <Label htmlFor="pace" className="font-display text-sm uppercase">
              Pace (e.g., 5:45/km) - Optional
            </Label>
            <Input
              id="pace"
              placeholder="5:45/km"
              value={formData.pace}
              onChange={(e) => setFormData({ ...formData, pace: e.target.value })}
              className="rounded-[0.9rem] border-2 border-[#111111] bg-white text-[#111111]"
            />
          </div>

          {/* Calories */}
          <div className="space-y-2">
            <Label htmlFor="calories" className="font-display text-sm uppercase">
              Calories - Optional
            </Label>
            <Input
              id="calories"
              type="number"
              placeholder="432"
              value={formData.calories}
              onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
              className="rounded-[0.9rem] border-2 border-[#111111] bg-white text-[#111111]"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="font-display text-sm uppercase">
              Notes - Optional
            </Label>
            <Textarea
              id="notes"
              placeholder="How did it feel? Any observations?"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="rounded-[0.9rem] border-2 border-[#111111] bg-white text-[#111111]"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full border-2 border-[#111111] bg-[#cb5a2d] px-5 text-[#fff8ef] shadow-[4px_4px_0_#111111] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:opacity-50"
          >
            {isSubmitting ? "Logging..." : "Log Workout"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
