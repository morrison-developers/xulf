import { render } from '@testing-library/react';
import Embed from './Embed';

describe('Embed', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Embed embedContent="<div>Yo</div>" />);
    expect(baseElement).toBeTruthy();
  });
});
