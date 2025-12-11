import { useRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchComponent from '../SearchComponent';
import { ApiWrapper } from '../ApiWrapper';

it('renders empty search box and button', () => {
  render(<SearchComponent />);
  expect(screen.getByText('Search Tracks from Spotify')).toBeInTheDocument();
  expect(screen.getByTestId('search-text')).toBeVisible();
  expect(screen.getByTestId('search-button')).toBeVisible();
  expect(screen.queryByTestId('error-text')).toBeNull();
});

it('errors when no text is entered and search is clicked', () => {
  render(<SearchComponent setResults={jest.fn()} />);
  const button = screen.getByTestId('search-button');
  fireEvent.click(button);
  expect(screen.getByText('Please enter a search term.')).toBeInTheDocument();
});

it('invokes a search when text is entered and search is clicked', () => {

  render(<SearchComponent setResults={jest.fn()} />);
  const button = screen.getByTestId('search-button');
  const search = screen.getByTestId('search-text');
  httpRequestWrapper = jest.fn().mockImplementation(() => { console.log('in mock implementation'); });
  userEvent.type(search, 'illuminate');
  fireEvent.click(button);
  expect(screen.queryByTestId('error-text')).toBeNull();
});
