/*
 * forgerock-device-match-script
 *
 * script.test.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import '../../../dist/hello-world';

describe('Test the built script', () => {
  it('matching profiles should match with "true"', () => {
    expect(outcome).toBe('Hello, tester!');
  });
});
