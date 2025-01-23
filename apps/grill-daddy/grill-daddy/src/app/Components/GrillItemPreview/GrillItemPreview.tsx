import React, { useState } from 'react';
import styled from 'styled-components';
import { useGrill } from '../../context/GrillContext';
import { GrillItem, GrillItemForm } from '../../registry';

const StyledPreviewSection = styled.div`
  margin: 1rem 4rem;
  max-width: 44em;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  background-color: #f9f9f9;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    border-bottom: 1px solid #ddd;

    &:last-child {
      border-bottom: none;
    }

    .details {
      display: flex;
      flex-direction: column;
    }

    button {
      margin-left: 10px;
      padding: 5px 10px;
      border: none;
      border-radius: 3px;
      cursor: pointer;
    }

    .delete-button {
      background-color: #f44336;
      color: white;
    }

    .edit-button {
      background-color: #2196f3;
      color: white;
    }
  }

  .total-time {
    font-weight: bold;
    margin-top: 15px;
    text-align: right;
  }
`;

export default function GrillItemPreview() {
  const { state, dispatch } = useGrill();

  const handleDelete = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const calculateTotalCookTime = () => {
    return state.activeGrillItems.reduce((total, item) => total + item.cookTime, 0);
  };

  function camelCaseToPlainText(camelCaseString: string): string {
    return camelCaseString
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // Add space before uppercase letters
      .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Handle consecutive uppercase letters
      .toLowerCase() // Convert to lowercase
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  };

  return (
    <StyledPreviewSection>
      <h2>Items on the Grill</h2>
      {state.activeGrillItems.map((item) => (
        <div key={item.id} className="item">
          <div className="details">
            <span><strong>{item.name}</strong></span>
            <span>{camelCaseToPlainText(item.targetTemp)}</span>
          </div>
          <div>
            <button
              className="delete-button"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {state.activeGrillItems.length > 0 && (
        <div className="total-time">
          Estimated Total Cook Time: {calculateTotalCookTime()} minutes
        </div>
      )}

      {state.activeGrillItems.length === 0 && (
        <p>No items added yet. Add some items to get started!</p>
      )}
    </StyledPreviewSection>
  );
}
