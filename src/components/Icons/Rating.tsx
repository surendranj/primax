import React from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

type RatingProps = {
    animate: boolean;
    rating: number;
    id: number;
    className?: string;
};

const Rating = ({ animate, rating, id, className }: RatingProps) => {
    const variants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: rating / 10,
            opacity: 1,
            transition: {
                duration: 1,
            },
        },
        exit: {
            pathLength: 1,
            opacity: 0,
            transition: {
                duration: 1,
            },
        },
    };
    return (
        <AnimatePresence mode="wait">
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                className={`w-10 h-10 min-w-max ${className ? className : ""}`}
                variants={variants}
                initial={animate ? "hidden" : ""}
                animate="visible"
                exit={animate ? "exit" : ""}
                key={id}
            >
                <motion.circle
                    variants={variants}
                    strokeWidth={1.3}
                    cx={12}
                    cy={12}
                    r={10}
                    className="-rotate-90 origin-center stroke-orange"
                />

                <motion.text
                    variants={variants}
                    x={"50%"}
                    y={"50%"}
                    textAnchor="middle"
                    alignmentBaseline="central"
                    className="text-[7px] font-extralight fill-white stroke-white"
                >
                    {Math.round(rating * 10) / 10}
                </motion.text>
            </motion.svg>
        </AnimatePresence>
    );
};

export default Rating;
