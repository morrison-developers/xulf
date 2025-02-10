import styled from "styled-components";

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr; /* Left Decorations | Grid */
  grid-template-rows: auto 1fr; /* Top Decorations | Grid */
  gap: 4px;
  align-items: start;
  justify-content: center;
  width: fit-content;

  @media (max-width: 768px) {
    margin-right: -75px;
  }

  grid-template-areas:
    "top top"
    "left grid"; /* ✅ Decorations are correctly positioned */
`;

const TopDecorations = styled.div<{gridSize: number}>`
  grid-area: top;
  grid-column: 2;
  display: flex;
  flex-direction: column; /* ✅ Keeps Top Decorations stacked */
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
  width: 400px;
  h3 {
    align-self: center;

    @media (max-width: 768px) {
      align-self: flex-start;
    }
    font-size: ${({ gridSize }) => gridSize / 12}px
  }
`;

const LeftDecorations = styled.div<{gridSize: number}>`
  grid-area: left;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
  height: 400px;
  h3 {
    align-self: center;
    margin-right: -100px;

    @media (max-width: 768px) {
      align-self: flex-start;
      margin-right: -66px;
      margin-top: 100px
    }
    font-size: ${({ gridSize }) => gridSize / 12}px
  }
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

const Marker = styled.div<{gridSize: number}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background: #222;
  color: white;
  border: 1px solid #fff;
  width: ${({ gridSize }) => gridSize / 10}px;
  height: ${({ gridSize }) => gridSize / 10}px;
;
`;

const GridContainer = styled.div`
  grid-area: grid;
  display: flex;
  align-items: start;
  justify-content: flext-start;
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
      <></>
      <TopDecorations gridSize={gridSize}>
        <h3>{topTeam}</h3>
        <MarkerRow>
          {columnMarkers.map((col, index) => (
            <Marker key={`col-${index}`} gridSize={gridSize} >{col}</Marker>
          ))}
        </MarkerRow>
      </TopDecorations>

      {/* ✅ Left Decorations: Side Team Name + Row Markers (In a Row) */}
      <LeftDecorations gridSize={gridSize}>
        <RotatedTeamName>{sideTeam}</RotatedTeamName>
        <MarkerColumn>
          {rowMarkers.map((row, index) => (
            <Marker key={`row-${index}`}gridSize={gridSize} >{row}</Marker>
          ))}
        </MarkerColumn>
      </LeftDecorations>

      {/* ✅ Grid Area */}
      <GridContainer>{children}</GridContainer>
    </StyledGridContainer>
  );
};

export default GridDecorations;
