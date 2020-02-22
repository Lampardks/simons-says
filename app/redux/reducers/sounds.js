import { handleActions } from 'redux-actions';
import * as s from '../actions';

const initialState = [
  {
    id: 'red',
    active: false,
  },
  {
    id: 'green',
    active: false,
  },
  {
    id: 'blue',
    active: false,
  },
  {
    id: 'yellow',
    active: false,
  },
];

const sounds = handleActions(
  new Map([
    [
      s.lightButtonOn,
      (state, { payload }) => [
        ...state.map(item => ({
          ...item,
          active: payload === item.id,
        })),
      ],
    ],
    [
      s.lightButtonOff,
      state => [
        ...state.map(item => ({
          ...item,
          active: false,
        })),
      ],
    ],
  ]),
  initialState,
);

export default sounds;
