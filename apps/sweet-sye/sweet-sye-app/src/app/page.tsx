'use client';

import styled from 'styled-components';
import { FloatingNavBar, ThemeContextProvider } from '@xulf/ui';

const StyledPage = styled.div`
  .page {
  }
`;

export default function Index() {
  return (
    <StyledPage>
      <ThemeContextProvider>
        <FloatingNavBar>
          <h1>Sweet Sye Entertainment</h1>
        </FloatingNavBar>
      </ThemeContextProvider>
    </StyledPage>
  );
}
