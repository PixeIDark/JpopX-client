export const createCallbackUrl = (callbackPath: string, movePath: string = "/login"): string => {
  const encodedCallbackUrl = encodeURIComponent(callbackPath);

  return `${movePath}?callbackUrl=${encodedCallbackUrl}`;
};
