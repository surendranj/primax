export interface Genre {
    id: number;
    name: string;
}

export interface Movie {
    title: string;
    backdrop_path: string;
    media_type: string;
    release_date?: string;
    first_air_date: string;
    genres: { id: number; name: string }[];
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    videos: { results: { id: string; key: string; type: string }[] };
}

export interface Element {
    type: "Bloopers" | "Featurette" | "Behind the Scenes" | "Clip" | "Trailer" | "Teaser";
}

export interface Data {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}
