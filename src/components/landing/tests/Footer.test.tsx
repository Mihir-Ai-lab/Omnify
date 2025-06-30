import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders the footer copyright', () => {
    render(<Footer />);
    const omnifyElements = screen.getAllByText(/omnify/i);
    expect(omnifyElements.length).toBeGreaterThan(0);
  });
}); 