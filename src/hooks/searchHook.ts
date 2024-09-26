import { useState } from "react";
import { useDebounce } from "use-debounce";

export const SearchHook = ({ delay = 1500 }: { delay?: number }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debounceValue] = useDebounce(searchQuery, delay);

  return {
    searchQuery,
    setSearchQuery,
    debounceValue,
  };
};
