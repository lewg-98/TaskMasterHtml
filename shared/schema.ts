/**
 * Data Schema Definition
 * This file defines the core data structures and validation rules for the application.
 */

import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * Task Table Schema
 * Defines the structure for storing tasks in the database
 */
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/**
 * Task Creation Schema
 * Validates data when creating new tasks
 * - Requires a title between 1 and 100 characters
 */
export const insertTaskSchema = createInsertSchema(tasks)
  .pick({ title: true })
  .extend({
    title: z.string().min(1, "Task title is required").max(100, "Task title is too long"),
  });

/**
 * Task Update Schema
 * Validates data when updating existing tasks
 * - Title must be between 1 and 100 characters
 * - Completed must be a boolean
 */
export const updateTaskSchema = z.object({
  title: z.string().min(1, "Task title is required").max(100, "Task title is too long"),
  completed: z.boolean(),
});

// Type definitions for use throughout the application
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;
export type Task = typeof tasks.$inferSelect;