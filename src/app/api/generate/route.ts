import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, voiceId, speed, stability: stabilityPreset } = body;

    const stabilityMap: Record<string, number> = {
      creative: 0.20,
      natural: 0.35,
      robust: 0.75,
    };
    const stabilityValue = stabilityMap[stabilityPreset] ?? 0.35;

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

    const selectedVoice = voiceId || "ZIGffU92feoE7QFrof7N";
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(selectedVoice)}?output_format=mp3_44100_128`;

    // Detect phoneme tags to decide model and text format
    const hasPhonemes = /<phoneme\s/.test(text);
    const modelId = hasPhonemes ? "eleven_flash_v2" : "eleven_v3";

    // Wrap in <speak> tags for SSML when phoneme tags are present
    let finalText = text.trim();
    if (hasPhonemes && !finalText.startsWith("<speak>")) {
      finalText = `<speak>${finalText}</speak>`;
    }

    // Build voice settings — omit `style` for Flash v2
    const voiceSettings: Record<string, number | boolean> = {
      stability: stabilityValue,
      similarity_boost: 0.80,
      use_speaker_boost: true,
      speed: typeof speed === "number" && speed > 0 ? speed : 1.1,
    };
    if (!hasPhonemes) {
      voiceSettings.style = stabilityPreset === "robust" ? 0.10 : 0.40;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text: finalText,
        model_id: modelId,
        voice_settings: voiceSettings,
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
        "X-Model-Used": modelId,
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
