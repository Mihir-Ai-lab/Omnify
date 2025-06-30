import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import CampaignForm from '../CampaignForm';

describe('CampaignForm', () => {
  it('renders the Campaign Name label', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CampaignForm />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/campaign name/i)).toBeInTheDocument();
  });
}); 