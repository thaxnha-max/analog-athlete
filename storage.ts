/**
 * Analog Athlete Storage Layer
 * 
 * Manages persistent workout and productivity data using browser localStorage.
 * Provides type-safe access to user data with automatic serialization/deserialization.
 */

// Data Models
export interface WorkoutSession {
  id: string;
  date: string; // ISO date string
  type: "intervals" | "strength" | "recovery" | "tempo" | "upper" | "lower";
  title: string;
  duration: number; // minutes
  distance?: number; // km
  pace?: string; // e.g., "5:45/km"
  calories?: number;
  notes: string;
  completed: boolean;
}

export interface FocusSession {
  id: string;
  date: string; // ISO date string
  type: "deep work" | "planning" | "writing" | "ops review" | "design";
  title: string;
  duration: number; // minutes
  focusScore: number; // 0-100
  notes: string;
  completed: boolean;
}

export interface DailyMetrics {
  date: string; // ISO date string
  focusScore: number; // 0-100
  recoveryIndex: number; // 0-100
  hydration: number; // 0-100
  sleepHours: number;
  streak: number;
  momentum: number;
}

export interface UserProfile {
  focusTarget: number; // daily focus blocks target
  recoveryTarget: number; // hours of sleep target
  hydrationTarget: number; // % hydration goal
}

export interface AthleteData {
  profile: UserProfile;
  workouts: WorkoutSession[];
  focusSessions: FocusSession[];
  dailyMetrics: DailyMetrics[];
  lastUpdated: string;
}

// Storage Keys
const STORAGE_KEY = "analog-athlete-data";
const PROFILE_KEY = "analog-athlete-profile";

// Default Data
const DEFAULT_PROFILE: UserProfile = {
  focusTarget: 3,
  recoveryTarget: 8,
  hydrationTarget: 80,
};

const DEFAULT_DATA: AthleteData = {
  profile: DEFAULT_PROFILE,
  workouts: [],
  focusSessions: [],
  dailyMetrics: [],
  lastUpdated: new Date().toISOString(),
};

/**
 * Initialize or retrieve athlete data from localStorage
 */
export function initializeData(): AthleteData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn("Failed to load data from localStorage:", error);
  }
  return { ...DEFAULT_DATA };
}

/**
 * Save athlete data to localStorage
 */
export function saveData(data: AthleteData): void {
  try {
    data.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save data to localStorage:", error);
  }
}

/**
 * Add a new workout session
 */
export function addWorkoutSession(session: Omit<WorkoutSession, "id">): WorkoutSession {
  const data = initializeData();
  const newSession: WorkoutSession = {
    ...session,
    id: `workout-${Date.now()}`,
  };
  data.workouts.push(newSession);
  saveData(data);
  return newSession;
}

/**
 * Update an existing workout session
 */
export function updateWorkoutSession(id: string, updates: Partial<WorkoutSession>): void {
  const data = initializeData();
  const index = data.workouts.findIndex((w) => w.id === id);
  if (index !== -1) {
    data.workouts[index] = { ...data.workouts[index], ...updates };
    saveData(data);
  }
}

/**
 * Delete a workout session
 */
export function deleteWorkoutSession(id: string): void {
  const data = initializeData();
  data.workouts = data.workouts.filter((w) => w.id !== id);
  saveData(data);
}

/**
 * Get all workouts for a specific date
 */
export function getWorkoutsByDate(date: string): WorkoutSession[] {
  const data = initializeData();
  return data.workouts.filter((w) => w.date === date);
}

/**
 * Add a new focus session
 */
export function addFocusSession(session: Omit<FocusSession, "id">): FocusSession {
  const data = initializeData();
  const newSession: FocusSession = {
    ...session,
    id: `focus-${Date.now()}`,
  };
  data.focusSessions.push(newSession);
  saveData(data);
  return newSession;
}

/**
 * Update an existing focus session
 */
export function updateFocusSession(id: string, updates: Partial<FocusSession>): void {
  const data = initializeData();
  const index = data.focusSessions.findIndex((f) => f.id === id);
  if (index !== -1) {
    data.focusSessions[index] = { ...data.focusSessions[index], ...updates };
    saveData(data);
  }
}

/**
 * Delete a focus session
 */
export function deleteFocusSession(id: string): void {
  const data = initializeData();
  data.focusSessions = data.focusSessions.filter((f) => f.id !== id);
  saveData(data);
}

/**
 * Get all focus sessions for a specific date
 */
export function getFocusSessionsByDate(date: string): FocusSession[] {
  const data = initializeData();
  return data.focusSessions.filter((f) => f.date === date);
}

/**
 * Record or update daily metrics
 */
export function recordDailyMetrics(metrics: Omit<DailyMetrics, "date">, date?: string): void {
  const data = initializeData();
  const targetDate = date || new Date().toISOString().split("T")[0];
  const existingIndex = data.dailyMetrics.findIndex((m) => m.date === targetDate);

  if (existingIndex !== -1) {
    data.dailyMetrics[existingIndex] = { ...data.dailyMetrics[existingIndex], ...metrics };
  } else {
    data.dailyMetrics.push({ date: targetDate, ...metrics });
  }

  saveData(data);
}

/**
 * Get metrics for a specific date
 */
export function getDailyMetrics(date?: string): DailyMetrics | null {
  const data = initializeData();
  const targetDate = date || new Date().toISOString().split("T")[0];
  return data.dailyMetrics.find((m) => m.date === targetDate) || null;
}

/**
 * Get metrics for a date range
 */
export function getMetricsRange(startDate: string, endDate: string): DailyMetrics[] {
  const data = initializeData();
  return data.dailyMetrics.filter((m) => m.date >= startDate && m.date <= endDate);
}

/**
 * Update user profile settings
 */
export function updateProfile(updates: Partial<UserProfile>): void {
  const data = initializeData();
  data.profile = { ...data.profile, ...updates };
  saveData(data);
}

/**
 * Get user profile
 */
export function getProfile(): UserProfile {
  const data = initializeData();
  return data.profile;
}

/**
 * Calculate current streak
 */
export function calculateStreak(): number {
  const data = initializeData();
  if (data.dailyMetrics.length === 0) return 0;

  const sortedMetrics = [...data.dailyMetrics].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < sortedMetrics.length; i++) {
    const metricDate = new Date(sortedMetrics[i].date);
    metricDate.setHours(0, 0, 0, 0);

    const expectedDate = new Date(today);
    expectedDate.setDate(expectedDate.getDate() - i);

    if (metricDate.getTime() === expectedDate.getTime()) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Get summary stats for the week
 */
export function getWeeklySummary(): {
  totalWorkouts: number;
  totalFocusSessions: number;
  averageFocusScore: number;
  averageRecoveryIndex: number;
} {
  const data = initializeData();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const sevenDaysAgoStr = sevenDaysAgo.toISOString().split("T")[0];

  const recentWorkouts = data.workouts.filter((w) => w.date >= sevenDaysAgoStr && w.completed);
  const recentFocus = data.focusSessions.filter((f) => f.date >= sevenDaysAgoStr && f.completed);
  const recentMetrics = data.dailyMetrics.filter((m) => m.date >= sevenDaysAgoStr);

  const avgFocusScore =
    recentMetrics.length > 0
      ? Math.round(recentMetrics.reduce((sum, m) => sum + m.focusScore, 0) / recentMetrics.length)
      : 0;

  const avgRecovery =
    recentMetrics.length > 0
      ? Math.round(recentMetrics.reduce((sum, m) => sum + m.recoveryIndex, 0) / recentMetrics.length)
      : 0;

  return {
    totalWorkouts: recentWorkouts.length,
    totalFocusSessions: recentFocus.length,
    averageFocusScore: avgFocusScore,
    averageRecoveryIndex: avgRecovery,
  };
}

/**
 * Clear all data (use with caution)
 */
export function clearAllData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear data:", error);
  }
}

/**
 * Export data as JSON for backup
 */
export function exportData(): string {
  const data = initializeData();
  return JSON.stringify(data, null, 2);
}

/**
 * Import data from JSON
 */
export function importData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString) as AthleteData;
    // Validate structure
    if (
      data.profile &&
      Array.isArray(data.workouts) &&
      Array.isArray(data.focusSessions) &&
      Array.isArray(data.dailyMetrics)
    ) {
      saveData(data);
      return true;
    }
  } catch (error) {
    console.error("Failed to import data:", error);
  }
  return false;
}
