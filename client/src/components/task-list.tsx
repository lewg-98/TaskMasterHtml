import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { type Task } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { saveTasks, loadTasks } from "@/lib/localStorage";
import { useEffect } from "react";

type Filter = "all" | "active" | "completed";

export function TaskList() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<Filter>("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
    initialData: loadTasks,
  });

  useEffect(() => {
    if (tasks) {
      saveTasks(tasks);
    }
  }, [tasks]);

  const toggleMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: number; completed: boolean }) => {
      const res = await apiRequest("PATCH", `/api/tasks/${id}`, { completed });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update task status",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove task",
        variant: "destructive",
      });
    },
  });

  const editMutation = useMutation({
    mutationFn: async ({ id, title }: { id: number; title: string }) => {
      const res = await apiRequest("PATCH", `/api/tasks/${id}`, { title });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      setEditingId(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    },
  });

  const clearCompletedMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/tasks/clear-completed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to clear completed tasks",
        variant: "destructive",
      });
    },
  });

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditValue(task.title);
  };

  const handleEditSubmit = (id: number) => {
    if (editValue.trim()) {
      editMutation.mutate({ id, title: editValue.trim() });
    }
  };

  const filteredTasks = tasks?.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  if (isLoading) {
    return <div className="text-muted-foreground animate-pulse">Loading tasks...</div>;
  }

  if (!tasks?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No tasks yet. Create your first task above!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 justify-center">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "default" : "outline"}
          onClick={() => setFilter("active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "default" : "outline"}
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>
      </div>

      <div className="space-y-3">
        {filteredTasks?.map((task) => (
          <div
            key={task.id}
            className="task-item flex items-center gap-3 p-3 group"
          >
            <Checkbox
              checked={task.completed}
              disabled={toggleMutation.isPending}
              onCheckedChange={(checked) =>
                toggleMutation.mutate({ id: task.id, completed: !!checked })
              }
              className="transition-fast"
            />
            {editingId === task.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditSubmit(task.id);
                }}
                className="flex-1"
              >
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => handleEditSubmit(task.id)}
                  autoFocus
                  className="task-input"
                />
              </form>
            ) : (
              <>
                <span className={task.completed ? "task-completed flex-1" : "flex-1"}>
                  {task.title}
                  <span className="text-xs text-muted-foreground ml-2">
                    {new Date(task.createdAt).toLocaleDateString("en-GB")}
                  </span>
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="delete-button"
                  onClick={() => startEdit(task)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="delete-button"
              disabled={deleteMutation.isPending}
              onClick={() => deleteMutation.mutate(task.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>

      {tasks.some((task) => task.completed) && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => clearCompletedMutation.mutate()}
            disabled={clearCompletedMutation.isPending}
          >
            Clear Completed Tasks
          </Button>
        </div>
      )}
    </div>
  );
}