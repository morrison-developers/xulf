import { render } from '@testing-library/react';
import LinkTree from './LinkTree';

describe('LinkTree', () => {
  it('should render successfully', () => {
    const links = [
      { url: 'https://example.com', text: 'Example', icon: '🌟' },
      { url: 'https://google.com', text: 'Google', icon: '🔍' },
    ];

    const { baseElement } = render(<LinkTree links={links} />);
    expect(baseElement).toBeTruthy();
  });
});
