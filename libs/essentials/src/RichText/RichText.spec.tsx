import { render } from '@testing-library/react';

import RichText from './RichText';

describe('RichText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RichText />);
    expect(baseElement).toBeTruthy();
  });
});
