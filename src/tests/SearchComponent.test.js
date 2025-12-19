import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchComponent from '../SearchComponent';
import ApiWrapper from '../ApiWrapper';

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

it('shows no tracks found when api returns nothing', async () => {
  await act(async() => {
    const apiWrapper = new ApiWrapper();
    apiWrapper.httpRequestWrapper = jest.fn().mockImplementation(() => { return {}; } );
    render(<SearchComponent apiWrapper={apiWrapper} setResults={jest.fn()} />);
  });

  const button = screen.getByTestId('search-button');
  const search = screen.getByTestId('search-text');
  await act(async() => {
    userEvent.type(search, '....');
    fireEvent.click(button);
  });
  expect(screen.queryByTestId('error-text').textContent).toBe('No tracks found.');
});

it('shows no tracks when tracks are empty', async () => {
  await act(async() => {
    const apiWrapper = new ApiWrapper();
    apiWrapper.httpRequestWrapper = jest.fn().mockImplementation(() => { return {"tracks": [] }; } );
    render(<SearchComponent apiWrapper={apiWrapper} setResults={jest.fn()} />);
  });

  const button = screen.getByTestId('search-button');
  const search = screen.getByTestId('search-text');
  await act(async() => {
    userEvent.type(search, '....');
    fireEvent.click(button);
  });
  expect(screen.queryByTestId('error-text').textContent).toBe('No tracks found.');
});
