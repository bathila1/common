import Link from "next/link";
import { db } from "@/lib/store";
import { NewProjectForm } from "@/components/NewProjectForm";
import { DeleteProjectButton } from "@/components/DeleteProjectButton";

export default function Home() {
  const projects = db.listProjects();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Your projects</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Create a project, then open it to track tasks.
        </p>
      </div>

      <NewProjectForm />

      {projects.length === 0 ? (
        <p className="text-sm text-zinc-500">No projects yet. Create one above.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {projects.map((project) => (
            <li
              key={project.id}
              className="flex items-start justify-between gap-4 rounded-lg border border-zinc-200 bg-white p-4"
            >
              <Link href={`/projects/${project.id}`} className="flex-1">
                <h2 className="font-medium text-zinc-900">{project.name}</h2>
                {project.description && (
                  <p className="mt-1 text-sm text-zinc-500">{project.description}</p>
                )}
              </Link>
              <DeleteProjectButton projectId={project.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
