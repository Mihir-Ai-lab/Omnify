import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer (layout)', () => {
  it('renders the layout footer', () => {
    render(<Footer />);
    const omnifyElements = screen.getAllByText(/omnify/i);
    expect(omnifyElements.length).toBeGreaterThan(0);
  });
}); 