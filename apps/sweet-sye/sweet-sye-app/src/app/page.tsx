'use client';
import styled from 'styled-components';
import { ThemeContextProvider, LinkTree } from '@xulf/ui';
import { BookOnline, Instagram, AlternateEmail } from '@mui/icons-material';

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
  { url: 'https://www.eventbrite.com/e/friends-by-the-fireplace-a-holiday-cabaret-tickets-1085248831469', text: 'Get Tickets', icon: <BookOnline /> },
];

export default function Index(): JSX.Element {

  return (
    <StyledPage>
      <ThemeContextProvider>
        <StyledBody>
          <img
            src="/site-main.desktop@2x.webp"
            alt="Sweet Sye Entertainment for desktop"
          />
          <StyledLinkTree>
            <LinkTree links={links} />
          </StyledLinkTree>
        </StyledBody>
      </ThemeContextProvider>
    </StyledPage>
  );
}
