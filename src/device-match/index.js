/** *****************************************************************
 * forgerock-device-match-script
 *
 * index.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 * ******************************************************************
 *
 * The following is a simple but production ready device matching
 * script for AM. You are welcome to use it as-is, modify or extend.
 * More info can be found in the README.md of this project
 *
 * Global node variables accessible within this scope:
 * 1. `sharedState` provides access to incoming request
 * 2. `deviceProfilesDao` provides access to stored profiles
 * 3. `outcome` variable maps to auth tree node outcomes; values are
 *    'true', 'false', or 'doesNotExist' (notice _all_ are strings).
 * ******************************************************************/

 import { deviceMatcher } from './profile';

/**
 * The variable `outcome` is a global variable to which the result of the
 * matching is assigned. The values are 'true', 'false' or 'doesNotExist',
 * notice the values are of type `string`.
 *
 * Here, we are going to default to 'doesNotExist', which allows us to
 * only worry about the condition of finding the profile
 */
outcome = 'doesNotExist';

function processDeviceProfiles() {

  /**
   * Get the incoming request's device profile.
   * Returns serialized JSON (type string); parsing this will result a
   * native JS object.
   */
  const incomingJson = sharedState.get('forgeRock.device.profile').toString();
  let incoming = null;

  try {
    incoming = JSON.parse(incomingJson);
  } catch (err) {
    // If we can't parse it, just log and exit function
    logger.message(`Error parsing incoming profile: ${err.message}`);
    return;
  }

  /**
   * Get the incoming user's username and realm.
   * Notice the use of `.asString()`.
   */
  const username = sharedState.get('username').asString();
  const realm = sharedState.get('realm').asString();

  /**
   * Get the user's stored profiles for appropriate realm.
   * Returns a _special_ object with methods for profile data
   */
  const storedProfiles = deviceProfilesDao.getDeviceProfiles(username, realm);

  if (!storedProfiles) {
    return;
  }

  // NOTE: `.size()` method returns the number of stored profiles
  for (let i = 0; i < storedProfiles.size(); i++) {
    let stored = null;
    try {
      stored = JSON.parse(storedProfiles.get(i));
    } catch (err) {
      // If we can't parse it, just log and continue with the next profile
      logger.message(`Error parsing stored profile: ${err.message}`);
      continue;
    }

    /**
     * Find a stored profile with the same identifier.
     */
    if (incoming.identifier === stored.identifier) {
      /**
       * Optionally configure `deviceMatcher` with your desired settings.
       * More information can be found in this projects README.md.
       *
       * const config = {
       *   allowedRadius: 250, // <number> defaults to 100 meters
       *   attrWeights: {
       *     deviceMemory: 3 // <number> all attributes default to 1
       *     // ... as many attributes as you want to weigh
       *   },
       *   maxUnmatchedAttrs: 2, // <number> default to 0
       * };
       *
       * const [metadataMatch, locationMatch] = deviceMatcher(config);
       */
      const [metadataMatch, locationMatch] = deviceMatcher();
      const isMetadataMatching = metadataMatch(incoming.metadata, stored.metadata);
      const isLocationMatching = locationMatch(incoming.location, stored.location);

      /**
       * Assign string of 'true' or 'false' respective of the outcome.
       */
      outcome = (isMetadataMatching && isLocationMatching).toString();
      return;
    }
  }
}

processDeviceProfiles();
