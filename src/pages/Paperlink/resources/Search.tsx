import React, { useState } from "react";
import SearchGreen from "../../../components/svg-icons/SearchGreen";
import SearchBar from "./SearchBar";
import { TfiClose } from "react-icons/tfi";

interface SearchProps {
  onSearch: (value: string) => void;
  // inputClick: boolean;
  placeholder?: string;
  buttonText?: string;
}

const Search: React.FC<SearchProps> = ({
  onSearch,
}) => {
  const [inputClick, setInputClick] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch(value);
  };

  const handleInputClick = () => {
    setInputClick(!inputClick);
    setSearchValue("");
  };

  return (
    <div className="border-b-0 flex gap-3">
      {!inputClick ? (
        ""
      ) : (
        <div className="relative bottom-0 border-1 border-green-300 ">
          <SearchBar
            onSearch={handleSearch} // Pass a callback to handle search value changes
            inputClick={inputClick}
            placeholder="Search users..." // Customize the placeholder if needed
            buttonText="Search" // Customize the button text if needed
          />
        </div>
      )}
      {!inputClick ? (
        <button
          onClick={handleInputClick}
          className="inline-flex items-center justify-center w-12 h-12 flex-shrink-0 fill-current bg-white rounded-full shadow-drop outline-none"
        >
          <SearchGreen />
        </button>
      ) : (
        <button
          onClick={handleInputClick}
          className="inline-flex items-center justify-center w-12 h-12 flex-shrink-0 fill-current bg-slate-700 transition-all ease-in-out duration-700 hover:bg-red-500 rounded-full shadow-drop outline-none"
        >
          <TfiClose color="white" />
        </button>
      )}
    </div>
  );
};

export default Search;
