import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../../contexts/AuthContext';
import Header from '../Header';

describe('Header', () => {
  it('renders at least one Get Started button', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    );
    const getStartedElements = screen.getAllByText(/get started/i);
    expect(getStartedElements.length).toBeGreaterThan(0);
  });
}); 