import styled from "styled-components";
import { Owner } from "../types";
import { useSuperBowlOdds } from "../hooks/useSuperBowlOdds";
import { useEffect, useState } from "react";

const SidebarContainer = styled.div`
  background: #f4f4f4;
  border-left: 2px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  position: absolute;
  width: 30vw;
  height: 100vh;
  right: 0;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100vw;
    height: 50vh;
    border-left: none;
    border-top: 2px solid #ddd;
    bottom: 0;
    margin-bottom: 60px;
  }
`;

const Sidebar = ({
  user,
}: {
  user: Owner | null;
  updateOwner: (id: number, updates: Partial<Owner>) => void;
}) => {
  const { data: gameData, isLoading, error } = useSuperBowlOdds();
  const [previousPeriod, setPreviousPeriod] = useState<number | null>(null);
  const [quarterEnded, setQuarterEnded] = useState(false);
  const [firstApiCall, setFirstApiCall] = useState(false); // ✅ Track first API call completion

  useEffect(() => {
    if (!gameData) return;

    // ✅ Ensure we don't show quarter-ended message on the first API response
    if (!firstApiCall) {
      setPreviousPeriod(gameData.period); // Set initial period after first call
      setFirstApiCall(true);
      return;
    }

    // ✅ Detect quarter transition **only after the first API call**
    if (previousPeriod !== null && gameData.period > previousPeriod) {
      console.log(`🏆 Quarter ${previousPeriod} has ended!`);
      setQuarterEnded(true);
      setTimeout(() => setQuarterEnded(false), 5000); // Reset flag after 5s
    }

    setPreviousPeriod(gameData.period); // Update period after API response
  }, [gameData?.period]);

  return (
    <SidebarContainer>
      {/* User Details */}
      {user ? (
        <>
          <h3>🏆 {user.name}</h3>
          <p>Initials: {user.initials}</p>
          <p>Quarters Won: {user.quartersWon}</p>
        </>
      ) : (
        <p>Select a box to see owner details.</p>
      )}

      <h3>🏈 Super Bowl 2025</h3>

      {/* Loading & Error Handling */}
      {isLoading ? (
        <p>Loading game data...</p>
      ) : error ? (
        <p>Error loading game data.</p>
      ) : gameData ? (
        <>
          {/* Team Names */}
          <h2>
            <span style={{ color: "#e31837" }}>{gameData.away_team}</span> vs.{" "}
            <span style={{ color: "#06424d" }}>{gameData.home_team}</span>
          </h2>

          {/* Kickoff Time */}
          <p>🕒 Kickoff: {new Date(gameData.commence_time).toLocaleString()}</p>

          {/* Live Scores & Period */}
          <h4>📊 Live Score</h4>
          {gameData.scores.map((score) => (
            <p key={score.name}>
              <strong>{score.name}:</strong> {score.score} pts
            </p>
          ))}
          <p>⏳ Current Quarter: Q{gameData.period > 4 ? "OT" : gameData.period}</p>

          {/* ✅ Quarter-end message (Hidden on initial load) */}
          {quarterEnded && <p>🏆 Quarter {previousPeriod} has ended!</p>}

          {/* Venue & Weather */}
          <h4>📍 Venue</h4>
          <p>🏟️ Caesars Superdome, New Orleans</p>
          <h4>🌦️ Weather</h4>
          <p>🌡️ 76°F | 🌧️ 65% Chance of Rain | 💨 Wind Gusts: 13 mph</p>

          {/* Game Officials */}
          <h4>👨‍⚖️ Officials</h4>
          <p>🛑 Referee: Ronald Torbert</p>
          <p>⚖️ Head Linesman: Max Causey</p>
        </>
      ) : (
        <p>No Super Bowl game found.</p>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
