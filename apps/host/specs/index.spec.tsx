import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../src/app/page';

describe('Page', () => {
  it('renders the default widget shell', async () => {
    render(<Page />);

    await waitFor(() => {
      expect(screen.getByText('Notes')).toBeInTheDocument();
      expect(screen.getByText('Pomodoro')).toBeInTheDocument();
      expect(screen.getByText('Productivity Insights')).toBeInTheDocument();
      expect(screen.getByText('Task Board')).toBeInTheDocument();
    });
  });
});
