import styled from '@emotion/styled';

const StyledButton = styled.div`
  color: pink;
`;

export function Button() {
  return (
    <StyledButton>
      <h1>Welcome to Button!</h1>
    </StyledButton>
  );
}

export default Button;
