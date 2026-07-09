import { createMembership } from "@/lib/firestore";

export async function POST(req: Request) {
    const body = await req.json();
    await createMembership(body);
    return Response.json({ success: true });
}