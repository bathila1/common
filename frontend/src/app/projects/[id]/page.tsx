import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/store";
import { TaskBoard } from "@/components/TaskBoard";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = db.getProject(id);

  if (!project) {
    notFound();
  }

  const tasks = db.listTasks(id);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-700">
          ← All projects
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">{project.name}</h1>
        {project.description && (
          <p className="mt-1 text-sm text-zinc-500">{project.description}</p>
        )}
      </div>

      <TaskBoard projectId={project.id} initialTasks={tasks} />
    </div>
  );
}
