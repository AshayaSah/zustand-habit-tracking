import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Create the habit store
const useHabitStore = create(
  devtools(
    persist(
      (set) => ({
        habits: [],
        isLoading: false,
        error: null,
        addHabit: (name, frequency) =>
          set((state) => ({
            habits: [
              ...state.habits,
              {
                id: Date.now().toString(),
                name,
                frequency,
                completedDates: [],
                createdAt: new Date().toISOString(),
              },
            ],
          })),
        removeHabit: (id) =>
          set((state) => ({
            habits: state.habits.filter((habit) => habit.id !== id),
          })),
        toggleHabit: (id, date) =>
          set((state) => ({
            habits: state.habits.map((habit) =>
              habit.id === id
                ? {
                    ...habit,
                    completedDates: habit.completedDates.includes(date)
                      ? habit.completedDates.filter((d) => d !== date)
                      : [...habit.completedDates, date],
                  }
                : habit
            ),
          })),
        fetchHabits: async () => {
          set({ isLoading: true });
          try {
            // Simulating an API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const mockHabits = [
              {
                id: "1",
                name: "Read",
                frequency: "daily",
                completedDates: [],
                createdAt: new Date().toISOString(),
              },
              {
                id: "2",
                name: "Exercise",
                frequency: "daily",
                completedDates: [],
                createdAt: new Date().toISOString(),
              },
            ];
            set({ habits: mockHabits, isLoading: false });
          } catch (error) {
            set({ error: "Failed to fetch habits", isLoading: false });
          }
        },
      }),
      {
        name: "habits-local", // This will use 'habits-local' as the key in localStorage
        getStorage: () => localStorage, // Use localStorage for persistence
      }
    )
  )
);

export default useHabitStore;
