import { render, screen, act, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import SearchComponent from '../SearchComponent';
import ApiWrapper from '../ApiWrapper';
import SelectableListComponent from '../SelectableListComponent';

// dummy track-list with single track
const single_track = [{"id":1,"tracks": [{"id":1}], "artists": [{"name":"artist-1"}]}];
const double_track = [
  {"id":1,"tracks": [{"id":1}], "artists": [{"name":"artist-1"}]},
  {"id":2,"tracks": [{"id":2}], "artists": [{"name":"artist-2"}]}
];


it('renders empty list when no tracks provided', () => {
  render(<SelectableListComponent items={[]} />);
  expect(screen.getByText('All Items')).toBeInTheDocument();
});

it('tracks have white background initially', () => {
  render(<SelectableListComponent items={ double_track } />);
  double_track.map((track) => {
    expect(screen.getByTestId('selectable-item-' + track.id)).toHaveStyle({backgroundColor: '#f8f9fa'});
  });
});

// THIS TEST CANNOT BE DONE HERE, MOVING THIS TO App.test.js
// // TODO: figure out how to get the color trigger working in a test, right now it can't
// // because it needs a legit onToggle that carries state. useState doesn't work in this
// // kind of unit test.
// 
// it('tracks have green background when selected', async () => {
//   // because this changes state, need to stub an onToggle function
//   const onToggle = () => {
//     console.log('mock onToggle function');
//   }
//   render(<SelectableListComponent items={ double_track } selectedItems={[]} onToggle={onToggle} />);
// 
//   await Promise.all(double_track.map(async (track)  => {
//     let list_item = screen.getByTestId('selectable-item-' + track.id);
//     fireEvent.click(list_item);
//   }));
// 
//   double_track.map((track) => {
//     let list_item = screen.getByTestId('selectable-item-' + track.id);
// //    expect(list_item).toHaveStyle({backgroundColor: '#d1e7dd'});
//   });
// });
