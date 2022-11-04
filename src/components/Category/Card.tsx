import Image from "next/image";
import React from "react";
import { Movie } from "../../../types";
import { IMAGE_BASE_URL } from "../../utils/requests";
import Rating from "../Icons/Rating";
import { motion, Variants } from "framer-motion";
import { useAppDispatch } from "../../app/hooks";
import { openModal } from "../../features/modal/modalSlice";
import Play from "../Icons/Play";

type CardProps = {
    movie: Movie;
    mediaType: string;
};

const cardMotion: Variants = {
    hover: {},
};

const posterMotion: Variants = {
    hover: { opacity: 0.3, scale: 1.1, transition: { type: "tween" } },
};
const Card = ({ movie, mediaType }: CardProps) => {
    const dispatch = useAppDispatch();
    const handleClick = () => {
        dispatch(openModal({ id: movie.id, mediaType }));
    };

    return (
        <motion.div
            variants={cardMotion}
            whileHover="hover"
            className="relative w-48 h-72 rounded-lg shrink-0 overflow-hidden cursor-pointer "
        >
            {/* Poster */}
            <motion.div variants={posterMotion} className="relative w-full h-full ">
                <Image
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt="poster"
                    fill
                    className="object-cover"
                    priority={true}
                    sizes="(max-width: 1280px) 100%"
                />
            </motion.div>

            <div className="absolute top-0 left-0 w-full h-full p-2 gradient">
                <div className="w-full flex justify-between items-center">
                    {movie.vote_average ? (
                        <Rating
                            animate={false}
                            rating={movie.vote_average}
                            id={movie.id}
                            className="w-[20px] h-[20px] tablet:w-7 tablet:h-7"
                        />
                    ) : (
                        <span className="text-orange text-[10px] font-bold">UNRATED</span>
                    )}
                    <span className="text-orange text-[10px] font-bold">EN</span>
                </div>
            </div>
            <motion.button whileHover={{ scale: 1.1 }} onClick={handleClick} className="absolute bottom-2 left-3 ">
                <Play className="w-8 h-8" />
            </motion.button>
        </motion.div>
    );
};

export default Card;
