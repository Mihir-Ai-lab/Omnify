import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import LandingPage from '../LandingPage';

describe('LandingPage', () => {
  it('renders at least one Ad Spend text', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LandingPage />
        </AuthProvider>
      </MemoryRouter>
    );
    const adSpendElements = screen.getAllByText(/ad spend/i);
    expect(adSpendElements.length).toBeGreaterThan(0);
  });
}); 