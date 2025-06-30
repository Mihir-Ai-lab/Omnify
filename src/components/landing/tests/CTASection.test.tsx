import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CTASection from '../CTASection';

describe('CTASection', () => {
  it('renders Book Your Demo and Join Waitlist buttons', () => {
    render(<CTASection />);
    expect(screen.getByText(/book your demo/i)).toBeInTheDocument();
    expect(screen.getByText(/join waitlist/i)).toBeInTheDocument();
  });
}); 