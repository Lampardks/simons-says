import React, { useEffect, useRef, createRef } from 'react';
import audioFiles from '../../audio';

const Player = ({ activeSound }) => {
  const audioEl = useRef(Object.keys(audioFiles).map(() => createRef()));

  useEffect(() => {
    const index = Object.keys(audioFiles).indexOf(activeSound);
    if (index === -1) {
      return;
    }

    const player = audioEl.current[index].current;
    if (!player) {
      return;
    }

    player.currentTime = 0;
    player.play();
  }, [activeSound]);

  return (
    <div>
      {Object.keys(audioFiles).map((item, index) => {
        return (
          <audio
            key={index}
            ref={audioEl.current[index]}
            preload='auto'
            src={audioFiles[item]}
          ></audio>
        );
      })}
    </div>
  );
};

export default Player;
