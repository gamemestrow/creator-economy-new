import { createCourse } from "@/lib/firestore";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    await createCourse(body);
    return Response.json({ success: true });
}