import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/store";

export async function GET() {
  return NextResponse.json(db.listProjects());
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const description = typeof body.description === "string" ? body.description.trim() : "";

  if (!name) {
    return NextResponse.json({ error: "Project name is required" }, { status: 400 });
  }

  const project = db.createProject(name, description);
  return NextResponse.json(project, { status: 201 });
}
