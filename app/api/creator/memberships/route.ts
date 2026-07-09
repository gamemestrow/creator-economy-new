import { createMembership } from "@/lib/firestore";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        if(!body) return Response.json({ success: false });
        await createMembership(body);
        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ success: false });
    }
}