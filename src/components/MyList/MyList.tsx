import { useQueries } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { db } from "../../firebase/firebase";
import { getVideos } from "../../utils/requests";
import Card from "../Category/Card";
import Spinner from "../Icons/Spinner";
import Modal from "../Modal/Modal";

export interface MovieDoc {
    movieList: { mediaId: number; mediaType: string }[];
}

const MyList = () => {
    const router = useRouter();
    const { user, userInfo } = useAppSelector((state) => state.user);

    const [movieDoc, setMovieDoc] = useState<MovieDoc>();

    useEffect(() => {
        if (user === false) {
            router.push("/signin");
        }
    });

    useEffect(() => {
        if (user) {
            const getMovies = async () => {
                const docRef = doc(db, "users", `${userInfo?.email}`);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const docData = docSnap.data() as MovieDoc;
                    setMovieDoc(docData);
                    // console.log(docData);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            };
            getMovies();
        }
    }, [user, userInfo?.email]);

    const queries = useQueries({
        queries: movieDoc
            ? movieDoc.movieList.map((movie) => {
                  const { mediaType, mediaId } = movie;
                  return {
                      queryKey: [`${mediaType}${mediaId}`],
                      queryFn: () => getVideos(mediaType, mediaId),
                      refetchOnWindowFocus: false,
                  };
              })
            : [],
    });

    return (
        <section className="container py-20 flex flex-col justify-center items-center gap-10">
            <h1 className="text-orange">My List</h1>
            {movieDoc ? (
                <div className="flex flex-col tablet:flex-row tablet:flex-wrap justify-around items-center gap-6">
                    {queries.length ? (
                        queries.map((query, idx) => {
                            const { data } = query;
                            if (data)
                                return (
                                    <Card
                                        key={data?.original_name || data?.title}
                                        movie={data}
                                        mediaType={movieDoc.movieList[idx].mediaType}
                                    />
                                );
                        })
                    ) : (
                        <p className="text-orange/50">Your list empty. Start by adding some movies.</p>
                    )}
                </div>
            ) : (
                <Spinner />
            )}

            <Modal />
        </section>
    );
};

export default MyList;
