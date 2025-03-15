import { type Task } from "@shared/schema";

// Key for storing tasks in localStorage
const TASKS_STORAGE_KEY = "savedTasks";

/**
 * Save tasks to localStorage
 * @param tasks Array of tasks to save
 * @description Persists the current state of tasks to browser storage
 * @example
 * saveTasks([{ id: 1, title: "Example task", completed: false }]);
 */
export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Load tasks from localStorage
 * @returns Array of saved tasks or empty array if none found
 * @description Retrieves previously saved tasks from browser storage
 * @example
 * const savedTasks = loadTasks();
 */
export function loadTasks(): Task[] {
  const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
  return savedTasks ? JSON.parse(savedTasks) : [];
}