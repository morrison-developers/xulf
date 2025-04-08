'use client';

import styled from 'styled-components';
import { ThemeContextProvider } from '@xulf/ui';
import { Box, ButtonOverlay } from '@xulf/essentials'

const StyledPage = styled.div`
  .page {
    height: 700vh;
  }
`;

const customStyles = `

`;

export default function Index() {
  return (
    <ThemeContextProvider>
      <StyledPage>
        <Box 
          orientation='vertical'
          alignItems='center'
          justifyContent='center'
        >
          <ButtonOverlay
            linkUrl='https://www.google.com'
          >
          </ButtonOverlay>
        </Box>
      </StyledPage>
    </ThemeContextProvider>
  );
}
