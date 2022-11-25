import { dehydrate, QueryClient } from "@tanstack/react-query";
import Home from "../src/components/Home/Home";

import requests, { getMovie } from "../src/utils/requests";

const HomePage = () => {
    return <Home />;
};

export async function getStaticProps() {
    const queryClient = new QueryClient();
    const request = Object.values(requests);
    await Promise.all(
        request.map((el) => {
            return queryClient.prefetchQuery([el.name], () => getMovie(el.url));
        })
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}

export default HomePage;
