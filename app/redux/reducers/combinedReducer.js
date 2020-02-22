import { combineReducers } from 'redux';

import simonsGame from './simons-game';
import sounds from './sounds';

const combinedReducer = combineReducers({ simonsGame, sounds });

export default combinedReducer;
