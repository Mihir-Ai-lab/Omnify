import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import Settings from '../Settings';

describe('Settings', () => {
  it('renders at least one Settings text', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Settings />
        </AuthProvider>
      </MemoryRouter>
    );
    const settingsElements = screen.getAllByText(/settings/i);
    expect(settingsElements.length).toBeGreaterThan(0);
  });
}); 