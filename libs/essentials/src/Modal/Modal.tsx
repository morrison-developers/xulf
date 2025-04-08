import styled from 'styled-components';

const StyledModal = styled.div`
  color: pink;
`;

export function Modal() {
  return (
    <StyledModal>
      <h1>Welcome to Modal!</h1>
    </StyledModal>
  );
}

export default Modal;
