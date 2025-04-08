import styled from 'styled-components';

const StyledButtonOverlay = styled.div`
  color: pink;
`;

export function ButtonOverlay() {
  return (
    <StyledButtonOverlay>
      <h1>Welcome to ButtonOverlay!</h1>
    </StyledButtonOverlay>
  );
}

export default ButtonOverlay;
