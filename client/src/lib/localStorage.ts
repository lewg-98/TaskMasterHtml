import { type Task } from "@shared/schema";

// Key for storing tasks in localStorage
const TASKS_STORAGE_KEY = "savedTasks";

/**
 * Save tasks to localStorage
 */
export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Load tasks from localStorage
 */
export function loadTasks(): Task[] {
  const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
  return savedTasks ? JSON.parse(savedTasks) : [];
}
