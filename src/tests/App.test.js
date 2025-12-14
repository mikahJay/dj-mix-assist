import { render, screen } from '@testing-library/react';
import App from '../App';

const double_track = [ 
  {"id":1,"tracks": [{"id":1}], "artists": [{"name":"artist-1"}]},
  {"id":2,"tracks": [{"id":2}], "artists": [{"name":"artist-2"}]}
];


it('renders the SearchComponent', () => {
  render(<App />);
  expect(screen.getByText('Search Tracks from Spotify')).toBeInTheDocument();
});

it('toggles the color of a selected item to green', async () => {

  // loop through tracks, select each one, and validate (after awaiting) that
  // the item's background color has changed
  double_track.map((track) => {  
    let list_item = screen.getByTestId('selectable-item-' + track.id);
    console.log('list_item = ' + list_item);
//     await act((async) => {
//       expect(list_item).toHaveStyle('backgroundColor', '#d1e7dd');
//     });
  });
});

// it('renders an empty SelectableListComponent on initial load', () => {
//   render(<App />);
//   expect(screen.queryByText('Track List:')).not.toBeInTheDocument();
//   expect(screen.queryByText('No results found.')).toBeInTheDocument();
// });
