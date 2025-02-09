import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_ODDS_API_KEY; // Ensure it's prefixed with NEXT_PUBLIC in .env
const API_URL = `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/events?regions=us&oddsFormat=american&apiKey=${API_KEY}`;

export type SuperBowlGame = {
  id: string;
  home_team: string;
  away_team: string;
  commence_time: string;
  scores?: { name: string; score: number }[];
};

// Test data for when the game hasn't started yet
const TEST_DATA: SuperBowlGame = {
  id: "test-superbowl-2025",
  home_team: "San Francisco 49ers",
  away_team: "Kansas City Chiefs",
  commence_time: "2025-02-09T23:30:00Z",
  scores: [
    { name: "San Francisco 49ers", score: 21 },
    { name: "Kansas City Chiefs", score: 17 },
  ],
};

const useSuperBowlOdds = () => {
  return useQuery({
    queryKey: ["superbowlOdds"],
    queryFn: async (): Promise<SuperBowlGame> => {
      try {
        const { data } = await axios.get(API_URL);

        // Find the Super Bowl game
        const superBowl = data.find((game: any) =>
          game.home_team.toLowerCase().includes("49ers") || game.away_team.toLowerCase().includes("chiefs")
        );

        if (!superBowl) {
          console.warn("No live Super Bowl data found. Using test data.");
          return TEST_DATA; // Use test data when no live game exists
        }

        return {
          id: superBowl.id,
          home_team: superBowl.home_team,
          away_team: superBowl.away_team,
          commence_time: superBowl.commence_time,
          scores: superBowl.scores || [],
        };
      } catch (error) {
        console.error("Error fetching Super Bowl data:", error);
        return TEST_DATA; // Return test data on API failure
      }
    },
    refetchInterval: 60000, // Auto-refresh every 60 sec
  });
};

export default useSuperBowlOdds;
