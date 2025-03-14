import { useEffect, useState } from "react";

export function useAndroid() {
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroidDevice = /android/i.test(userAgent);

    setIsAndroid(isAndroidDevice);
  }, []);

  return isAndroid;
}
