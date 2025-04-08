import { render, screen, fireEvent } from '@testing-library/react';

import { Modal } from './Modal';
import { ButtonOverlay } from '../ButtonOverlay/ButtonOverlay'

describe('Modal', () => {
  it('should render modal after button click', () => {
    render(
      <>
        <Modal id="test">Test Modal Content</Modal>
        <ButtonOverlay modalTargetId="test">Open Modal</ButtonOverlay>
      </>
    );

    fireEvent.click(screen.getByText('Open Modal'));

    const modalContent = screen.queryByText('Test Modal Content');
    expect(modalContent).not.toBeNull();
  });
});
