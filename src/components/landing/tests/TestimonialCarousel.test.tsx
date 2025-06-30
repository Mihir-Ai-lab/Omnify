import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestimonialCarousel from '../TestimonialCarousel';

describe('TestimonialCarousel', () => {
  it('renders the testimonials section', () => {
    render(<TestimonialCarousel />);
    expect(screen.getByText(/testimonials/i)).toBeInTheDocument();
  });
}); 