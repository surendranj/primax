import axios from "axios";
import { Data, Movie } from "../../types";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";

const requests = {
    urlTrending: { name: "Trending", url: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US` },
    urlActionMovies: {
        name: "Action",
        url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
    },
    urlNetflixOriginals: {
        name: "Netflix Originals",
        url: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
    },
    urlTopRated: { name: "Top Rated", url: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US` },
    urlComedyMovies: {
        name: "Comedy",
        url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
    },
    urlHorrorMovies: {
        name: "Horror",
        url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
    },
    urlRomanceMovies: {
        name: "Romance",
        url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
    },
    urlDocumentaries: {
        name: "Documentary",
        url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
    },
};

export const getMovie = async (url: string): Promise<Data> => {
    const response = await axios.get<Data>(url);
    if (!response.data) {
        throw new Error("Network response was not ok");
    }
    return response.data;
};

export const getVideos = async (mediaType: string | undefined, id: number | undefined): Promise<Movie> => {
    const response = await axios.get<Movie>(
        `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=videos&language=en-US`
    );
    if (!response.data) {
        throw new Error("Network response was not ok");
    }
    return response.data;
};
export default requests;
