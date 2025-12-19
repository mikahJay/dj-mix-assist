import ApiWrapper from '../ApiWrapper';

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
