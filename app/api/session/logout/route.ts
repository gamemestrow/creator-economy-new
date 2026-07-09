import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const cookieStore = await cookies();
        if (!cookieStore) {
            return Response.json({ success: false });
        }
        cookieStore.delete("session");
        return Response.json({ success: true });
    } catch (error) {
        console.log(error)
        return Response.json({ success: false });
    }
}