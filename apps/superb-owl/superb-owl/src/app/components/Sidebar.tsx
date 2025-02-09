import styled from "styled-components";
import { UserProps } from "./User";
import useSuperBowlOdds from "../hooks/useSuperBowlOdds"; // Import the odds hook

const SidebarContainer = styled.div`
  background: #f4f4f4;
  border-left: 2px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  position: absolute;

  /* ✅ Fixed width & height, scrollable when content overflows */
  width: 30vw;
  height: 100vh;
  right: 0;
  overflow-y: auto; /* ✅ Allows scrolling when content exceeds height */

  /* ✅ Full bottom on mobile */
  @media (max-width: 768px) {
    width: 100vw;
    height: 40vh; /* ✅ Set fixed height so it doesn't take full screen */
    border-left: none;
    border-top: 2px solid #ddd;
    bottom: 0;
  }
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
