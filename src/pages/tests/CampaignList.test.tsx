import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import CampaignList from '../CampaignList';

describe('CampaignList', () => {
  it('renders at least one Campaigns text', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CampaignList />
        </AuthProvider>
      </MemoryRouter>
    );
    const campaignsElements = screen.getAllByText(/campaigns/i);
    expect(campaignsElements.length).toBeGreaterThan(0);
  });
}); 