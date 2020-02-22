import { handleActions } from 'redux-actions';
import * as s from '../actions';

import { NORMAL } from '../../components/constants';

const initialState = {
  countRound: 0,
  isPlay: false,
  isPlaySong: false,
  inputSteps: [],
  song: [],
  isGameOver: false,
  gameLevel: NORMAL,
};

const simonsGame = handleActions(
  new Map([
    [
      s.roundIncrease,
      (state, { payload }) => ({
        ...state,
        ...{
          countRound: state.countRound + 1,
          song: state.song.concat(payload),
          inputSteps: [],
        },
      }),
    ],
    [
      s.resetGame,
      state => ({
        ...initialState,
        gameLevel: state.gameLevel,
      }),
    ],

    [
      s.startGame,
      state => ({
        ...state,
        ...{
          isPlay: true,
        },
      }),
    ],
    [
      s.addStep,
      (state, { payload }) => ({
        ...state,
        ...{
          inputSteps: payload.succeeded
            ? state.inputSteps.concat(payload.id)
            : state.inputSteps,
          isPlay: payload.succeeded,
          isGameOver: !payload.succeeded,
        },
      }),
    ],
    [
      s.startSong,
      state => ({
        ...state,
        ...{
          isPlaySong: true,
        },
      }),
    ],
    [
      s.finishSong,
      state => ({
        ...state,
        ...{
          isPlaySong: false,
        },
      }),
    ],
    [
      s.changeLevel,
      (state, { payload }) => ({
        ...state,
        ...{
          gameLevel: payload,
        },
      }),
    ],
  ]),
  initialState,
);

export default simonsGame;
