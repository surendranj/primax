import React, { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import SearchIcon from "../Icons/Search";
import Close from "../Icons/Close";
import SearchResults from "./SearchResults";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const delay = searchTerm ? 500 : 0;
    const debouncedSearchTerm = useDebounce(searchTerm, delay);

    return (
        <>
            <li className="relative w-36 text-xs laptop:text-sm laptop:w-48">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    className="focus:outline-none rounded-full w-full px-2 text-orange  "
                />
                {searchTerm ? (
                    <button onClick={() => setSearchTerm("")} className="absolute inset-y-0 right-1 w-4 h-full">
                        <Close className="w-full h-full" />
                    </button>
                ) : (
                    <SearchIcon className="absolute inset-y-0 right-2 w-2 laptop:w-4 h-full" />
                )}
            </li>
            <SearchResults searchTerm={searchTerm} debouncedSearchTerm={debouncedSearchTerm} />
        </>
    );
};

export default SearchBar;
