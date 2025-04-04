export const getRandomInteger = (max = 99999999999, min = 0) =>
  Math.floor(Math.random() * (max - min) + min);
