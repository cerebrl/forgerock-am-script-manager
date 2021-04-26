/*
 * forgerock-device-match-script
 *
 * profile.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { locationMatcher } from './location';
import { metadataMatcher } from './metadata';

/**
 * @function deviceMatcher - factory function that returns configured match functions
 * @param {Object} config - configuration object for device matcher
 * @param {Object} config.attrWeights - object with keys matching desired attributes and assign number
 * @param {number} config.maxUnmatchedAttrs - allowed number of unmatched metadata before fail
 * @param {number} config.allowedRadius - allowed radius in meters between two profile locations
 * @returns {function[]} - first function is for metadata match and second is location
 */
function deviceMatcher(config = {}) {
  let { allowedRadius, attrWeights, maxUnmatchedAttrs } = config;
  let metadata = metadataMatcher(attrWeights, maxUnmatchedAttrs);
  let location = locationMatcher(allowedRadius);

  return [ metadata, location ];
}

export { deviceMatcher };

