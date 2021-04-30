/**
 * Import functionality from modules for better organization and testability
 */
import greet from './greet';

/**
 * Interact with environment in index file
 */
const username = sharedState.get('username').asString();

/**
 * Once all environmental data is collected, call modular code
 */
outcome = greet(username);
