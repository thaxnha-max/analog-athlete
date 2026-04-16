/**
 * FocusLogger Component
 * 
 * Allows users to log focus sessions (work blocks) with productivity metrics.
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
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { useWorkoutData } from "@/hooks/useWorkoutData";
import { Focus, X } from "lucide-react";

type FocusType = "deep work" | "planning" | "writing" | "ops review" | "design";

const FOCUS_TYPES: { value: FocusType; label: string }[] = [
  { value: "deep work", label: "Deep Work" },
  { value: "planning", label: "Planning" },
  { value: "writing", label: "Writing" },
  { value: "ops review", label: "Ops Review" },
  { value: "design", label: "Design" },
];

interface FocusLoggerProps {
  onClose?: () => void;
  date?: string;
}

export function FocusLogger({ onClose, date }: FocusLoggerProps) {
  const { addFocus } = useWorkoutData();
  const [formData, setFormData] = useState({
    type: "deep work" as FocusType,
    title: "",
    duration: 45,
    focusScore: 75,
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const today = date || new Date().toISOString().split("T")[0];

      addFocus({
        date: today,
        type: formData.type,
        title: formData.title || `${formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} session`,
        duration: formData.duration,
        focusScore: formData.focusScore,
        notes: formData.notes,
        completed: true,
      });

      toast.success("Focus session logged successfully!");
      setFormData({
        type: "deep work",
        title: "",
        duration: 45,
        focusScore: 75,
        notes: "",
      });

      if (onClose) {
        onClose();
      }
    } catch (error) {
      toast.error("Failed to log focus session");
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
            <Focus className="h-5 w-5 text-[#123c35]" />
            <CardTitle className="font-display text-2xl uppercase tracking-[0.05em]">
              Log Focus Session
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
          {/* Focus Type */}
          <div className="space-y-2">
            <Label htmlFor="focus-type" className="font-display text-sm uppercase">
              Focus Type
            </Label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value as FocusType })
              }
            >
              <SelectTrigger
                id="focus-type"
                className="rounded-[0.9rem] border-2 border-[#111111] bg-white text-[#111111]"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FOCUS_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="focus-title" className="font-display text-sm uppercase">
              Title (Optional)
            </Label>
            <Input
              id="focus-title"
              placeholder="e.g., Product roadmap planning"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="rounded-[0.9rem] border-2 border-[#111111] bg-white text-[#111111]"
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="focus-duration" className="font-display text-sm uppercase">
              Duration (minutes)
            </Label>
            <Input
              id="focus-duration"
              type="number"
              min="5"
              step="5"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
              className="rounded-[0.9rem] border-2 border-[#111111] bg-white text-[#111111]"
            />
          </div>

          {/* Focus Score */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="focus-score" className="font-display text-sm uppercase">
                Focus Quality Score
              </Label>
              <span className="font-display text-2xl text-[#123c35]">
                {formData.focusScore}%
              </span>
            </div>
            <Slider
              id="focus-score"
              min={0}
              max={100}
              step={5}
              value={[formData.focusScore]}
              onValueChange={(value) =>
                setFormData({ ...formData, focusScore: value[0] })
              }
              className="w-full"
            />
            <p className="text-xs text-[#5b5547]">
              How focused and productive were you during this session?
            </p>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="focus-notes" className="font-display text-sm uppercase">
              Notes - Optional
            </Label>
            <Textarea
              id="focus-notes"
              placeholder="What did you accomplish? Any distractions?"
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
            className="w-full rounded-full border-2 border-[#111111] bg-[#123c35] px-5 text-[#f4f0e6] shadow-[4px_4px_0_#111111] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:opacity-50"
          >
            {isSubmitting ? "Logging..." : "Log Focus Session"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
