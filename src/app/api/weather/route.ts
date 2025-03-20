import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { env } from "~/env";
import { VisualCrossingResponse } from "~/server/visual-crossing";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("query") ?? "";
    const time = url.searchParams.get("time");
    if (!time) {
      throw new Error("Time is required");
    }

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}/${time}?unitGroup=us&key=${env.VISUAL_CROSSING_API_KEY}&include=current&contentType=json`,
      {
        method: "GET",
        redirect: "follow",
      },
    );
    const weather = (await response.json()) as VisualCrossingResponse;
    return NextResponse.json(weather);
  } catch (cause) {
    console.error(cause);
    if (cause instanceof Error) {
      return NextResponse.json({ error: cause.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
