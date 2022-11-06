import React from "react";

import { AnimatePresence, motion } from "framer-motion";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getMovie, IMAGE_BASE_URL } from "../../utils/requests";
import Image from "next/image";
import Rating from "../Icons/Rating";
import { useAppDispatch } from "../../app/hooks";
import { openModal } from "../../features/modal/modalSlice";
import Play from "../Icons/Play";
import useDontScrollModal from "../../hooks/useDontScrollModal";
import { v4 as uuidv4 } from "uuid";

type SearchResultsProps = {
    searchTerm: string;
    debouncedSearchTerm: string;
};
const SearchResults = ({ searchTerm, debouncedSearchTerm }: SearchResultsProps) => {
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&include_adult=false&query=${debouncedSearchTerm}`;

    const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
        [debouncedSearchTerm],
        ({ pageParam = 1 }) => getMovie(`${url}&page=${pageParam}`),
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            staleTime: 1000 * 60 * 60 * 24,
            enabled: Boolean(debouncedSearchTerm),
            getNextPageParam: (_lastPage, pages) => {
                if (pages.length < pages[0].total_pages) {
                    return pages.length + 1;
                } else return;
            },
        }
    );

    const pages = data?.pages.map((page) => page.results);
    const filteredData = pages?.flat().filter((movie) => movie.media_type !== "person" && movie.backdrop_path);

    const dispatch = useAppDispatch();
    useDontScrollModal(Boolean(searchTerm && debouncedSearchTerm));
    return (
        <AnimatePresence>
            {searchTerm && debouncedSearchTerm && (
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    key={debouncedSearchTerm}
                    className="pt-4 pb-40 tablet:pb-6 px-4 absolute overflow-y-scroll top-12 left-0 tablet:left-44 laptop:left-52 desktop:left-72 bg-black w-full tablet:w-1/2 desktop:w-[400px]  h-screen tablet:h-[50vh] laptop:h-[80vh] rounded-md flex flex-col items-center gap-7"
                >
                    <motion.ul className="flex flex-col gap-4 w-full">
                        {filteredData?.map((movie) => (
                            <li key={uuidv4()} className="relative w-full">
                                <div className="relative w-full h-48 overflow-hidden rounded-md opacity-50">
                                    <Image
                                        src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
                                        alt={`${movie.title || movie.original_name}`}
                                        fill
                                        className="object-cover"
                                        priority={true}
                                        sizes="(max-width: 1280px) 100%"
                                    />
                                </div>
                                <div className=" flex flex-col justify-between absolute top-0 left-0 w-full h-full p-4">
                                    <div className="flex justify-between gap-4 items-center w-full">
                                        <span className="text-sm ">{movie.title || movie.original_name}</span>
                                        <Rating animate={false} id={movie.id} rating={movie.vote_average} />
                                    </div>
                                    <div className="relative -left-2 flex items-center gap-4 text-xs">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => {
                                                dispatch(openModal({ id: movie.id, mediaType: movie.media_type }));
                                            }}
                                        >
                                            <Play className="w-10 h-10" />
                                        </motion.button>
                                        <span>{movie.original_language.toUpperCase()}</span>
                                        <span>
                                            {new Date(movie.release_date || movie.first_air_date).getFullYear()}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </motion.ul>

                    {hasNextPage && (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            disabled={!hasNextPage}
                            onClick={() => fetchNextPage()}
                            className="bg-orange py-1 rounded-md w-36 disabled:hover:cursor-not-allowed disabled:opacity-50"
                        >
                            Load More
                        </motion.button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchResults;
