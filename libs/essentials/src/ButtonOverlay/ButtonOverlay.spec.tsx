import { render } from '@testing-library/react';

import ButtonOverlay from './ButtonOverlay';

describe('ButtonOverlay', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ButtonOverlay />);
    expect(baseElement).toBeTruthy();
  });
});
