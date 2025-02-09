'use client';

import Grid, { GRID_SIZE } from "./components/Grid";
import GridDecorations from "./components/GridDecorations";

const columnMarkers = [5, 2, 1, 0, 6, 9, 7, 8, 3, 4];
const rowMarkers = [1, 6, 7, 8, 0, 3, 9, 2, 5, 4];
const topTeam = "Kansas City Chiefs";
const sideTeam = "Philadelphia Eagles";

function Index() {
  return (
    <GridDecorations
      columnMarkers={columnMarkers}
      rowMarkers={rowMarkers}
      topTeam={topTeam}
      sideTeam={sideTeam}
      gridSize={GRID_SIZE} // ✅ Now all decorations match the grid size
    >
      <Grid />
    </GridDecorations>
  );
}

export default Index;
