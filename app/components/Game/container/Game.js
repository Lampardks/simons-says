import Game from '../components/Game';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {
  roundIncrease,
  startGame,
  playSong,
  steps,
  changeLevel,
  resetGame,
} from '../../../redux/actions';

const mapStateToProps = store => {
  return {
    countRound: store.simonsGame.countRound,
    isPlay: store.simonsGame.isPlay,
    sounds: store.sounds,
    inputSteps: store.simonsGame.inputSteps,
    song: store.simonsGame.song,
    isGameOver: store.simonsGame.isGameOver,
    isPlaySong: store.simonsGame.isPlaySong,
    gameLevel: store.simonsGame.gameLevel,
  };
};

const mapDispatchToProps = {
  roundIncrease,
  startGame,
  playSong,
  steps,
  changeLevel,
  resetGame,
};

const enhance = connect(mapStateToProps, mapDispatchToProps);

export default compose(enhance)(Game);
