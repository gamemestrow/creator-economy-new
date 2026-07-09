import { deleteCourse, fetchCreatorCourses } from "@/lib/firestore";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const data = await fetchCreatorCourses(id);

    return Response.json({ success: true, data });
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    await deleteCourse(id);

    return Response.json({ success: true });
}