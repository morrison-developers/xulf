import styled from "styled-components";
import { UserProps } from "./User";
import useSuperBowlOdds from "../hooks/useSuperBowlOdds"; // Import the odds hook

const SidebarContainer = styled.div`
  width: 250px;
  padding: 16px;
  background: #f4f4f4;
  border-left: 2px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Sidebar = ({ user }: { user: UserProps | null }) => {
  const { data: game, isLoading, error } = useSuperBowlOdds();

  return (
    <SidebarContainer>
      {/* User Details */}
      <h3>📌 Selected User</h3>
      {user ? (
        <>
          <p>Name: {user.name}</p>
          <p>Status: {user.status}</p>
          <p>ID: {user.id}</p>
        </>
      ) : (
        <p>Select a user</p>
      )}

      {/* Super Bowl Game Data */}
      <h3>🏈 Super Bowl 2025</h3>
      {isLoading ? (
        <p>Loading game data...</p>
      ) : error ? (
        <p>Error loading game data.</p>
      ) : game ? (
        <>
          <p>
            <strong>{game.home_team}</strong> vs. <strong>{game.away_team}</strong>
          </p>
          <p>🕒 {new Date(game.commence_time).toLocaleString()}</p>

          <h4>📈 Live Scores</h4>
          {game.scores && game.scores?.length > 0 ? (
            game.scores.map((score) => (
              <p key={score.name}>
                {score.name}: {score.score}
              </p>
            ))
          ) : (
            <p>No live scores yet.</p>
          )}
        </>
      ) : (
        <p>No Super Bowl game found.</p>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
