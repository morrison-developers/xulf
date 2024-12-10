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
        <FloatingNavBar
          logo={ <img src="/logo@2x.webp" alt="Logo" /> }
        >
          <img src="/title@2x.webp" alt="Sweet Sye Entertainment" style={{ width: '10rem' }} />
        </FloatingNavBar>
      </ThemeContextProvider>
    </StyledPage>

  );
}
