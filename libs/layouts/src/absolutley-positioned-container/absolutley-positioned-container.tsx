import styled from 'styled-components';

interface ContainerProps {
  top?: string;
  left?: string;
}

const StyledAbsolutleyPositionedContainer = styled.div<ContainerProps>`
  position: absolute;
  top: ${props => props.top || '50%'};
  left: ${props => props.left || '50%'};
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
`;

const SVGWrapper = styled.div`
  position: absolute;
  z-index: -1;
`;

export interface AbsolutleyPositionedContainerProps extends ContainerProps {
  children?: React.ReactNode;
  svg?: React.ReactNode;
}

export function AbsolutleyPositionedContainer({ 
  top, 
  left, 
  children, 
  svg 
}: AbsolutleyPositionedContainerProps) {
  return (
    <StyledAbsolutleyPositionedContainer top={top} left={left}>
      {svg && <SVGWrapper>{svg}</SVGWrapper>}
      {children}
    </StyledAbsolutleyPositionedContainer>
  );
}

export default AbsolutleyPositionedContainer;
