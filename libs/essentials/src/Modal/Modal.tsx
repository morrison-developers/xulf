import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { globalEventBus } from '@xulf/utils';

const Overlay = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
`;

const ModalWrapper = styled.div<
  React.HTMLAttributes<HTMLDivElement> & {
    size: ModalProps['size'];
    isCentered?: boolean;
    backgroundColor?: string;
    borderRadius?: string;
    customStyles?: string;
  }
>`
  position: fixed;
  z-index: 1001;
  top: ${({ isCentered }) => (isCentered ? '50%' : '20%')};
  left: 50%;
  transform: ${({ isCentered }) =>
    isCentered ? 'translate(-50%, -50%)' : 'translateX(-50%)'};
  background: ${({ backgroundColor }) => backgroundColor || '#fff'};
  border-radius: ${({ borderRadius }) => borderRadius || '0px'};
  padding: 2rem;

  width: ${({ size }) => {
    switch (size) {
      case 'small':
        return '50vw';
      case 'large':
        return '900px';
      case 'full':
        return '100vw';
      default:
        return '600px';
    }
  }};

  height: ${({ size }) => (size === 'full' ? '100dvh' : 'auto')};

  ${({ customStyles }) => customStyles || ''}
`;

interface ModalProps {
  /** Unique module ID (used to receive open events) */
  id: string;
  size?: 'small' | 'large' | 'full';
  isCentered?: boolean;
  backgroundColor?: string;
  borderRadius?: string;
  customStyles?: string;
  children: React.ReactNode;
}

export default function Modal({
  id,
  size = 'large',
  isCentered,
  backgroundColor = '#fff',
  borderRadius = '0px',
  customStyles,
  children,
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    globalEventBus.on(`${id}:open`, handler);
    return () => globalEventBus.off(`${id}:open`, handler);
  }, [id]);

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={() => setIsOpen(false)} />
      <ModalWrapper
        size={size}
        isCentered={isCentered}
        backgroundColor={backgroundColor}
        borderRadius={borderRadius}
        customStyles={customStyles}
      >
        {children}
      </ModalWrapper>
    </>
  );
}

export const editableProps = [
  { label: 'id', type: 'text' },
  { label: 'size', type: 'text' },
  { label: 'isCentered', type: 'boolean' },
  { label: 'backgroundColor', type: 'text' },
  { label: 'borderRadius', type: 'text' },
  { label: 'customStyles', type: 'text' },
  { label: 'children', type: 'text' },
];
