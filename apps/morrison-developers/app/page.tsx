'use client';

import styled from 'styled-components';
import { FloatingNavBar, ThemeContextProvider } from '@xulf/ui';

const StyledPage = styled.div`
  .page {
    height: 700vh;
  }
`;

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <ThemeContextProvider>
      <StyledPage>
        <FloatingNavBar>
          <h1>Home</h1>
          <h1>About</h1>
          <h1>Contact</h1>
          <h1>Blog</h1>
          <h1>Services</h1>
          <h1>Projects</h1>
        </FloatingNavBar>
      </StyledPage>
    </ThemeContextProvider>
  );
}
