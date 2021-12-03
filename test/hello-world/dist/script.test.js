/*
 * forgerock-device-match-script
 *
 * script.test.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

beforeAll(() => {
  global.sharedState = {
    get: (path) => {
      switch (path) {
        case 'username':
          return { asString: () => 'test_user' };
      }
    }
  };
});

describe('Test the built script', () => {
  it('matching profiles should match with "true"', async () => {
    await import('../../../dist/hello-world');
    expect(outcome).toBe('Hello, test_user!');
  });
});
