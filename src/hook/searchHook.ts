import { useState } from "react";
import { useDebounce } from "use-debounce";

export const searchHook = ({ delay=1500 }:{ delay?: number}) => {
  const [searchQuery, setSearchQuery] = useState<string|null>(null);
  const [debounceValue] = useDebounce(searchQuery, delay);

  return {
    searchQuery,
    setSearchQuery,
    debounceValue,
  };
};
