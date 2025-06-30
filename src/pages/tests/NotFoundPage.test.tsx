import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';

describe('NotFoundPage', () => {
  it('renders at least one Not Found or 404 text', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    const notFoundElements = screen.getAllByText(/not found|404/i);
    expect(notFoundElements.length).toBeGreaterThan(0);
  });
}); 