/*
 * forgerock-device-match-script
 *
 * java-globals.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

global.logger = {
  message: (txt) => {
    console.log(txt);
  },
  debug: (txt) => {
    console.debug(txt);
  },
  error: (txt) => {
    console.error(txt);
  },
};

global.outcome = '';
