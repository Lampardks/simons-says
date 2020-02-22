import audioFiles from '../audio';

const getRandomSound = () =>
  Object.keys(audioFiles)[Math.floor(Math.random() * 4)];

export default getRandomSound;
