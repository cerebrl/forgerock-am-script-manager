/*
 * forgerock-device-match-script
 *
 * location.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import getDistance from 'geolib/es/getDistance';

/**
 * @function locationMatcher - compares two sets of coordinates; checks distance with allowed radius
 * @param {number} allowedRadius - the number of allowed meters of distance
 * @returns {boolean}
 */
export function locationMatcher(allowedRadius = 100) {
  return function location(incoming, stored) {
    const distance = getDistance(incoming, stored);
    return distance < allowedRadius;
  };
}
