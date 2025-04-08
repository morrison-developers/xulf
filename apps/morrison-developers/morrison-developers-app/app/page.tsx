'use client';

import styled from 'styled-components';
import { ThemeContextProvider } from '@xulf/ui';

const StyledPage = styled.div`
  .page {
    height: 700vh;
  }
`;

const customStyles = `

`;


const embedContent = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/06GGOttT4RqlE6ocEam8Cu?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`

export default function Index() {
  return (
    <ThemeContextProvider>
      <StyledPage>
      </StyledPage>
    </ThemeContextProvider>
  );
}
