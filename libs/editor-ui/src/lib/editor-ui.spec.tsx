import { render } from '@testing-library/react';

import EditorUi from './editor-ui';

describe('EditorUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditorUi />);
    expect(baseElement).toBeTruthy();
  });
});
