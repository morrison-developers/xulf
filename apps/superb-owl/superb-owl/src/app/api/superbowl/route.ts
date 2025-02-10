// File: /app/api/superbowl/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

const SUPER_BOWL_GAME_ID = "401671889";
const ESPN_API_URL = `http://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=${SUPER_BOWL_GAME_ID}`;

export async function GET() {
  console.log("🔍 [API] Fetching Super Bowl data...");
  try {
    const { data } = await axios.get(ESPN_API_URL);
    console.log("✅ [API] Success:", data);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("❌ [API] Error:", error?.message || error);
    return NextResponse.json({ error: "Failed to fetch Super Bowl data" }, { status: 500 });
  }
}
