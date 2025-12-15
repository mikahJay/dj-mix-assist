import { render, act, screen, fireEvent } from '@testing-library/react';
import App from '../App';

const double_track = [ 
  {"id":1,"tracks": [{"id":1}], "artists": [{"name":"artist-1"}]},
  {"id":2,"tracks": [{"id":2}], "artists": [{"name":"artist-2"}]}
];


it('renders the SearchComponent', async () => {
  render(<App />);
  expect(screen.getByText('Search Tracks from Spotify')).toBeInTheDocument();
});

it('toggles the color of a selected item to green', async () => {

  render(<App initialItems={double_track} />);
  
  // loop through tracks, select each one, and validate (after awaiting) that
  // the item's background color has changed
  double_track.map((track) => {  
    let list_item = screen.getByTestId('selectable-item-' + track.id);
    expect(list_item).toHaveStyle(`background-color: #f8f9fa`);
    fireEvent.click(list_item);
    expect(list_item).toHaveStyle(`background-color: #d1e7dd`);
  });
});
