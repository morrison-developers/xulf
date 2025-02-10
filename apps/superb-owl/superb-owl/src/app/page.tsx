"use client";

import { useState, useEffect } from "react";
import Grid from "./components/Grid";
import GridDecorations from "./components/GridDecorations";
import Sidebar from "./components/Sidebar";
import { Owner } from "./types";
import styled from "styled-components";
import { useSuperBowlOdds } from "./hooks/useSuperBowlOdds";

const columnMarkers = [5, 2, 1, 0, 6, 9, 7, 8, 3, 4];
const rowMarkers = [1, 6, 7, 8, 0, 3, 9, 2, 5, 4];
const topTeam = "Kansas City Chiefs";
const sideTeam = "Philadelphia Eagles";

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

/* ✅ New Layout to keep Grid & Sidebar separate */
const Layout = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  position: fixed;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  flex: 1;
  height: 100vh;
  padding-right: 30vw; /* Sidebar width offset */

  @media (max-width: 768px) {
    padding-right: 0;
    height: calc(100vh - 40vh);
    margin-bottom: 300px;
  }
`;

function Index() {
  const [selectedUser, setSelectedUser] = useState<Owner | null>(null);
  const { data: gameData, isLoading, error } = useSuperBowlOdds();

  const [owners, setOwners] = useState<Owner[]>(() => {
    if (typeof window !== "undefined") {
      const savedOwners = localStorage.getItem("owners");
      return savedOwners
        ? JSON.parse(savedOwners)
        : [
            { id: 1, initials: "KLC", name: "Mom", quartersWon: 0, ownsCurrentBox: false },
            { id: 2, initials: "NDY", name: "Andy", quartersWon: 0, ownsCurrentBox: false },
            { id: 3, initials: "NIC", name: "Nicoletta", quartersWon: 0, ownsCurrentBox: false },
            { id: 4, initials: "RAM", name: "Rebecca", quartersWon: 0, ownsCurrentBox: false },
            { id: 5, initials: "SAM", name: "Steven", quartersWon: 0, ownsCurrentBox: false },
            { id: 6, initials: "KRM", name: "Dad", quartersWon: 0, ownsCurrentBox: false },
          ];
    }
    return [];
  });

  const [gridSize, setGridSize] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateGridSize = () => {
        setGridSize(window.innerWidth > 768 ? 400 : 200);
      };

      updateGridSize();
      window.addEventListener("resize", updateGridSize);
      return () => window.removeEventListener("resize", updateGridSize);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("owners", JSON.stringify(owners));
    }
  }, [owners]);

  const updateOwner = (id: number, updates: Partial<Owner>) => {
    setOwners((prev) =>
      prev.map((owner) => (owner.id === id ? { ...owner, ...updates } : owner))
    );
  };

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
          <Grid setSelectedUser={setSelectedUser} gridSize={gridSize} owners={owners} gameData={gameData} />
        </GridDecorations>
      </MainContent>

      {/* ✅ Pass gridAssignments & owners to Sidebar */}
      <Sidebar user={selectedUser} gridAssignments={gridAssignments} owners={owners} updateOwner={updateOwner} />
    </Layout>
  );
}

export default Index;
