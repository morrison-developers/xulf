import styled from "styled-components";

export type UserProps = {
  id: number;
  name: string;
  status: "active" | "inactive" | "pending";
  onClick: () => void;
};

const GridItem = styled.div<{ status: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ status }) =>
    status === "active" ? "lightgreen" : status === "inactive" ? "gray" : "pink"};
  border: 1px solid #fff;
  aspect-ratio: 1;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const User = ({ id, name, status, onClick }: UserProps) => (
  <GridItem status={status} onClick={onClick}>
    {name[0]} {/* Display first letter of name */}
  </GridItem>
);

export default User;
