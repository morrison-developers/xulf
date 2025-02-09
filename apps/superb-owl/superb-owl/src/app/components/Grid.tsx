import styled from "styled-components";
import { useState } from "react";
import User, { UserProps } from "./User";

interface GridProps {
  gridSize: number;
  setSelectedUser: (user: UserProps | null) => void;
}

const StyledGrid = styled.div<{ gridSize: number }>`
  display: grid;
  grid-template-columns: repeat(10, ${({ gridSize }) => gridSize / 10}px);
  grid-template-rows: repeat(10, ${({ gridSize }) => gridSize / 10}px);
  gap: 4px;
`;

const Grid = ({ gridSize, setSelectedUser }: GridProps) => {
  const [users, setUsers] = useState<UserProps[]>(
    Array.from({ length: 100 }, (_, index) => ({
      id: index + 1,
      name: `User ${index + 1}`,
      status: Math.random() > 0.5 ? "active" : "inactive",
      onClick: () => {},
    }))
  );

  return (
    <StyledGrid gridSize={gridSize}> {/* ✅ Pass gridSize */}
      {users.map((user) => (
        <User key={user.id} {...user} onClick={() => setSelectedUser(user)} />
      ))}
    </StyledGrid>
  );
}

export default Grid;
