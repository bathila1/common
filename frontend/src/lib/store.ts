import { Project, Task } from "./types";

declare global {
  var __pmStore: { projects: Project[]; tasks: Task[] } | undefined;
}

function seed(): { projects: Project[]; tasks: Task[] } {
  const projectId = "p1";
  return {
    projects: [
      {
        id: projectId,
        name: "Website Redesign",
        description: "Refresh the marketing site and improve page speed.",
        createdAt: new Date().toISOString(),
      },
    ],
    tasks: [
      { id: "t1", projectId, title: "Audit current homepage", status: "done", createdAt: new Date().toISOString() },
      { id: "t2", projectId, title: "Design new landing page", status: "in_progress", createdAt: new Date().toISOString() },
      { id: "t3", projectId, title: "Set up analytics", status: "todo", createdAt: new Date().toISOString() },
    ],
  };
}

// Survives Next.js dev-server hot reloads by hanging off globalThis.
const store = globalThis.__pmStore ?? seed();
globalThis.__pmStore = store;

function id(): string {
  return Math.random().toString(36).slice(2, 10);
}

export const db = {
  listProjects(): Project[] {
    return store.projects;
  },
  getProject(id: string): Project | undefined {
    return store.projects.find((p) => p.id === id);
  },
  createProject(name: string, description: string): Project {
    const project: Project = { id: id(), name, description, createdAt: new Date().toISOString() };
    store.projects.push(project);
    return project;
  },
  deleteProject(projectId: string): void {
    store.projects = store.projects.filter((p) => p.id !== projectId);
    store.tasks = store.tasks.filter((t) => t.projectId !== projectId);
  },
  listTasks(projectId: string): Task[] {
    return store.tasks.filter((t) => t.projectId === projectId);
  },
  createTask(projectId: string, title: string): Task {
    const task: Task = { id: id(), projectId, title, status: "todo", createdAt: new Date().toISOString() };
    store.tasks.push(task);
    return task;
  },
  getTask(taskId: string): Task | undefined {
    return store.tasks.find((t) => t.id === taskId);
  },
  updateTask(taskId: string, updates: Partial<Pick<Task, "title" | "status">>): Task | undefined {
    const task = store.tasks.find((t) => t.id === taskId);
    if (!task) return undefined;
    Object.assign(task, updates);
    return task;
  },
  deleteTask(taskId: string): void {
    store.tasks = store.tasks.filter((t) => t.id !== taskId);
  },
};
