/**
 * Storage Implementation
 * This file implements the storage interface for managing tasks.
 * Currently uses in-memory storage with localStorage backup.
 */

import { tasks, type Task, type InsertTask, type UpdateTask } from "@shared/schema";

/**
 * Storage Interface
 * Defines the contract for task storage implementations
 */
export interface IStorage {
  getTasks(): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, task: Partial<UpdateTask>): Promise<Task | undefined>;
  deleteTask(id: number): Promise<boolean>;
  clearCompletedTasks(): Promise<void>;
}

/**
 * In-Memory Storage Implementation
 * Provides a simple, fast storage solution using Map
 */
export class MemStorage implements IStorage {
  private tasks: Map<number, Task>;
  private currentId: number;

  constructor() {
    this.tasks = new Map();
    this.currentId = 1;
  }

  /**
   * Retrieve all tasks
   * @returns Promise<Task[]> Array of all tasks
   */
  async getTasks(): Promise<Task[]> {
    return Array.from(this.tasks.values());
  }

  /**
   * Create a new task
   * @param insertTask Task data to insert
   * @returns Promise<Task> The created task with generated ID
   */
  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = this.currentId++;
    const task: Task = {
      ...insertTask,
      id,
      completed: false,
      createdAt: new Date(),
    };
    this.tasks.set(id, task);
    return task;
  }

  /**
   * Update an existing task
   * @param id Task ID to update
   * @param updateData New task data (partial)
   * @returns Promise<Task | undefined> Updated task or undefined if not found
   */
  async updateTask(id: number, updateData: Partial<UpdateTask>): Promise<Task | undefined> {
    const task = this.tasks.get(id);
    if (!task) return undefined;

    const updatedTask = { ...task, ...updateData };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  /**
   * Delete a task
   * @param id Task ID to delete
   * @returns Promise<boolean> True if task was deleted, false if not found
   */
  async deleteTask(id: number): Promise<boolean> {
    return this.tasks.delete(id);
  }

  /**
   * Remove all completed tasks
   * @returns Promise<void>
   */
  async clearCompletedTasks(): Promise<void> {
    for (const [id, task] of this.tasks.entries()) {
      if (task.completed) {
        this.tasks.delete(id);
      }
    }
  }
}

// Export a singleton instance of the storage
export const storage = new MemStorage();