import { render, screen } from '@testing-library/react';
import App from '../App';

it('renders the SearchComponent', () => {
  render(<App />);
  expect(screen.getByText('Search Tracks from Spotify')).toBeInTheDocument();
});

it('renders an empty TrackListComponent on initial load', () => {
  render(<App />);
  expect(screen.queryByText('Track List:')).not.toBeInTheDocument();
  expect(screen.queryByText('No results found.')).toBeInTheDocument();
});
