import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/store";

const VALID_STATUSES = ["todo", "in_progress", "done"];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const updates: { title?: string; status?: "todo" | "in_progress" | "done" } = {};

  if (typeof body.title === "string" && body.title.trim()) {
    updates.title = body.title.trim();
  }
  if (typeof body.status === "string" && VALID_STATUSES.includes(body.status)) {
    updates.status = body.status;
  }

  const task = db.updateTask(id, updates);
  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  return NextResponse.json(task);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  db.deleteTask(id);
  return new NextResponse(null, { status: 204 });
}
