import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import HelpSupport from '../HelpSupport';

describe('HelpSupport', () => {
  it('renders at least one Help & Support heading', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <HelpSupport />
        </AuthProvider>
      </MemoryRouter>
    );
    const helpSupportElements = screen.getAllByText(/help & support/i);
    expect(helpSupportElements.length).toBeGreaterThan(0);
  });
}); 