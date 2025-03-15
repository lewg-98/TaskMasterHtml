import { TaskList } from "@/components/task-list";
import { TaskForm } from "@/components/task-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 responsive-padding">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              Tasks
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage your daily tasks and stay organized
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <TaskForm />
            <TaskList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}