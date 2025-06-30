import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import CampaignWizard from '../CampaignWizard';

describe('CampaignWizard', () => {
  it('renders the campaign wizard', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CampaignWizard />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/wizard/i)).toBeInTheDocument();
  });
}); 