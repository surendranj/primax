import { dehydrate, QueryClient } from "@tanstack/react-query";
import React from "react";
import Transition from "../src/components/PageTransition/Transition";
import Pagination from "../src/components/Pagination/Pagination";
import { getMovie } from "../src/utils/requests";

const queryKey = "movies";
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&page=`;
const pageNumber = 1;

const MoviesPage = () => {
    return (
        <Transition>
            <Pagination queryKey={queryKey} url={url} mediaType="movie" pageTitle="Movies" />
        </Transition>
    );
};

export async function getStaticProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery([queryKey, pageNumber], () => getMovie(`${url}${pageNumber}`));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}
export default MoviesPage;
