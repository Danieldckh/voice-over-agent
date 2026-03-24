import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Text is required and must be a non-empty string." },
        { status: 400 }
      );
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "ElevenLabs API key is not configured." },
        { status: 500 }
      );
    }

    const voiceId = "ZIGffU92feoE7QFrof7N";
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text: text.trim(),
        model_id: "eleven_turbo_v2_5",
        language_code: "af",
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("ElevenLabs API error:", response.status, errorBody);
      return NextResponse.json(
        { error: "Failed to generate speech.", details: errorBody },
        { status: response.status }
      );
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": 'attachment; filename="voiceover.mp3"',
      },
    });
  } catch (error) {
    console.error("Generate route error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
