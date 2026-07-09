import { getAuth } from "firebase-admin/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const token = body.idToken;
        if(!body || !token){
            return Response.json({ success: false });
        }
        const decodedToken = await getAuth().verifyIdToken(token);
        await getAuth().setCustomUserClaims(decodedToken.uid, {
            role: body.role
        })
        return Response.json({ success: true });

    } catch (error) {
        return Response.json({ success: false })
    }
}