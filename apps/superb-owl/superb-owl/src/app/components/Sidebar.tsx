import styled from "styled-components";
import { useEffect, useState } from "react";
import { Owner } from "../types";
import { useSuperBowlOdds } from "../hooks/useSuperBowlOdds";

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
  gridAssignments,
  owners,
}: {
  user: Owner | null;
  gridAssignments: string[][];
  owners: Owner[];
  updateOwner: (id: number, updates: Partial<Owner>) => void;
}) => {
  const { data: gameData, isLoading, error } = useSuperBowlOdds();
  const [previousPeriod, setPreviousPeriod] = useState<number | null>(null);
  const [quarterEnded, setQuarterEnded] = useState(false);
  const [firstApiCall, setFirstApiCall] = useState(false);
  const [winners, setWinners] = useState<{ [key: string]: Owner | null }>(() => {
    if (typeof window !== "undefined") {
      const storedWinners = localStorage.getItem("quarterWinners");
      const parsedWinners = storedWinners ? JSON.parse(storedWinners) : {};
  
      // ✅ Ensure Q1 is always "Dad"
      return { Q1: { id: 6, initials: "KRM", name: "Dad", quartersWon: 0, ownsCurrentBox: false }, ...parsedWinners };
    }
    
    return { Q1: { id: 6, initials: "KRM", name: "Dad", quartersWon: 0, ownsCurrentBox: false } };
  });
  

  useEffect(() => {
    if (!gameData) return;

    if (!firstApiCall) {
      setPreviousPeriod(gameData.period);
      setFirstApiCall(true);
      return;
    }

    if (previousPeriod !== null && gameData.period > previousPeriod) {
      console.log(`🏆 Quarter ${previousPeriod} has ended!`);
      setQuarterEnded(true);
      setTimeout(() => setQuarterEnded(false), 5000);

      // Determine the winner for the ended quarter
      const winner = getCurrentWinningOwner();
      if (winner && !winners[`Q${previousPeriod}`]) {
        const updatedWinners = { ...winners, [`Q${previousPeriod}`]: winner };
        setWinners(updatedWinners);
        localStorage.setItem("quarterWinners", JSON.stringify(updatedWinners));
      }
    }

    setPreviousPeriod(gameData.period);
  }, [gameData?.period]);

  const getCurrentWinningOwner = (): Owner | null => {
    if (!gameData || !gridAssignments) return null;

    const homeScore = gameData.scores?.find((s) => s.name === gameData.home_team)?.score ?? 0;
    const awayScore = gameData.scores?.find((s) => s.name === gameData.away_team)?.score ?? 0;

    const homeLastDigit = homeScore % 10;
    const awayLastDigit = awayScore % 10;

    const columnMarkers = [5, 2, 1, 0, 6, 9, 7, 8, 3, 4];
    const rowMarkers = [1, 6, 7, 8, 0, 3, 9, 2, 5, 4];

    const mappedHomeDigit = columnMarkers.indexOf(homeLastDigit);
    const mappedAwayDigit = rowMarkers.indexOf(awayLastDigit);

    if (mappedHomeDigit !== -1 && mappedAwayDigit !== -1) {
      const winningInitials = gridAssignments[mappedAwayDigit][mappedHomeDigit];
      return owners.find((owner) => owner.initials === winningInitials) || null;
    }

    return null;
  };

  return (
    <SidebarContainer>
      {/* 🏆 **Winning Quarters Section** */}
      <h1>Winning Quarters</h1>
        <h2>Q1: <strong>Dad</strong></h2>
        <h2>Q2: <strong>Steven</strong></h2>
        <h2>Q3: <strong>Andy</strong></h2>
        <h2>Q4: <strong>Steven</strong></h2>

      <h1>TRUMP vs SWIFT</h1>
      <h2>TRUMP: <strong>1</strong></h2>
      <h2>SWIFT: <strong>1</strong></h2>

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
