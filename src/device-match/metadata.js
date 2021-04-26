/*
 * forgerock-device-match-script
 *
 * metadata.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { isPrimitive, getMultiplier } from './utils';

/**
 * @function metadataMatcher - compares two metadata objects with allowable mismatches
 * @param {Object} attrWeights - object with weighted attributes and the assign number
 *     Example: { deviceMemory: 3 } // deviceMemory rarely changes, so more weight can be given
 * @param {number} maxUnmatchedAttrs - number of allowed unmatched attributes before failing
 * @returns {boolean}
 */
export function metadataMatcher(attrWeights = {}, maxUnmatchedAttrs = 0) {
  let numOfUnmatchedAttrs = 0;

  function arrayMatch(incoming, stored, key) {
    const len = stored.length;
    for (let i = 0; i < len; i++) {
      if (numOfUnmatchedAttrs > maxUnmatchedAttrs) { break; }
      const storedVal = stored[i];
      const incomingVal = incoming && incoming[i];
      checkValueOrCallNext(incomingVal, storedVal, key);
    }
  }

  function checkForMismatch(a, b, key) {
    if (a !== b) {
      const multiplier = getMultiplier(key, attrWeights);
      numOfUnmatchedAttrs = numOfUnmatchedAttrs + multiplier;
    }
  }

  function checkValueOrCallNext(incoming, stored, key) {
    if (isPrimitive(stored) || stored === null) { // null is not a primitive
      checkForMismatch(stored, incoming, key);
    } else if (Array.isArray(stored)) {
      arrayMatch(incoming, stored, key);
    } else {
      objectMatch(incoming, stored);
    }
  }

  function objectMatch(incoming, stored) {
    const keys = Object.keys(stored);
    for (const key of keys) {
      if (numOfUnmatchedAttrs > maxUnmatchedAttrs) { break; }
      const storedVal = stored[key];
      const incomingVal = incoming && incoming[key];
      checkValueOrCallNext(incomingVal, storedVal, key);
    }
  }

  return function (incomingProfile, storedProfile) {
    if (Array.isArray(incomingProfile)) {
      arrayMatch(incomingProfile, storedProfile);
    } else {
      objectMatch(incomingProfile, storedProfile);
    }
    return numOfUnmatchedAttrs <= maxUnmatchedAttrs;
  }
}
