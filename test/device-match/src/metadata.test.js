/*
 * forgerock-device-match-script
 *
 * metadata.test.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { metadataMatcher } from '../../../src/device-match/metadata';
import similarProfile from '../data/similar-profile';
import storedProfile from '../data/stored-profile';
import unmatchingProfile from '../data/unmatching-profile';
import missingPropsProfile from '../data/missing-props-profile';
import unmatchingWeightedProfile from '../data/unmatching-weighted-profile';

const a = { num: 1, undef: undefined, nulla: null, obj: { alpha: 'a', beta: 'b' }, arr: [ 'one', 'two' ] };
const b = { num: 1, undef: undefined, nulla: null, obj: { alpha: 'a', beta: 'c' }, arr: [ 'one', 'three' ] };
const c = { num: 4, undef: undefined, nulla: null, obj: { alpha: 'c', beta: 'b' }, arr: [ 'two', 'three' ] };
const attrWeights = {
  'deviceMemory': 3,
  'fonts': 2,
  'hardwareConcurrency': 3,
  'maxTouchPoints': 2,
  'platform': 3,
  'userAgent': 'two',
};

describe('Test simple objects with diverse value types', () => {
  it('should return true for exact profile match', () => {
    const metadataMatch = metadataMatcher();
    expect(metadataMatch(a, a)).toBe(true);
  });

  it('should return true for allowed number of mismatch', () => {
    const metadataMatch = metadataMatcher({}, 2);
    expect(metadataMatch(a, b)).toBe(true);
  });

  it('should return false for exceeding allowed mismatch', () => {
    const metadataMatch = metadataMatcher({ num: 3 }, 2);
    expect(metadataMatch(a, c)).toBe(false);
  });
});

describe('Test actual profiles', () => {
  it('should return true for exact profile match', () => {
    const metadataMatch = metadataMatcher(attrWeights, 2);
    expect(metadataMatch(storedProfile.metadata, storedProfile.metadata)).toBe(true);
  });

  it('should return true for allowed number of mismatch', () => {
    const metadataMatch = metadataMatcher(attrWeights, 2);
    expect(metadataMatch(similarProfile.metadata, storedProfile.metadata)).toBe(true);
  });

  it('should return false for exceeding allowed mismatch', () => {
    const metadataMatch = metadataMatcher(attrWeights, 2);
    expect(metadataMatch(unmatchingProfile.metadata, storedProfile.metadata)).toBe(false);
  });

  it('should return false for unmatched single, but highly weighted property', () => {
    const metadataMatch = metadataMatcher(attrWeights, 2);
    expect(metadataMatch(unmatchingWeightedProfile.metadata, storedProfile.metadata)).toBe(false);
  });

  it('should return false, and not crash, for missing props allowed mismatch', () => {
    const metadataMatch = metadataMatcher(attrWeights, 2);
    expect(metadataMatch(missingPropsProfile.metadata, storedProfile.metadata)).toBe(false);
  });
});
