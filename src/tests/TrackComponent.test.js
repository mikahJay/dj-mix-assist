import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TrackComponent from '../TrackComponent';
import TrackList from './fixtures/TrackList';

// depends on sample track in ./fixtures/TrackList, "Thank You (Not So Bad)"
it('renders the track from the test fixture', () => {
  render(<TrackComponent track={TrackList[0]} />);
  expect(screen.getByText(/Thank You \(Not So Bad\)/)).toBeInTheDocument();
});

it('toggles the + and - when button clicked', () => {
  render(<TrackComponent track={TrackList[0]} setSelectedTracks={jest.fn()}/>);
  const button = screen.getByTestId(TrackList[0].href);
  fireEvent.click(button);
  expect(button).toHaveTextContent('-');
  fireEvent.click(button);
  expect(button).toHaveTextContent('+');
  fireEvent.click(button);
  expect(button).toHaveTextContent('-');
});
