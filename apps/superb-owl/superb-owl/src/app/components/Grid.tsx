import styled from "styled-components";
import { useState } from "react";
import User, { UserProps } from "./User";

const GRID_SIZE = 40; // Controls the size of each cell in pixels

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, ${GRID_SIZE}px);
  grid-template-rows: repeat(10, ${GRID_SIZE}px);
  gap: 4px;
`;

export function Grid() {
  const [users, setUsers] = useState<UserProps[]>(
    Array.from({ length: 100 }, (_, index) => ({
      id: index + 1,
      name: `User ${index + 1}`,
      status: Math.random() > 0.5 ? "active" : "inactive",
      onClick: () => {},
    }))
  );

  return (
    <StyledGrid>
      {users.map((user) => (
        <User key={user.id} {...user} />
      ))}
    </StyledGrid>
  );
}

export default Grid;
export { GRID_SIZE }; // Export for use in GridDecorations
