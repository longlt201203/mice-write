import { GenerateImageParams } from "@/etc/dto";
import AIService from "@/server/ai.service"
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto

const aiService = AIService.getInstance();

export async function POST(req: NextRequest) {
    const body = await req.json() as GenerateImageParams;
    const url = await aiService.createImage(body);

    return new NextResponse(JSON.stringify({ url }));
}