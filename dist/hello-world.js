(function(){'use strict';

/** ************************************************************************
 * FORGEROCK | AM SCRIPT MANAGER
 * 
 * hello-world.js
 * 
 *  Copyright (c) 2020 ForgeRock. All rights reserved.
 *  This software may be modified and distributed under the terms
 *  of the MIT license. See the LICENSE file for details.
 * 
 * *************************************************************************
 * 
 * THIS IS A GENERATED FILE. Do not directly modify.
 * For more information about this file, visit this Github repo:
 * https://github.com/ForgeRock/forgerock-am-script-manager.
 * 
 * If you would like to modify this script or use it as a reference
 * for building your own matching script, we recommend cloning the git
 * repo above and use it as a development toolkit to get started.
 * *************************************************************************/

var greet = (function (name) {
    if (name === void 0) { name = 'World'; }
    return "Hello, " + name + "!";
});/**
 * Import functionality from modules for better organization and testability
 */
/**
 * Interact with environment in index file
 */
var username = sharedState.get('username').asString();
/**
 * Once all environmental data is collected, call modular code
 */
outcome = greet(username);}());