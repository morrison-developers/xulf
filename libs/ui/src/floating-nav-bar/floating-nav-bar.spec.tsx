import { render } from '@testing-library/react';

import FloatingNavBar from './floating-nav-bar';

describe('FloatingNavBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FloatingNavBar />);
    expect(baseElement).toBeTruthy();
  });
});
