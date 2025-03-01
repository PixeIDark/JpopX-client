import { SearchPanelParams } from "@/types/search.type";
import { useRouter } from "next/navigation";

export function useChangeUrl(params: SearchPanelParams) {
  const router = useRouter();
  const { text, searchType, sort } = params;

  const onApplySearchParams = (params: SearchPanelParams) => {
    const searchParams = new URLSearchParams([
      ["text", params.text ?? text ?? ""],
      ["searchType", params.searchType || searchType || "both"],
      ["sort", params.sort || sort || "popular"],
    ]);
    router.push(`/search?${searchParams}`);
  };

  return { text, searchType, sort, onApplySearchParams };
}
