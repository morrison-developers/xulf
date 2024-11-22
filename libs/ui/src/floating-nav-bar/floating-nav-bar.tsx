import { useContext, useState, ReactNode } from 'react';
import styled from '@emotion/styled';
import Switch from '@mui/joy/Switch';
import { ThemeContext } from '../theme/theme-context';

interface FloatingNavBarProps {
  logo?: ReactNode;
  children?: ReactNode;
  backgroundColor?: string;
  textColor?: string;
  customStyles?: React.CSSProperties;
}

const StyledFloatingNavBar = styled.div<{ backgroundColor?: string; textColor?: string }>`
  max-width: 70em;
  width: 80%;
  height: auto;
  min-height: 5.5em;
  margin: 0 auto;
  border-radius: 4px;
  background: ${({ backgroundColor }) => backgroundColor || 'var(--background, #daebe4)'};
  color: ${({ textColor }) => textColor || 'var(--text, #000)'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  position: fixed;
  top: 1em;
  left: 50%;
  transform: translateX(-50%);

  z-index: 10;
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
`;

const StyledLinks = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  h1 {
    font-size: 1rem;
    font-weight: 300;
  }

  @media (max-width: 768px) {
    display: none; // Hide children links by default on mobile
  }
`;

const StyledMobileLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    font-size: 1rem;
    font-weight: 300;
  }
`;

const MobileMenu = styled.div<{ open: boolean; backgroundColor?: string }>`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  position: absolute;
  top: 7em;
  right: 1rem;
  flex-direction: column;
  gap: 0.5rem;
  background-color: ${({ backgroundColor }) => backgroundColor || 'var(--background, #daebe4)'};
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  z-index: 9;

  @media (min-width: 769px) {
    display: none; // No dropdown on larger screens
  }
`;

const MenuButton = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block; // Show the menu button on mobile
  }
`;

export function FloatingNavBar({
  logo,
  children,
  backgroundColor,
  textColor,
  customStyles,
}: FloatingNavBarProps): JSX.Element {
  const { toggleTheme, mode } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <StyledFloatingNavBar
      backgroundColor={backgroundColor}
      textColor={textColor}
      style={customStyles}
    >
      {/* Logo */}
      <div>
        {logo || (
          <svg
            width="234"
            height="89"
            viewBox="0 0 234 89"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Default Logo SVG */}
            <path d="M49.1113..." fill="currentColor" />
          </svg>
        )}
      </div>

      {/* Desktop Links */}
      <StyledLinks>{children}</StyledLinks>

      {/* Mobile Menu Button */}
      <MenuButton onClick={toggleMenu}>
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.63574 6..." fill="currentColor" />
        </svg>
      </MenuButton>

      {/* Mobile Dropdown Menu */}
      <MobileMenu open={menuOpen} backgroundColor={backgroundColor}>
        <StyledMobileLinks>{children}</StyledMobileLinks>
      </MobileMenu>

      {/* Theme Switch */}
      <StyledDiv>
        {mode === 'dark' ? (
          <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.9731..." fill="currentColor" />
          </svg>
        ) : (
          <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.17172..." fill="currentColor" />
          </svg>
        )}
        <Switch
          checked={mode === 'dark'}
          onChange={toggleTheme}
          slotProps={{
            thumb: {
              style: {
                backgroundColor: 'var(--background)', // Customize thumb color
              },
            },
            track: {
              style: {
                backgroundColor: 'var(--text)', // Customize track color
              },
            },
            input: {
              'aria-label': 'Theme Switch',
            },
          }}
        />
      </StyledDiv>
    </StyledFloatingNavBar>
  );
}

export default FloatingNavBar;
