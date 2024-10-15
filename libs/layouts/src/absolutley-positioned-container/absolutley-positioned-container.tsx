import React from 'react';
import styled from 'styled-components';

interface ContainerProps {
  top?: string;
  left?: string;
}

const StyledAbsolutleyPositionedContainer = styled.div<ContainerProps>`
  position: absolute;
  top: ${(props) => props.top || '0'};
  left: ${(props) => props.left || '0'};
  transform: translate(-50%, -50%);
  overflow: visible;
`;

const SVGWrapper = styled.div`
  position: absolute;
  z-index: 1;
`;

export interface AbsolutleyPositionedContainerProps extends ContainerProps {
  children?: React.ReactNode;
  svg?: string;  // Now svg is expected to be a string (path to the SVG)
}

export function AbsolutleyPositionedContainer({ 
  top, 
  left, 
  children, 
  svg 
}: AbsolutleyPositionedContainerProps) {
  return (
    <StyledAbsolutleyPositionedContainer top={top} left={left}>
      {svg && (
        <SVGWrapper>
          {/* Render the SVG using an img tag */}
          <img src={svg} alt="background svg" />
        </SVGWrapper>
      )}
      {children}
    </StyledAbsolutleyPositionedContainer>
  );
}

export default AbsolutleyPositionedContainer;
