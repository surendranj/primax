import React from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import { IMAGE_BASE_URL } from "../../utils/requests";
import { Data } from "../../../types";

const posterMotion: Variants = {
    hidden: (clickDirection: string) => ({
        opacity: 0,
        x: clickDirection === "right" ? window.innerWidth : -window.innerWidth,
    }),
    visible: () => ({
        opacity: 0.5,
        x: 0,
        transition: { type: "tween" },
    }),
    exit: (clickDirection: string) => ({
        opacity: 0,
        x: clickDirection === "left" ? window.innerWidth : -window.innerWidth,
        transition: { type: "tween" },
    }),
};

type PosterProps = {
    clickDirection: string | null;
    data: Data;
    currentMovie: number;
};
const Poster = ({ clickDirection, data, currentMovie }: PosterProps) => {
    return (
        <AnimatePresence mode="wait" initial={false} custom={clickDirection}>
            <motion.div
                key={data.results[currentMovie].id}
                variants={posterMotion}
                custom={clickDirection}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative w-full h-[40vh] tablet:h-full "
            >
                <Image
                    src={`${IMAGE_BASE_URL}${data.results[currentMovie].backdrop_path}`}
                    alt="poster"
                    fill
                    className="object-cover"
                    priority={true}
                    sizes="100vw"
                />
            </motion.div>
        </AnimatePresence>
    );
};

export default Poster;
