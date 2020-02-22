import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import Game from './Game';
import Player from './Player';

class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  };

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <main className='wrapper ma simons-game'>
          <h1 className='tc h1'>Simon the Game</h1>
          <Game />
          <Player />
        </main>
      </Provider>
    );
  }
}

export default App;
