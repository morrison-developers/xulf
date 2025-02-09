import styled from "styled-components";

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr; /* Left Decorations | Grid */
  grid-template-rows: auto 1fr; /* Top Decorations | Grid */
  gap: 4px;
  align-items: center;
  justify-content: center;
  width: fit-content;

  grid-template-areas:
    "top top"
    "left grid"; /* ✅ Decorations are correctly positioned */
`;

const TopDecorations = styled.div`
  grid-area: top;
  display: flex;
  flex-direction: column; /* ✅ Keeps Top Decorations stacked */
  align-items: flex-end;
  justify-content: center;
  gap: 8px;
`;

const LeftDecorations = styled.div`
  grid-area: left;
  display: flex;
  flex-direction: row; /* ✅ Places Side Team Name & Numbers in a Row */
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const RotatedTeamName = styled.h3`
  transform: rotate(-90deg); /* ✅ Rotate text 90° counterclockwise */
  white-space: nowrap;
`;

const MarkerRow = styled.div`
  display: flex;
  gap: 4px;
`;

const MarkerColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Marker = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background: #222;
  color: white;
  border: 1px solid #fff;
  width: 40px;
  height: 40px;
`;

const GridContainer = styled.div`
  grid-area: grid;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type GridDecorationsProps = {
  columnMarkers: number[];
  rowMarkers: number[];
  topTeam: string;
  sideTeam: string;
  gridSize: number;
  children: React.ReactNode;
};

const GridDecorations = ({ columnMarkers, rowMarkers, topTeam, sideTeam, gridSize, children }: GridDecorationsProps) => {
  return (
    <StyledGridContainer>
      {/* ✅ Top Decorations: Team Name + Column Markers (Stacked) */}
      <TopDecorations>
        <h3 style={{ marginRight: '9rem' }}>{topTeam}</h3>
        <MarkerRow>
          {columnMarkers.map((col, index) => (
            <Marker key={`col-${index}`}>{col}</Marker>
          ))}
        </MarkerRow>
      </TopDecorations>

      {/* ✅ Left Decorations: Side Team Name + Row Markers (In a Row) */}
      <LeftDecorations>
        <RotatedTeamName>{sideTeam}</RotatedTeamName>
        <MarkerColumn>
          {rowMarkers.map((row, index) => (
            <Marker key={`row-${index}`}>{row}</Marker>
          ))}
        </MarkerColumn>
      </LeftDecorations>

      {/* ✅ Grid Area */}
      <GridContainer>{children}</GridContainer>
    </StyledGridContainer>
  );
};

export default GridDecorations;
