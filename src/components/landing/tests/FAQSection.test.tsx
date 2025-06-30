import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FAQSection from '../FAQSection';

describe('FAQSection', () => {
  it('renders the FAQ heading', () => {
    render(<FAQSection />);
    expect(screen.getByText(/frequently asked questions/i)).toBeInTheDocument();
  });
}); 