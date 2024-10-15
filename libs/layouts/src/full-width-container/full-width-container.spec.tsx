import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';

import FullWidthContainer from './full-width-container';

describe('FullWidthContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FullWidthContainer />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a width of 100%', () => {
    const { container } = render(<FullWidthContainer />);
    const element = container.firstChild as HTMLElement;
    expect(window.getComputedStyle(element).width).toBe('100%');
  });
});
