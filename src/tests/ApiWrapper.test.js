import { waitFor } from '@testing-library/react';
import ApiWrapper from '../ApiWrapper';
import '@testing-library/jest-dom';

afterEach(() => {
  jest.restoreAllMocks();
});

it('httpRequestWrapper returns null when no auth provided', async () => {
  const apiWrapper = new ApiWrapper();
  const ret = await apiWrapper.httpRequestWrapper(null, null, null, null);
  expect(ret).toBeNull();
});

it('getAccessToken returns null when no auth provided', async () => {
  const apiWrapper = new ApiWrapper();
  const ret = await apiWrapper.getAccessToken(null, null, null);
  expect(ret).toBeNull();
});

it('httpRequestWrapper calls correct \'fetch\' and returns the data', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({"data": "hello world"}),
  });
  const apiWrapper = new ApiWrapper();
  const ret = await apiWrapper.httpRequestWrapper('na', 'na', null, null);
  await waitFor(() => {
    expect(ret).toStrictEqual({data: 'hello world'});
  });
});

it('getAccessToken calls correct \'fetch\' and returns only the access token', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({"access_token": "access_token1234"}),
  });
  const apiWrapper = new ApiWrapper();
  const ret = await apiWrapper.getAccessToken('na', 'na', 'na');
  await waitFor(() => {
    expect(ret).toBe("access_token1234");
  });
});
