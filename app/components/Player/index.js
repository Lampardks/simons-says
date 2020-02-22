import Player from './Player';
import { connect } from 'react-redux';
import { compose } from 'recompose';

const mapStateToProps = store => {
  const activeSound = store.sounds.find(({ active }) => active);

  return {
    activeSound: activeSound ? activeSound.id : '',
  };
};

const enhance = connect(mapStateToProps, null);

export default compose(enhance)(Player);
