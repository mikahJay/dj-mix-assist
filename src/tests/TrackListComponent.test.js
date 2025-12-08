import { render, screen } from '@testing-library/react';
import TrackListComponent from '../TrackListComponent';
import TrackList from './fixtures/TrackList';

it('renders the TrackListComponent empty if there are no results', () => {
  render(<TrackListComponent results="" />);
  expect(screen.getByText('No results found.')).toBeInTheDocument();
});

// depends on sample track in ./fixtures/TrackList, "Thank You (Not So Bad)
it('renders the result list if there are results', () => {
  render(<TrackListComponent results={TrackList} />);
  expect(screen.queryByText('No results found.')).not.toBeInTheDocument();
  expect(screen.getByText('Track List:')).toBeInTheDocument();
  expect(screen.getByText(/Thank You (Not So Bad)*/)).toBeInTheDocument();
});
