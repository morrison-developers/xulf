import React from 'react';
import { render } from '@testing-library/react';

import Page from '../app/page';
import AboutPage from '../app/about/page';

describe('Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Page />);
    expect(baseElement).toBeTruthy();
  });
});

describe('AboutPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AboutPage />);
    expect(baseElement).toBeTruthy();
  });
});