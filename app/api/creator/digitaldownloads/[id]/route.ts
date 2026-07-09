import { getCreatorDigitalDownloads } from "@/lib/firestore/digitalDownloads";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const {id} = await params;

        if ( !id ) return Response.json({ success: false });

        const data = await getCreatorDigitalDownloads(id)
        
        return Response.json({ success: true, data })
    } catch (error) {
        return Response.json({ success: false })
    }
}