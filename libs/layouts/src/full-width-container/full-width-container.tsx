import React from 'react';
import styled from 'styled-components';

const StyledFullWidthContainer = styled.div`
  width: 100%;
`;

export function FullWidthContainer(): React.JSX.Element {
  return (
    <StyledFullWidthContainer>
      <h1>Welcome to FullWidthContainer!</h1>
    </StyledFullWidthContainer>
  );
}

export default FullWidthContainer;
