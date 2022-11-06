import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Data } from "../../../types";
import Poster from "./Poster";
import Overview from "./Overview";
import requests, { getMovie } from "../../utils/requests";

const Banner = () => {
    const { isLoading, isError, error, data } = useQuery<Data, Error>(
        [requests.urlTrending.name],
        () => getMovie(requests.urlTrending.url),
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            staleTime: 1000 * 60 * 60 * 24,
        }
    );
    const [currentMovie, setCurrentMovie] = useState(0);
    const [clickDirection, setClickDirection] = useState<string | null>(null);

    const handleLeftClick = () => {
        if (data) {
            setCurrentMovie((currentMovie) => {
                if (currentMovie === 0) {
                    currentMovie = data.results.length - 1;
                } else {
                    currentMovie--;
                }
                return currentMovie;
            });
        }

        setClickDirection("left");
    };

    const handleRightClick = () => {
        if (data) {
            setCurrentMovie((currentMovie) => {
                if (currentMovie === data.results.length - 1) {
                    currentMovie = 0;
                } else {
                    currentMovie++;
                }
                return currentMovie;
            });
        }
        setClickDirection("right");
    };

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    return (
        <section className="w-full h-screen tablet:max-h-[40vh] laptop:max-h-screen overflow-hidden mb-20">
            {/* Poster */}
            <Poster clickDirection={clickDirection} currentMovie={currentMovie} data={data} />
            {/* Movie info */}
            <Overview
                clickDirection={clickDirection}
                currentMovie={currentMovie}
                data={data}
                handleLeftClick={handleLeftClick}
                handleRightClick={handleRightClick}
            />
        </section>
    );
};

export default Banner;
