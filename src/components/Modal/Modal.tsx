import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeModal, setTrailerUrl } from "../../features/modal/modalSlice";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getVideos } from "../../utils/requests";
import ReactPlayer from "react-player/lazy";
import { Movie } from "../../../types";
import Rating from "../Icons/Rating";
import Close from "../Icons/Close";
import useDontScrollModal from "../../hooks/useDontScrollModal";
import Plus from "../Icons/Plus";
import { useRouter } from "next/router";
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { MovieDoc } from "../MyList/MyList";
import Spinner from "../Icons/Spinner";

const Modal = () => {
    const { open, media, trailerUrl } = useAppSelector((state) => state.modal);
    const dispatch = useAppDispatch();
    const { data } = useQuery<Movie, Error>(
        [media?.mediaType, media?.id],
        () => getVideos(media?.mediaType, media?.id),
        {
            enabled: open,
        }
    );

    useEffect(() => {
        if (data) {
            const key = data?.videos.results.find((el) => el.type === "Trailer")?.key;
            const url = `https://www.youtube.com/watch?v=${key ? key : "mv8zfcfTxxI"}`;
            dispatch(setTrailerUrl(url));
        }
    }, [data, dispatch]);

    useDontScrollModal(open);

    const modalVariants: Variants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
    };
    const handleClick = () => {
        dispatch(closeModal());
        setIsMovieInList(undefined);
        setMsg("");
        if (router.asPath === "/mylist") {
            router.reload();
        }
    };

    const [isMovieInList, setIsMovieInList] = useState<boolean>();
    const [msg, setMsg] = useState("");
    useEffect(() => {
        if (user) {
            const getMovies = async () => {
                const docRef = doc(db, "users", `${userInfo?.email}`);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const docData = docSnap.data() as MovieDoc;

                    const index = docData.movieList.findIndex(
                        (movie) => movie.mediaId === media?.id && movie.mediaType === media.mediaType
                    );
                    if (index < 0) {
                        setIsMovieInList(false);
                    } else {
                        setIsMovieInList(true);
                    }
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            };
            getMovies();
        }
    });

    // add movie to user list
    const router = useRouter();
    const { user, userInfo } = useAppSelector((state) => state.user);
    const addMovie = async () => {
        if (user) {
            try {
                const docRef = doc(db, "users", `${userInfo?.email}`);
                await updateDoc(docRef, {
                    movieList: arrayUnion({ mediaId: media?.id, mediaType: media?.mediaType }),
                });
                setIsMovieInList(true);
                setMsg("Added to your list.");
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        } else {
            router.push("/signin");
        }
    };

    const removeMovie = async () => {
        try {
            const docRef = doc(db, "users", `${userInfo?.email}`);
            await updateDoc(docRef, {
                movieList: arrayRemove({ mediaId: media?.id, mediaType: media?.mediaType }),
            });
            setIsMovieInList(false);
            setMsg("Removed from your list.");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (msg) {
                setMsg("");
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [msg]);

    const playerRef = useRef<ReactPlayer>(null);
    const [playerReady, setPlayerReady] = useState(false);

    useEffect(() => {
        !open && setPlayerReady(false);
    }, [open]);

    useEffect(() => console.log(playerReady));
    return (
        <AnimatePresence mode="wait">
            {open ? (
                <motion.div
                    key="modal"
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="fixed z-50 w-full min-h-screen top-0 left-0 bg-black/70 backdrop-blur-md laptop:flex flex-col justify-center gap-4 "
                >
                    <AnimatePresence>
                        {msg && (
                            <motion.div
                                key={msg}
                                initial={{ x: 10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -10, opacity: 0 }}
                                className="absolute bottom-4 left-4 tablet:left-10 laptop:right-14 laptop:left-auto text-orange bg-white rounded-md flex gap-4 py-1 px-2"
                            >
                                <p>{msg}</p>
                                <button onClick={() => setMsg("")}>
                                    <Close />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="relative w-full laptop:w-[50vw] mx-auto ">
                        <div className={`relative pt-[56.25%] ${playerReady ? "visible" : "invisible"}`}>
                            <ReactPlayer
                                ref={playerRef}
                                url={trailerUrl ? trailerUrl : ""}
                                width="100%"
                                height="100%"
                                style={{ position: "absolute", top: 0, left: 0 }}
                                playing
                                controls
                                onReady={() => setPlayerReady(true)}
                            />
                        </div>
                        {!playerReady && (
                            <div className="absolute inset-0 flex justify-center items-center">
                                <Spinner />
                            </div>
                        )}
                    </div>

                    <div className="container pt-4 ">
                        <div className="flex items-center gap-2 mb-4">
                            <h1>{data?.original_name || data?.title}</h1>
                            <Rating
                                animate={true}
                                id={data ? data.id : 0}
                                rating={data ? Math.round(data?.vote_average * 10) / 10 : 0}
                            />
                        </div>
                        <p className="text-sm tracking-wider font-extralight">{data?.overview}</p>
                        <div className=" flex items-center mt-8 gap-4">
                            {isMovieInList ? (
                                <button onClick={removeMovie} className="w-10 h-10 cursor-pointer rotate-45">
                                    <Plus />
                                </button>
                            ) : (
                                <button onClick={addMovie} className="w-10 h-10 cursor-pointer">
                                    <Plus />
                                </button>
                            )}

                            <div className="flex flex-wrap gap-2">
                                {data?.genres.map((genre) => (
                                    <span key={genre.id} className="px-3 py-1 border border-grey rounded-md text-xs">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <motion.button
                        onClick={handleClick}
                        whileTap={{ scale: 0.9 }}
                        className="absolute bottom-2 right-2"
                    >
                        <Close className="w-10 h-10" />
                    </motion.button>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};

export default Modal;
