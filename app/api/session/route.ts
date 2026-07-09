import { adminAuth } from "@/lib/firebase-admin";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const token = body.idToken;

        if (!body || !token) {
            return Response.json({ success: false })
        }
        const decodedToken = await adminAuth.verifyIdToken(token);

        if (!decodedToken) {
            Response.json({ success: false });
        }
        const sessionCookie = await adminAuth.createSessionCookie(token, {
            expiresIn: 1000 * 60 * 60 * 24
        })

        const cookieStore = await cookies();

        cookieStore.set("session", sessionCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development',
            sameSite: 'lax',
            path: "/",
        })
        return Response.json({ success: true });
    } catch (error) {
        console.log(error);
        return Response.json({ success: false });
    }


}