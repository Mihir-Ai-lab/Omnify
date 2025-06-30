import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import InvoiceList from '../InvoiceList';

describe('InvoiceList', () => {
  it('renders the invoice list heading', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <InvoiceList />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/invoice/i)).toBeInTheDocument();
  });
}); 