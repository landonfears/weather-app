import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { env } from "~/env";
import type { OpenCageResponse } from "~/server/open-cage";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("query") ?? "";

    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${env.OPEN_CAGE_API_KEY}`,
      {
        method: "GET",
        redirect: "follow",
      },
    );
    const geocode = (await response.json()) as OpenCageResponse;
    return NextResponse.json(geocode);
  } catch (cause) {
    console.error(cause);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
