import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeModal, setTrailerUrl } from "../../features/modal/modalSlice";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getVideos } from "../../utils/requests";
import ReactPlayer from "react-player/lazy";
import { Movie } from "../../../types";
import Rating from "../Icons/Rating";
// import Plus from "../Icons/Plus";
import Close from "../Icons/Close";
import Spinner from "../Icons/Spinner";
import useDontScrollModal from "../../hooks/useDontScrollModal";

const Modal = () => {
    const { open, media, trailerUrl } = useAppSelector((state) => state.modal);
    const dispatch = useAppDispatch();
    const { isLoading, data } = useQuery<Movie, Error>(
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
    const handleClick = () => dispatch(closeModal());

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
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <div className="w-full laptop:w-[50vw] mx-auto ">
                            <div className="relative pt-[56.25%]">
                                <ReactPlayer
                                    url={trailerUrl ? trailerUrl : ""}
                                    width="100%"
                                    height="100%"
                                    style={{ position: "absolute", top: 0, left: 0 }}
                                    playing
                                    // muted
                                    controls
                                />
                            </div>
                        </div>
                    )}
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
                        <div className=" flex items-center mt-8 gap-2">
                            <div className="flex flex-wrap gap-2">
                                {data?.genres.map((genre) => (
                                    <span key={genre.id} className="px-3 py-1 border border-grey rounded-md text-xs">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button onClick={handleClick} className="absolute bottom-2 right-2">
                        <Close className="w-10 h-10" />
                    </button>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};

export default Modal;
