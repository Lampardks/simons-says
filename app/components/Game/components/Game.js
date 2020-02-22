import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import Button from '../../Button';

import waiting from '../../../utils/waiting';
import getRandomSound from '../../../utils/getRandomSound';

import { WAIT } from '../../constants';
import { configLevels } from '../../configs/configLevels';

const Game = ({
  countRound,
  isPlay,
  sounds,
  inputSteps,
  song,
  isGameOver,
  isPlaySong,
  gameLevel,

  startGame,
  roundIncrease,
  playSong,
  steps,
  changeLevel,
  resetGame,
}) => {
  useEffect(() => {
    if (isGameOver) {
      waiting(WAIT).then(() => {
        resetGame();
        alert('Game Over!');
      });
    }
  }, [isGameOver]);

  const onClickStartGame = () => {
    startGame();
    roundIncrease(getRandomSound());

    waiting(WAIT).then(() => playSong());
  };

  const onClickSound = id =>
    useCallback(() => {
      const step = inputSteps.length;
      const succeeded = song[step] === id;

      if (isPlaySong) {
        alert('You can’t press while a melody is playing!');
      }

      if (!isGameOver && !isPlaySong) {
        steps({ succeeded, id }).then(async ({ isFinishSong }) => {
          if (isFinishSong) {
            roundIncrease(getRandomSound());
            await waiting(WAIT);
            playSong();
          }
        });
      }
    }, [inputSteps, song, isPlaySong]);

  const onClickLevel = (_, { value }) => {
    changeLevel(value);
  };

  return (
    <div className='game-container'>
      <p className='text'>Round {countRound}</p>
      <div className='df aic'>
        <div className='label-dropdown text'>Level:</div>
        <Dropdown
          placeholder='Select level'
          fluid
          selection
          options={configLevels}
          value={gameLevel}
          onChange={onClickLevel}
        />
      </div>
      <div className='game-field df ma'>
        {sounds.map(item => (
          <Button
            key={item.id}
            id={item.id}
            onClick={onClickSound}
            disabled={!isPlay}
            isActive={item.active}
            isPlay={isPlay}
          />
        ))}
      </div>
      <button
        onClick={onClickStartGame}
        type='submit'
        className='start-button'
        disabled={isPlaySong}
      >
        Start game
      </button>
    </div>
  );
};

Game.propTypes = {
  countRound: PropTypes.number.isRequired,
  isPlay: PropTypes.bool.isRequired,
  sounds: PropTypes.array.isRequired,
  isPlaySong: PropTypes.bool.isRequired,
  gameLevel: PropTypes.number.isRequired,
  inputSteps: PropTypes.array.isRequired,
  song: PropTypes.array.isRequired,
  isGameOver: PropTypes.bool.isRequired,

  roundIncrease: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  playSong: PropTypes.func.isRequired,
  steps: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
};

export default Game;
