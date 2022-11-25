import { dehydrate, QueryClient } from "@tanstack/react-query";
import React from "react";
import Transition from "../src/components/PageTransition/Transition";
import Pagination from "../src/components/Pagination/Pagination";
import { getMovie } from "../src/utils/requests";

const queryKey = "tv";
const url = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=`;
const pageNumber = 1;

const TVPage = () => {
    return (
        <Transition>
            <Pagination queryKey={queryKey} url={url} mediaType="tv" pageTitle="TV" />
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

export default TVPage;
