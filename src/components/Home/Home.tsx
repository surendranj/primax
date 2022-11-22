import { useQueries } from "@tanstack/react-query";
import React from "react";
import requests, { getMovie } from "../../utils/requests";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Modal from "../Modal/Modal";
import Transition from "../PageTransition/Transition";

const Home = () => {
    const request = Object.values(requests);

    const queries = useQueries({
        queries: request.slice(1).map((el) => {
            return {
                queryKey: [el.name],
                queryFn: () => getMovie(el.url),
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                staleTime: 1000 * 60 * 60 * 24 * 7,
            };
        }),
    });

    return (
        <Transition>
            <Banner />
            {queries.map((query, idx) => (
                <Category key={idx} queryResult={query} categoryName={request[idx + 1].name} />
            ))}
            <Modal />
        </Transition>
    );
};

export default Home;
