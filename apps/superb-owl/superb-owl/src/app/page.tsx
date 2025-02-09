'use client';

import { useState, useEffect } from "react";
import Grid from "./components/Grid";
import GridDecorations from "./components/GridDecorations";
import Sidebar from "./components/Sidebar";
import { UserProps } from "./components/User";
import styled from "styled-components";

const columnMarkers = [5, 2, 1, 0, 6, 9, 7, 8, 3, 4];
const rowMarkers = [1, 6, 7, 8, 0, 3, 9, 2, 5, 4];
const topTeam = "Kansas City Chiefs";
const sideTeam = "Philadelphia Eagles";

/* ✅ New Layout to keep Grid & Sidebar separate */
const Layout = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;

  /* ✅ Mobile: Stack Sidebar below Grid */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;

  /* ✅ On Desktop: Takes full height & centers, minus Sidebar width */
  flex: 1;
  height: 100vh;
  padding-right: 30vw; /* Sidebar width offset */

  /* ✅ On Mobile: Centers horizontally, positioned above the Sidebar */
  @media (max-width: 768px) {
    padding-right: 0;
    height: calc(100vh - 40vh); /* Subtract Sidebar height */
    margin-bottom: 200px;
  }
`;

function Index() {
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);
  const [gridSize, setGridSize] = useState<number | null>(null); // ✅ Start with null

  useEffect(() => {
    // ✅ Ensure `window` is available
    const updateGridSize = () => {
      setGridSize(window.innerWidth > 768 ? 400 : 200);
    };

    updateGridSize(); // ✅ Set grid size on mount
    window.addEventListener("resize", updateGridSize);
    return () => window.removeEventListener("resize", updateGridSize);
  }, []);

  // ✅ Avoid rendering until `gridSize` is set
  if (gridSize === null) return null;


  return (
    <Layout>
      <MainContent>
        <GridDecorations
          columnMarkers={columnMarkers}
          rowMarkers={rowMarkers}
          topTeam={topTeam}
          sideTeam={sideTeam}
          gridSize={gridSize}
        >
          <Grid setSelectedUser={setSelectedUser} gridSize={gridSize} />
        </GridDecorations>
      </MainContent>

      <Sidebar user={selectedUser} />
    </Layout>
  );
}

export default Index;
