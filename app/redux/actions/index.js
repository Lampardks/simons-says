import { createAction } from 'redux-actions';
import * as s from '../constants';

import waiting from '../../utils/waiting';

import { WAIT } from '../../components/constants';

export const roundIncrease = createAction(s.ROUND_INCREASE, data => data);
export const resetGame = createAction(s.RESET_GAME);
export const startGame = createAction(s.START_GAME, data => data);

export const lightButtonOn = createAction(s.LIGHT_BUTTON_ON, data => data);
export const lightButtonOff = createAction(s.LIGHT_BUTTON_OFF, data => data);

export const startSong = createAction(s.START_SONG);
export const finishSong = createAction(s.FINISH_SONG);
export const addStep = createAction(s.ADD_STEP);

export const changeLevel = createAction(s.CHANGE_LEVEL);

export const playSong = () => async (dispatch, getState) => {
  dispatch(startSong());
  const { simonsGame } = getState();

  for (let i = 0; i <= simonsGame.song.length - 1; i++) {
    if (simonsGame.isGameOver) {
      break;
    }

    const id = simonsGame.song[i];
    dispatch(lightButtonOn(id));
    await waiting(WAIT);
    dispatch(lightButtonOff());

    if (i !== simonsGame.song.length - 1) {
      await waiting(simonsGame.gameLevel);
    }
  }

  dispatch(finishSong());
};

export const steps = ({ succeeded, id }) => async (dispatch, getState) => {
  dispatch(addStep({ succeeded, id }));
  dispatch(lightButtonOn(id));
  await waiting(WAIT);
  dispatch(lightButtonOff());

  const { simonsGame } = getState();
  const { song, inputSteps } = simonsGame;
  const isFinishSong = song.length === inputSteps.length && succeeded;

  return new Promise(r => r({ isFinishSong }));
};
