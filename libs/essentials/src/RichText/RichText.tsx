import styled from 'styled-components';

const StyledRichText = styled.div`
  color: pink;
`;

export function RichText() {
  return (
    <StyledRichText>
      <h1>Welcome to RichText!</h1>
    </StyledRichText>
  );
}

export default RichText;
