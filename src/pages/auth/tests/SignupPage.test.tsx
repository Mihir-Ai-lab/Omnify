import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../../contexts/AuthContext';
import SignupPage from '../SignupPage';

describe('SignupPage', () => {
  it('renders the create your account heading', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <SignupPage />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/create your account/i)).toBeInTheDocument();
  });
}); 