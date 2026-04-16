/**
 * useWorkoutData Hook
 * 
 * Provides reactive access to workout and fitness data stored in localStorage.
 * Automatically syncs state across tabs and handles data mutations.
 */

import { useEffect, useState, useCallback } from "react";
import {
  AthleteData,
  WorkoutSession,
  FocusSession,
  DailyMetrics,
  UserProfile,
  initializeData,
  saveData,
  addWorkoutSession,
  updateWorkoutSession,
  deleteWorkoutSession,
  getWorkoutsByDate,
  addFocusSession,
  updateFocusSession,
  deleteFocusSession,
  getFocusSessionsByDate,
  recordDailyMetrics,
  getDailyMetrics,
  getMetricsRange,
  updateProfile,
  getProfile,
  calculateStreak,
  getWeeklySummary,
} from "@/lib/storage";

export function useWorkoutData() {
  const [data, setData] = useState<AthleteData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize data on mount
  useEffect(() => {
    const initialData = initializeData();
    setData(initialData);
    setIsLoading(false);

    // Listen for storage changes from other tabs
    const handleStorageChange = () => {
      const updatedData = initializeData();
      setData(updatedData);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Workout operations
  const addWorkout = useCallback(
    (session: Omit<WorkoutSession, "id">) => {
      const newSession = addWorkoutSession(session);
      const updatedData = initializeData();
      setData(updatedData);
      return newSession;
    },
    []
  );

  const updateWorkout = useCallback((id: string, updates: Partial<WorkoutSession>) => {
    updateWorkoutSession(id, updates);
    const updatedData = initializeData();
    setData(updatedData);
  }, []);

  const deleteWorkout = useCallback((id: string) => {
    deleteWorkoutSession(id);
    const updatedData = initializeData();
    setData(updatedData);
  }, []);

  const getWorkoutsForDate = useCallback((date: string) => {
    return getWorkoutsByDate(date);
  }, []);

  // Focus session operations
  const addFocus = useCallback((session: Omit<FocusSession, "id">) => {
    const newSession = addFocusSession(session);
    const updatedData = initializeData();
    setData(updatedData);
    return newSession;
  }, []);

  const updateFocus = useCallback((id: string, updates: Partial<FocusSession>) => {
    updateFocusSession(id, updates);
    const updatedData = initializeData();
    setData(updatedData);
  }, []);

  const deleteFocus = useCallback((id: string) => {
    deleteFocusSession(id);
    const updatedData = initializeData();
    setData(updatedData);
  }, []);

  const getFocusForDate = useCallback((date: string) => {
    return getFocusSessionsByDate(date);
  }, []);

  // Metrics operations
  const recordMetrics = useCallback(
    (metrics: Omit<DailyMetrics, "date">, date?: string) => {
      recordDailyMetrics(metrics, date);
      const updatedData = initializeData();
      setData(updatedData);
    },
    []
  );

  const getMetricsForDate = useCallback((date?: string) => {
    return getDailyMetrics(date);
  }, []);

  const getMetricsForRange = useCallback((startDate: string, endDate: string) => {
    return getMetricsRange(startDate, endDate);
  }, []);

  // Profile operations
  const updateUserProfile = useCallback((updates: Partial<UserProfile>) => {
    updateProfile(updates);
    const updatedData = initializeData();
    setData(updatedData);
  }, []);

  const getUserProfile = useCallback(() => {
    return getProfile();
  }, []);

  // Analytics
  const getStreak = useCallback(() => {
    return calculateStreak();
  }, []);

  const getWeeklyStats = useCallback(() => {
    return getWeeklySummary();
  }, []);

  return {
    // State
    data,
    isLoading,

    // Workouts
    addWorkout,
    updateWorkout,
    deleteWorkout,
    getWorkoutsForDate,

    // Focus sessions
    addFocus,
    updateFocus,
    deleteFocus,
    getFocusForDate,

    // Metrics
    recordMetrics,
    getMetricsForDate,
    getMetricsForRange,

    // Profile
    updateUserProfile,
    getUserProfile,

    // Analytics
    getStreak,
    getWeeklyStats,
  };
}
