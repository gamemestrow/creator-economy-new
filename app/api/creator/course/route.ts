import { createCourse } from "@/lib/firestore";

export async function POST(req: Request) {
    const body = await req.json();
    await createCourse(body);
    return Response.json({ success: true });
}