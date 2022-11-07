import React from "react";
import useDebounce from "../../hooks/useDebounce";
import SearchIcon from "../Icons/Search";
import Close from "../Icons/Close";
import SearchResults from "./SearchResults";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeSearch, openSearch } from "../../features/search/searchSlice";

const SearchBar = () => {
    const searchTerm = useAppSelector((state) => state.search);
    const dispatch = useAppDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(openSearch(e.target.value));
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
                    <button onClick={() => dispatch(closeSearch())} className="absolute inset-y-0 right-1 w-4 h-full">
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
