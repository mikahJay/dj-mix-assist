import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectedItemsListComponent from '../SelectedItemsListComponent';

it('shows no item selected if there are no items', () => {
  render(<SelectedItemsListComponent />);
  expect(screen.queryByTestId('no-selected-text').textContent).toBe('No items selected');
});

it('shows each selected item', () => {
  render(<SelectedItemsListComponent items={[]} />);
});
