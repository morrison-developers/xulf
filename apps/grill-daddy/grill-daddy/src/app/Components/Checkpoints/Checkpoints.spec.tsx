import { render } from '@testing-library/react';

import Checkpoints from './Checkpoints';

describe('Checkpoints', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Checkpoints />);
    expect(baseElement).toBeTruthy();
  });
});
