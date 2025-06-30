import React from 'react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import TeamManagement from '../TeamManagement';

describe('TeamManagement', () => {
  it('renders the team management heading', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <TeamManagement />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/team management/i)).toBeInTheDocument();
  });
}); 