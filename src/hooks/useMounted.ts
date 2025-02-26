import { useEffect, useState } from "react";

export function useMounted() {
  const [mounted, setMounted] = useState(false);

  // 마운트 된 후에만 UI 렌더링
  useEffect(() => {
    setMounted(true);
  }, []);

  return { mounted };
}
