import { render } from '@testing-library/react';

import LinkTree from './LinkTree';

describe('LinkTree', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LinkTree />);
    expect(baseElement).toBeTruthy();
  });
});
