export const generateUUID = () => {
  const timestamp = new Date().getTime();
  const randomPart = Math.floor(Math.random() * 10000000);

  return `${timestamp}-${randomPart}`;
};
