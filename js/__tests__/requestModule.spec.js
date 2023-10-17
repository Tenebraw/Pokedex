/* eslint-env jest */
/// <reference types="Jest"/>


import { secondCall } from '../requestModule';

test('secondCall fetches data from a URL', async () => {
  const mockData = { name: 'Pikachu' };
  const mockResponse = { json: () => mockData };
  global.fetch = jest.fn().mockResolvedValue(mockResponse);

  const data = await secondCall('https://example.com/some-url');
  expect(data).toEqual(mockData);
});
