import { dehydrate, QueryClient } from "@tanstack/react-query";
import React from "react";
import Transition from "../src/components/PageTransition/Transition";
import Pagination from "../src/components/Pagination/Pagination";
import { getMovie } from "../src/utils/requests";

const queryKey = "trending";
const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=`;
const pageNumber = 1;

const TrendingPage = () => {
    return (
        <Transition>
            <Pagination queryKey={queryKey} url={url} mediaType="movie" pageTitle="Trending" />
        </Transition>
    );
};

export async function getServerSideProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery([queryKey, pageNumber], () => getMovie(`${url}${pageNumber}`));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}
export default TrendingPage;
