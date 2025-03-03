import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSetUrlQuery() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  return (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(key, value);

    router.push(`${pathname}?${newParams.toString()}`);
  };
}
