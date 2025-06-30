import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../../contexts/AuthContext';
import Sidebar from '../Sidebar';

describe('Sidebar', () => {
  it('renders the sidebar navigation', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Sidebar />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/settings/i)).toBeInTheDocument();
  });
}); 