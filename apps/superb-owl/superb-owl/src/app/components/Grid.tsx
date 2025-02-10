import styled from "styled-components";
import { useEffect } from "react";
import { Owner } from "../types";
import { useSuperBowlOdds, SuperBowlGame } from "../hooks/useSuperBowlOdds";

interface GridProps {
  gridSize: number;
  setSelectedUser: React.Dispatch<React.SetStateAction<Owner | null>>;
  owners: Owner[];
  gameData?: SuperBowlGame;
}

const StyledGrid = styled.div<{ gridSize: number }>`
  display: grid;
  grid-template-columns: repeat(10, ${({ gridSize }) => gridSize / 10}px);
  grid-template-rows: repeat(10, ${({ gridSize }) => gridSize / 10}px);
  gap: 4px;
`;

const StyledCell = styled.div<{ bgColor: string; textColor: string; isHighlighted: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  @media (max-width: 768px) {
    font-size: 8px;
  }
  font-weight: bold;
  width: 100%;
  height: 100%;
  background: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
  border: ${({ isHighlighted }) => (isHighlighted ? "4px solid yellow" : "2px solid black")};
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  ${({ isHighlighted }) =>
    isHighlighted &&
    `
      transform: scale(1.3);
      box-shadow: 0px 0px 20px yellow;
    `}
`;

const ownerColors: Record<string, { bg: string; text: string }> = {
  KLC: { bg: "#8000FF", text: "#FFFFFF" }, // Purple
  KRM: { bg: "#4169E1", text: "#FFFFFF" }, // Royal Blue
  NDY: { bg: "#00FF00", text: "#000000" }, // Bright Green
  NIC: { bg: "#00C000", text: "#000000" }, // Green
  SAM: { bg: "#964B00", text: "#FF8C00" }, // Brown
  RAM: { bg: "#C0A080", text: "#000000" }, // Tan
};

const gridAssignments = [
  ["KLC", "KRM", "KRM", "NIC", "NDY", "NIC", "SAM", "KRM", "KRM", "KLC"],
  ["NDY", "KLC", "KRM", "KRM", "NIC", "KRM", "NDY", "KRM", "KLC", "NDY"],
  ["NIC", "NDY", "KLC", "KRM", "SAM", "KRM", "NIC", "KLC", "NDY", "NIC"],
  ["SAM", "NIC", "NDY", "KLC", "RAM", "RAM", "NDY", "RAM", "RAM", "SAM"],
  ["KRM", "SAM", "NIC", "RAM", "KLC", "NDY", "RAM", "KRM", "SAM", "RAM"],
  ["KRM", "NIC", "SAM", "RAM", "NDY", "KLC", "NIC", "SAM", "NIC", "RAM"],
  ["KRM", "SAM", "KRM", "RAM", "NIC", "NDY", "KLC", "KRM", "SAM", "RAM"],
  ["SAM", "NIC", "KLC", "NDY", "RAM", "SAM", "NDY", "KLC", "RAM", "SAM"],
  ["RAM", "KLC", "NDY", "NIC", "SAM", "RAM", "SAM", "RAM", "KLC", "NIC"],
  ["KLC", "NDY", "NIC", "SAM", "NDY", "NIC", "RAM", "SAM", "NDY", "KLC"],
];

const columnMarkers = [5, 2, 1, 0, 6, 9, 7, 8, 3, 4];
const rowMarkers = [1, 6, 7, 8, 0, 3, 9, 2, 5, 4];

const Grid = ({ gridSize, setSelectedUser, owners }: GridProps) => {
  const { data: gameData } = useSuperBowlOdds();

  useEffect(() => {
    localStorage.setItem("owners", JSON.stringify(owners));
  }, [owners]);

  console.log("🏈 [Grid] Fetched Game Data:", gameData);

  const awayScore = gameData?.scores?.find((s) => s.name === gameData.home_team)?.score ?? 0;
  const homeScore = gameData?.scores?.find((s) => s.name === gameData.away_team)?.score ?? 0;
  
  const homeLastDigit = homeScore % 10;
  const awayLastDigit = awayScore % 10;
  
  // ✅ Map the digits correctly
  const mappedHomeDigit = columnMarkers.indexOf(homeLastDigit);
  const mappedAwayDigit = rowMarkers.indexOf(awayLastDigit);
  
  // 🛠 LOG: Ensure correct mappings
  console.log(
    `🎯 [Grid] Mapped Grid Positions -> Home: ${mappedHomeDigit}, Away: ${mappedAwayDigit}`
  );  
  

  return (
    <StyledGrid gridSize={gridSize}>
      {gridAssignments.flat().map((initials, index) => {
        const owner = owners.find((o) => o.initials === initials);

        // Convert index into grid coordinates
        const columnIndex = index % 10;
        const rowIndex = Math.floor(index / 10);

        const isWinningBox = columnIndex === mappedHomeDigit && rowIndex === mappedAwayDigit;

        return (
          <StyledCell
            key={index}
            bgColor={ownerColors[initials]?.bg || "#000000"}
            textColor={ownerColors[initials]?.text || "#FFFFFF"}
            isHighlighted={isWinningBox}
            onClick={() => {
              console.log(`🔍 [Grid] Selected User:`, owner);
              setSelectedUser(owner || null);
            }}
          >
            {owner ? owner.initials : ""}
          </StyledCell>
        );
      })}
    </StyledGrid>
  );
};

export default Grid;
