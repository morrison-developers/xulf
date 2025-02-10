import styled from "styled-components";

export interface UserProps {
  id: number;
  name: string;
  status: "highlighted" | "inactive"; // ✅ Only using "highlighted" and "inactive"
  onClick: () => void;
}


const GridItem = styled.div<{ status: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background-color: ${({ status }) =>
    status === "active" ? "lightgreen" : "gray"};
  border: 1px solid #fff;
  aspect-ratio: 1;
  cursor: pointer;
  transition: 0.2s;
  font-size: 14px;

  &:hover {
    opacity: 0.8;
  }
`;

const User = ({ id, name, status, onClick }: UserProps) => (
  <GridItem status={status} onClick={onClick}>
    {name}
  </GridItem>
);

export default User;
