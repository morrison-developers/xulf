import { render } from '@testing-library/react';
import Page from '../src/app/page';
import { useRouter } from 'next/navigation';

// Mock the Next.js useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Page', () => {
  beforeEach(() => {
    // Mock router behavior
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  it('should render successfully', () => {
    const { baseElement } = render(<Page />);
    expect(baseElement).toBeTruthy();
  });
});
