import styled from 'styled-components';

interface ContainerProps {
  top?: string;
  left?: string;
}

const StyledAbsolutleyPositionedContainer = styled.div<ContainerProps>`
  position: absolute;
  top: ${props => props.top || '0'};
  left: ${props => props.left || '0'};
`;

export interface AbsolutleyPositionedContainerProps extends ContainerProps {
  children?: React.ReactNode;
}

export function AbsolutleyPositionedContainer({ top, left, children }: AbsolutleyPositionedContainerProps) {
  return (
    <StyledAbsolutleyPositionedContainer top={top} left={left}>
      {children}
    </StyledAbsolutleyPositionedContainer>
  );
}

export default AbsolutleyPositionedContainer;
