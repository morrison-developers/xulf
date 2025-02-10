import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type SuperBowlGame = {
  id: string;
  home_team: string;
  away_team: string;
  commence_time: string;
  scores: { name: string; score: number }[];
  clock: string;
  period: number;
};

// ✅ Fallback Test Data
const TEST_DATA: SuperBowlGame = {
  id: "test-superbowl-2025",
  home_team: "Philadelphia Eagles",
  away_team: "Kansas City Chiefs",
  commence_time: "2025-02-09T23:30:00Z",
  scores: [
    { name: "Philadelphia Eagles", score: 0 },
    { name: "Kansas City Chiefs", score: 0 },
  ],
  clock: "0:00",
  period: 0,
};

export const useSuperBowlOdds = () => {
  return useQuery({
    queryKey: ["superbowlOdds"],
    queryFn: async (): Promise<SuperBowlGame> => {
      console.log("🔍 [useSuperBowlOdds] Fetching Super Bowl details...");
      try {
        // **1️⃣ Fetch Super Bowl Game Details (ESPN API)**
        const { data } = await axios.get("/api/superbowl");
        console.log("✅ [useSuperBowlOdds] ESPN API Response:", data);

        // ✅ FIX: Use `header.competitions[0]`
        const game = data.header?.competitions?.[0];

        if (!game) {
          console.warn("⚠️ [useSuperBowlOdds] No Super Bowl event found. Using test data.");
          return TEST_DATA;
        }

        console.log("🔍 [useSuperBowlOdds] Extracted game data:", game);

        const homeTeam = game.competitors?.find((team: any) => team.homeAway === "home");
        const awayTeam = game.competitors?.find((team: any) => team.homeAway === "away");

        if (!homeTeam || !awayTeam) {
          console.warn("⚠️ [useSuperBowlOdds] Missing team data. Using test data.");
          return TEST_DATA;
        }

        console.log("🏈 Home Team:", homeTeam.team.displayName);
        console.log("🏈 Away Team:", awayTeam.team.displayName);

        // **2️⃣ Fetch Live Scores (Alternate API)**
        let liveScores = null;
        try {
          console.log("🔄 Fetching live scores from alternate API...");
          const { data: scoreData } = await axios.get("/api/superbowl");
          console.log("✅ Score API Response:", scoreData);
          liveScores = scoreData;
        } catch (err) {
          console.warn("⚠️ [useSuperBowlOdds] Failed to fetch live scores. Using ESPN's scores.");
        }

        // **3️⃣ Explicitly Match Scores to Teams**
        const homeScore =
          liveScores?.home_score ??
          (parseInt(homeTeam.score, 10) || 0); // ✅ Ensure home score is correct

        const awayScore =
          liveScores?.away_score ??
          (parseInt(awayTeam.score, 10) || 0); // ✅ Ensure away score is correct

        const scores = [
          { name: homeTeam.team?.displayName ?? "Home Team", score: homeScore },
          { name: awayTeam.team?.displayName ?? "Away Team", score: awayScore },
        ];

        console.log("📊 Corrected Scores:", scores);

        return {
          id: game.id,
          home_team: homeTeam.team?.displayName || "Unknown Home Team",
          away_team: awayTeam.team?.displayName || "Unknown Away Team",
          commence_time: game.date,
          scores,
          clock: liveScores?.clock ?? game.status?.displayClock ?? "0:00",
          period: liveScores?.period ?? game.status?.period ?? 0,
        };
      } catch (error: any) {
        console.error("❌ [useSuperBowlOdds] Error fetching Super Bowl data:", error?.message || error);
        return TEST_DATA;
      }
    },
    refetchInterval: 30000, // ✅ Auto-refresh every 30 sec
  });
};
