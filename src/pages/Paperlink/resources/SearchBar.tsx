import React, { useState } from "react";
import SearchGreen from "../../../components/svg-icons/SearchGreen";

interface SearchBarProps {
  onSearch: (value: string) => void;
  inputClick: boolean;
  placeholder?: string;
  buttonText?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  inputClick,
  placeholder = "Search users...",
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    onSearch(searchValue);
  };


  

  return (
    <div
      className={`relative bottom-0 border-1 ${
        inputClick ? "border-green-300" : ""
      }`}
    >
      <input
        className="md:p-3 p-2 outline-none w-[150px] h-auto text-xs md:text-sm md:w-[300px] pr-[50px] shadow-sm  md:h-full bg-white"
        placeholder={placeholder}
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        type="submit"
        className={`absolute bg-slate-200 active:bg-gray-400 h-full px-2 md:p-2 right-0 bottom-0 ${
          inputClick ? "" : "hidden"
        }`}
        onClick={handleSearch}
      >
        <SearchGreen />
      </button>
    </div>
  );
};

export default SearchBar;
