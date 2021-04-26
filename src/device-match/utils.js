/*
 * forgerock-device-match-script
 *
 * utils.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

export function isPrimitive(val) {
  const primitives = ['boolean', 'string', 'number', 'undefined'];
  return primitives.indexOf(typeof val) !== -1;
}

export function getMultiplier(attr, attrWeights) {
  return typeof attrWeights[attr] === 'number'
    ? attrWeights[attr]
    : 1;
}
