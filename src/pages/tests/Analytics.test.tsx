import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import Analytics from '../Analytics';

describe('Analytics', () => {
  it('renders the analytics heading', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Analytics />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/analytics/i)).toBeInTheDocument();
  });
}); 