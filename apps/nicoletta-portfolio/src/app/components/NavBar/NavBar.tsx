import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ContactInner } from "../Contact/Contact";

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
  overflow-y: auto; /* Enable scrolling if content exceeds the max height */
  padding: 2rem; /* Safe zone padding around the edges */
  color: white;
  max-height: 40em;
  
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

// Inner wrapper to ensure padding on scroll
const InnerContent = styled.div`
  padding: 1rem; /* Inner content padding to give space within the scrollable area */
`;

// Define the components for each section
const About = () => <InnerContent>Write a biography / main read</InnerContent>;
const Projects = () => (
  <InnerContent>
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
  </InnerContent>
);
const Calendar = () => <InnerContent>Here is the Calendar component.</InnerContent>;
const Contact = () => <InnerContent><ContactInner /></InnerContent>;

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
