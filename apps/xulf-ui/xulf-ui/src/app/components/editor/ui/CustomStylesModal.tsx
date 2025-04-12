import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';

interface FullScreenEditorModalProps {
  isOpen: boolean;
  initialValue: string;
  onClose: () => void;
  onSave: (css: string) => void;
}

export const FullScreenEditorModal = ({
  isOpen,
  initialValue,
  onClose,
  onSave,
}: FullScreenEditorModalProps) => {
  const [css, setCss] = useState(initialValue);

  const handleEditorChange = (value: string | undefined) => {
    setCss(value || '');
  };

  if (!isOpen) return null; // Don't render anything if the modal is not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-header">Edit Custom Styles</h2>
        <MonacoEditor
          value={css}
          language="css"
          height="80vh"
          onChange={handleEditorChange}
          theme="vs-dark"
        />
        <div className="modal-actions">
          <button onClick={onClose} className="modal-btn cancel-btn">
            Discard
          </button>
          <button
            onClick={() => {
              onSave(css);
              onClose();
            }}
            className="modal-btn save-btn"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// Inline CSS (You can adjust this to your style preferences)
const style = `
  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.9); /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 50;
  }

  .modal-content {
    background-color: white;
    padding: 24px;
    max-width: 80%;
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    overflow: auto;
  }

  .modal-header {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .modal-actions {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }

  .modal-btn {
    padding: 10px 16px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
  }

  .cancel-btn {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
  }

  .save-btn {
    background-color: #007bff;
    color: white;
    border: none;
  }
`;

// Inject styles directly into the document (optional)
const styleTag = document.createElement('style');
styleTag.innerHTML = style;
document.head.appendChild(styleTag);
