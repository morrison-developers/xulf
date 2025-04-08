'use client';

import styled from 'styled-components';
import { ThemeContextProvider } from '@xulf/ui';
import { Box } from '@xulf/essentials'

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
          customStyles={customStyles}
        >
          <h1>Heelo</h1>
        </Box>
      </StyledPage>
    </ThemeContextProvider>
  );
}
