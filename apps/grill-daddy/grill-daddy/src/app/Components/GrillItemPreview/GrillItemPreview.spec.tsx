import { render } from '@testing-library/react';

import GrillItemPreview from './GrillItemPreview';

describe('GrillItemPreview', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GrillItemPreview />);
    expect(baseElement).toBeTruthy();
  });
});
