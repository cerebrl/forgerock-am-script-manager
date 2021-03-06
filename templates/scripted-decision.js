/** *****************************************************************
 * forgerock-am-script-manager
 *
 * scripted-decision.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 * ******************************************************************
 *
 * The following script is a simplified template for understanding
 * the basics of device matching. _This is not functionally complete._
 * For a functionally complete script as well as a development toolkit,
 * visit https://github.com/ForgeRock/forgerock-am-script-manager.
 *
 * Global node variables accessible within this scope:
 * 1. `sharedState` provides access to incoming request
 * 2. `outcome` variable maps to auth tree node outcomes; values are
 *     always are strings
 * ******************************************************************/


/**
 * Interaction with environment is best done here, in the index file
 */
const realm = sharedState.get('realm').asString();

/**
 * Declare fallback outcome value with type string
 */
outcome = '';

/**
 * Business logic starts here.
 * NOTE: We recommend writing any moderately complex logic or greater in
 * separate modules and import them for execution here. This allows for
 * better testability as they are isolated from the global APIs.
 */
if (realm === 'root') {
  outcome = 'top';
} else {
  outcome = 'sub';
}
