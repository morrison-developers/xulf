'use client';

import styled from 'styled-components';
import { ThemeContextProvider } from '@xulf/ui';
import { Box, ButtonOverlay, Embed, Image } from '@xulf/essentials'

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
        <Box 
          orientation='vertical'
          alignItems='center'
          justifyContent='center'
        >
        <Embed embedContent={embedContent} />
        <Image src='placeholder.png' alt='placeholder' />
        </Box>
      </StyledPage>
    </ThemeContextProvider>
  );
}
