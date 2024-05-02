import { TextToSpeechParams } from "@/etc/dto";
import AIService from "@/server/ai.service"
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto

const aiService = AIService.getInstance();

export async function POST(req: NextRequest) {
    const body = await req.json() as TextToSpeechParams;
    const mp3 = await aiService.createTextToSpeech(body);

    return new NextResponse(mp3, {
        headers: {
            "Content-Type": "audio/mp3"
        }
    });
}