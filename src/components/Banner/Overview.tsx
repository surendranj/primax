import React from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Data } from "../../../types";
import Rating from "../Icons/Rating";
import { Chevron } from "../Icons/Arrows";
import Play from "../Icons/Play";
import Button from "../Buttons/Button";
import { useAppDispatch } from "../../app/hooks";
import { openModal } from "../../features/modal/modalSlice";

const infoMotion: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: { duration: 0.7 },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.3 },
    },
};

type OverviewProps = {
    clickDirection: string | null;
    data: Data;
    currentMovie: number;
    handleLeftClick: () => void;
    handleRightClick: () => void;
};

const Overview = ({ clickDirection, data, currentMovie, handleLeftClick, handleRightClick }: OverviewProps) => {
    const dispatch = useAppDispatch();

    const { id, name, title, vote_average: voteAverage, overview, media_type: mediaType } = data.results[currentMovie];

    const handleOpenModal = () => dispatch(openModal({ id, mediaType }));
    return (
        <div className="container  tablet:absolute mt-4 tablet:bottom-4 left-0 right-0 mx-auto">
            <AnimatePresence mode="wait" initial={false} custom={clickDirection}>
                <motion.div key={id} variants={infoMotion} initial="hidden" animate="visible" exit="exit">
                    <div className="flex items-center gap-2 tablet:gap-4 mb-4">
                        <h1>{name || title}</h1>
                        <Rating id={id} rating={Math.round(voteAverage * 10) / 10} animate={true} />
                    </div>
                    <p className="text-sm font-light tablet:font-light mb-8 tracking-wide opacity-70 tablet:opacity-100">
                        {overview}
                    </p>
                </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-16  left-3 tablet:relative tablet:bottom-0 tablet:-left-1 flex items-center gap-2">
                <Button handleClick={handleLeftClick}>
                    <Chevron />
                </Button>
                <Button handleClick={handleOpenModal}>
                    <Play />
                </Button>
                <Button handleClick={handleRightClick}>
                    <Chevron className="rotate-180" />
                </Button>
            </div>
        </div>
    );
};

export default Overview;
