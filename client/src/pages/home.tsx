import { TaskList } from "@/components/task-list";
import { TaskForm } from "@/components/task-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tracking-tight">Tasks</CardTitle>
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
