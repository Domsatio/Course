import React, { FC } from "react";
import { Input } from "@material-tailwind/react";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";

type SearchProps = {
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: (data: any) => void;
  className?: string;
};

const Search: FC<SearchProps> = ({
  name = "search",
  placeholder = "Search",
  className = "!border !border-gray-300 rounded-full lg:p-5 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10",
  onChange,
  value,
}) => {
  return (
      <Input
        name={name}
        placeholder={placeholder}
        value={value}
        className={className}
        onChange={onChange}
        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
        labelProps={{
          className: "hidden",
        }}
      />
  );
};

export default Search;
