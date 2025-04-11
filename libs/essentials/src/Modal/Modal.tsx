interface ModalProps {
  isOpen: boolean;
  size?: 'small' | 'large' | 'full';
  isCentered?: boolean;
  backgroundColor?: string;
  borderRadius?: string;
  customStyles?: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  size = 'large',
  isCentered = true,
  backgroundColor = '#fff',
  borderRadius = '0px',
  customStyles = '',
  children,
}: ModalProps) {
  if (!isOpen) return null;

  const sizeClass = {
    small: 'w-[50vw]',
    large: 'w-[900px]',
    full: 'w-screen h-screen',
  }[size];

  return (
    <>
      <div className="fixed inset-0 bg-black/90 z-50" />
      <div
        className={`fixed z-50 top-${isCentered ? '1/2' : '1/5'} left-1/2 transform ${
          isCentered ? '-translate-x-1/2 -translate-y-1/2' : '-translate-x-1/2'
        } p-8 ${sizeClass} rounded-[${borderRadius}]`}
        style={{ backgroundColor }}
      >
        <div className={customStyles}>{children}</div>
      </div>
    </>
  );
}

export const editableProps = [
  { label: 'isOpen', type: 'boolean' },
  { label: 'size', type: 'text' },
  { label: 'isCentered', type: 'boolean' },
  { label: 'backgroundColor', type: 'text' },
  { label: 'borderRadius', type: 'text' },
  { label: 'customStyles', type: 'text' },
  { label: 'children', type: 'text' },
];
