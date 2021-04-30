import { SharedState } from './interfaces';
import greet from './greet';

declare var outcome: string;
declare var sharedState: SharedState;

const username = sharedState.get('username').asString();

outcome = greet(username);
