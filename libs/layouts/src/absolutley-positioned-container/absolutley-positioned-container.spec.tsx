import { render } from '@testing-library/react';

import AbsolutleyPositionedContainer from './absolutley-positioned-container';

describe('AbsolutleyPositionedContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AbsolutleyPositionedContainer />);
    expect(baseElement).toBeTruthy();
  });
});
