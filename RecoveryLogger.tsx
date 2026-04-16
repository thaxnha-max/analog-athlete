/**
 * RecoveryLogger Component
 * 
 * Allows users to log daily recovery metrics including sleep, hydration, and mobility.
 * Integrates with the Neo-Retro design system.
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useWorkoutData } from "@/hooks/useWorkoutData";
import { Heart, X } from "lucide-react";

interface RecoveryLoggerProps {
  onClose?: () => void;
  date?: string;
}

export function RecoveryLogger({ onClose, date }: RecoveryLoggerProps) {
  const { recordMetrics } = useWorkoutData();
  const [formData, setFormData] = useState({
    sleepHours: 8,
    hydration: 75,
    recoveryIndex: 70,
    focusScore: 70,
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const targetDate = date || new Date().toISOString().split("T")[0];

      recordMetrics(
        {
          focusScore: formData.focusScore,
          recoveryIndex: formData.recoveryIndex,
          hydration: formData.hydration,
          sleepHours: formData.sleepHours,
          streak: 1,
          momentum: formData.recoveryIndex,
        },
        targetDate
      );

      toast.success("Recovery metrics logged successfully!");
      setFormData({
        sleepHours: 8,
        hydration: 75,
        recoveryIndex: 70,
        focusScore: 70,
        notes: "",
      });

      if (onClose) {
        onClose();
      }
    } catch (error) {
      toast.error("Failed to log recovery metrics");
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
            <Heart className="h-5 w-5 text-[#cb5a2d]" />
            <CardTitle className="font-display text-2xl uppercase tracking-[0.05em]">
              Log Recovery Metrics
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
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sleep Hours */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="sleep" className="font-display text-sm uppercase">
                Sleep Duration
              </Label>
              <span className="font-display text-2xl text-[#cb5a2d]">
                {formData.sleepHours.toFixed(1)}h
              </span>
            </div>
            <Slider
              id="sleep"
              min={0}
              max={12}
              step={0.5}
              value={[formData.sleepHours]}
              onValueChange={(value) =>
                setFormData({ ...formData, sleepHours: value[0] })
              }
              className="w-full"
            />
            <p className="text-xs text-[#5b5547]">How many hours did you sleep?</p>
          </div>

          {/* Hydration */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="hydration" className="font-display text-sm uppercase">
                Hydration Level
              </Label>
              <span className="font-display text-2xl text-[#123c35]">
                {formData.hydration}%
              </span>
            </div>
            <Slider
              id="hydration"
              min={0}
              max={100}
              step={5}
              value={[formData.hydration]}
              onValueChange={(value) =>
                setFormData({ ...formData, hydration: value[0] })
              }
              className="w-full"
            />
            <p className="text-xs text-[#5b5547]">How hydrated do you feel?</p>
          </div>

          {/* Recovery Index */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="recovery" className="font-display text-sm uppercase">
                Recovery Index
              </Label>
              <span className="font-display text-2xl text-[#f4b860]">
                {formData.recoveryIndex}%
              </span>
            </div>
            <Slider
              id="recovery"
              min={0}
              max={100}
              step={5}
              value={[formData.recoveryIndex]}
              onValueChange={(value) =>
                setFormData({ ...formData, recoveryIndex: value[0] })
              }
              className="w-full"
            />
            <p className="text-xs text-[#5b5547]">Overall recovery feeling (1-100)</p>
          </div>

          {/* Mobility/Readiness */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="readiness" className="font-display text-sm uppercase">
                Readiness for Training
              </Label>
              <span className="font-display text-2xl text-[#123c35]">
                {formData.focusScore}%
              </span>
            </div>
            <Slider
              id="readiness"
              min={0}
              max={100}
              step={5}
              value={[formData.focusScore]}
              onValueChange={(value) =>
                setFormData({ ...formData, focusScore: value[0] })
              }
              className="w-full"
            />
            <p className="text-xs text-[#5b5547]">How ready do you feel for training?</p>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="recovery-notes" className="font-display text-sm uppercase">
              Notes - Optional
            </Label>
            <Textarea
              id="recovery-notes"
              placeholder="Any soreness, injuries, or observations?"
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
            {isSubmitting ? "Logging..." : "Log Recovery Metrics"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
