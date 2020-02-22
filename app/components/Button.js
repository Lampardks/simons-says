import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Button = ({ id, disabled, isActive, isPlay, onClick }) => (
  <button
    className={cn('button-simons', id, {
      active: isActive,
      cp: isPlay,
    })}
    onClick={onClick(id)}
    disabled={disabled}
  />
);

Button.propTypes = {
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  isPlay: PropTypes.bool.isRequired,

  onClick: PropTypes.func.isRequired,
};

export default Button;
