import { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ContactInner } from "./Contact/Contact";
import { AboutInner } from './About/About';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
// Styled component for the navigation bar
const StyledNavBar = styled.nav`
  display: flex;
  gap: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 23em;
  padding: 1rem;
  z-index: 10;
  justify-content: flex-start;

  animation: ${fadeIn} 0.5s ease-in-out;
  
  @media (max-width: 47em) {
    position: absolute;
    height: fit-content;
    width: 96vw;
    padding: 1rem;
    background: linear-gradient(to bottom, rgba(44, 103, 156, 0.4), rgba(52, 119, 176, 0.4));
    backdrop-filter: blur(10px);
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    bottom: 0.5rem;
    top: auto;
    left: 50%;
    transform: translateX(-50%);
    justify-content: center;
  }

  button {
    background: none;
    border: 1px solid white;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background: linear-gradient(to bottom, rgba(44, 103, 156, 0.4), rgba(52, 119, 176, 0.4));
    }

    &.active {
      background: linear-gradient(to bottom, rgba(44, 103, 156, 0.4), rgba(52, 119, 176, 0.4));
      border-color: rgba(255, 255, 255, 0.7);
    }

    @media (max-width: 47em) {
      width: 20%;
      font-size: 0.7rem;
      padding: 10px 0;
    }
  }
`;

// Styled content box using motion.div for animation
const ContentBox = styled(motion.div)`
  background: linear-gradient(to bottom, rgba(44, 103, 156, 0.4), rgba(52, 119, 176, 0.4));
  backdrop-filter: blur(10px);
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  z-index: 2;
  position: absolute;
  top: 4rem;
  left: 1rem;
  max-width: 23em;
  width: 23em;
  color: white;
  max-height: 40em;
  padding: 2rem;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 47em) {
    bottom: 5rem;
    width: 96vw;
    z-index: 2;
    top: auto;
    left: 50%;
    transform: translateX(-50%);
    max-height: 26em;
  }
`;

// Inner wrapper to ensure scrolling inside the padded area with reversed scroll indicators
const InnerContent = styled.div<InnerContentProps>`
  max-height: calc(40em - 4rem); /* Subtract the padding (2rem top and bottom) from the height */
  overflow-y: auto; /* Enable vertical scrolling */
  box-sizing: border-box; /* Padding is included in the size calculation */
  position: relative;

  /* Hide scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar */
  }

  /* Hide scrollbar for Firefox */
  scrollbar-width: none; /* Hide scrollbar */

  /* Adding a white shadow for top and bottom, removing based on scroll position */
  box-shadow: ${({ isScrollable, isScrolledToTop, isScrolledToBottom }) => {
    if (!isScrollable) {
      // No shadows when content is smaller than the container
      return "none";
    }
    if (isScrolledToTop && !isScrolledToBottom) {
      // If scrolled to the top, remove the top shadow but keep the bottom shadow
      return "0px 10px 10px -10px rgba(255, 255, 255, 0.5)";
    } else if (!isScrolledToTop && isScrolledToBottom) {
      // If scrolled to the bottom, remove the bottom shadow but keep the top shadow
      return "0px -10px 10px -10px rgba(255, 255, 255, 0.5)";
    } else if (!isScrolledToTop && !isScrolledToBottom) {
      // In the middle: show both shadows
      return "0px -10px 10px -10px rgba(255, 255, 255, 0.5), 0px 10px 10px -10px rgba(255, 255, 255, 0.5)";
    } else {
      return "none";
    }
  }};
  transition: box-shadow 0.3s ease-in-out;

  @media (max-width: 47em) {
    max-height: calc(26em - 4rem); /* Adjust height for smaller screens */
  }
`;

// Define the props for InnerContent
interface InnerContentProps {
  isScrollable: boolean;
  isScrolledToTop: boolean;
  isScrolledToBottom: boolean;
  children: React.ReactNode;
}

const ScrollableContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isScrolledToTop, setIsScrolledToTop] = useState(true);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const innerContentRef = useRef<HTMLDivElement>(null);

  // Scroll event handler to toggle top and bottom shadows
  const handleScroll = () => {
    if (innerContentRef.current) {
      const scrollTop = innerContentRef.current.scrollTop;
      const scrollHeight = innerContentRef.current.scrollHeight;
      const clientHeight = innerContentRef.current.clientHeight;

      // Detect if the content is at the top
      setIsScrolledToTop(scrollTop === 0);

      // Detect if the content is at the bottom (more precise calculation)
      setIsScrolledToBottom(Math.ceil(scrollTop + clientHeight) >= scrollHeight);
    }
  };

  useEffect(() => {
    const ref = innerContentRef.current;
    if (ref) {
      // Check if the content is scrollable (i.e., content height exceeds container height)
      setIsScrollable(ref.scrollHeight > ref.clientHeight);

      // Add scroll event listener
      ref.addEventListener("scroll", handleScroll);
    }

    // Clean up event listener on unmount
    return () => {
      if (ref) {
        ref.removeEventListener("scroll", handleScroll);
      }
    };
  }, [children]); // Re-run this logic if the children content changes

  return (
    <InnerContent
      ref={innerContentRef}
      isScrollable={isScrollable}
      isScrolledToTop={isScrolledToTop}
      isScrolledToBottom={isScrolledToBottom}
    >
      {children}
    </InnerContent>
  );
};


// Example components
const About = () => (<ScrollableContent><AboutInner /></ScrollableContent>);
const Projects = () => (
  <ScrollableContent>
    <p>Project 1</p>
    <p>Project 2</p>
    <p>Project 3</p>
    <p>Project 4</p>
    <p>Project 5</p>
    <p>Project 6</p>
    <p>Project 7</p>
    <p>Project 8</p>
    <p>Project 9</p>
    <p>Project 10</p>
    <p>These are the Projects component.</p>
  </ScrollableContent>
);
const Calendar = () => <ScrollableContent>Here is the Calendar component.</ScrollableContent>;
const Contact = () => <ScrollableContent><ContactInner /></ScrollableContent>;

// NavBar component with Framer Motion animation
export const NavBar = (): JSX.Element => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [content, setContent] = useState<JSX.Element | null>(null);

  // Function to handle button clicks and toggle content visibility
  const handleButtonClick = (componentName: string, component: JSX.Element) => {
    if (activeComponent === componentName) {
      setActiveComponent(null); // Close the content if the same button is clicked
    } else {
      setContent(component); // Show new content directly
      setActiveComponent(componentName);
    }
  };

  return (
    <>
      <StyledNavBar>
        <button
          className={activeComponent === "about" ? "active" : ""}
          onClick={() => handleButtonClick("about", <About />)}
        >
          About
        </button>
        <button
          className={activeComponent === "projects" ? "active" : ""}
          onClick={() => handleButtonClick("projects", <Projects />)}
        >
          Projects
        </button>
        <button
          className={activeComponent === "calendar" ? "active" : ""}
          onClick={() => handleButtonClick("calendar", <Calendar />)}
        >
          Calendar
        </button>
        <button
          className={activeComponent === "contact" ? "active" : ""}
          onClick={() => handleButtonClick("contact", <Contact />)}
        >
          Contact
        </button>
      </StyledNavBar>

      <AnimatePresence>
        {activeComponent && (
          <ContentBox
            key={activeComponent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {content}
          </ContentBox>
        )}
      </AnimatePresence>
    </>
  );
};
