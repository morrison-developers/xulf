'use client';
import styled from 'styled-components';
import { ThemeContextProvider, LinkTree } from '@xulf/ui';
import { Instagram, AlternateEmail } from '@mui/icons-material';

const StyledPage = styled.div`
  img {
    max-height: 100dvh;
    max-width: 100vw;
  }
`;

const StyledBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 44em) {
    flex-direction: column;
  }
`

const StyledLinkTree = styled.div`
  flex-grow: 1;
  margin: 2rem;
  min-width: 80vw;

  @media (max-width: 44em) {
    div {
      display: flex;  
      flex-direction: row;
      gap: 0.5rem;
    }
  }

    @media (max-width: 32em) {
    div {
      display: flex;  
      flex-direction: column;
      gap: 0.5rem;
    }
  }
`

const links = [
  { url: 'https://www.instagram.com/sweetsyeentertainment/', text: 'Instagram', icon: <Instagram /> },
  { url: 'mailto:contact@sweetsye.com', text: 'Contact Us', icon: <AlternateEmail /> },
];

export default function Index(): JSX.Element {

  return (
    <StyledPage>
      <ThemeContextProvider>
        <StyledBody>
          <StyledLinkTree>
            <LinkTree links={links} />
          </StyledLinkTree>
        </StyledBody>
      </ThemeContextProvider>
    </StyledPage>
  );
}
