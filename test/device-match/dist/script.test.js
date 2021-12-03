/*
 * forgerock-device-match-script
 *
 * script.test.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

const incoming = require('../data/test-profile');
const stored = require('../data/test-profile');

beforeAll(() => {
  global.sharedState = {
    get: (path) => {
      switch (path) {
        case 'realm':
          return { asString: () => 'root' };
        case 'forgeRock.device.profile':
          return {
            toString: () => JSON.stringify(incoming)
          };
        case 'username':
          return { asString: () => 'tester' };
      }
    }
  };

  global.deviceProfilesDao = {
    getDeviceProfiles: () => ({
      size: () => 1,
      get: () => [JSON.stringify(stored)]
    })
  };
});

describe('Test the built script', () => {
  it('matching profiles should match with "true"', async () => {
    await import('../../../dist/device-match');
    expect(outcome).toBe('true');
  });
});
