import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import BillingPortal from '../BillingPortal';

describe('BillingPortal', () => {
  it('renders at least one Billing text', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <BillingPortal />
        </AuthProvider>
      </MemoryRouter>
    );
    const billingElements = screen.getAllByText(/billing/i);
    expect(billingElements.length).toBeGreaterThan(0);
  });
}); 