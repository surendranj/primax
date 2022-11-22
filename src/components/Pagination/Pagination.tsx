import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence, Variants } from "framer-motion";
import React, { useState } from "react";
import { getMovie } from "../../utils/requests";
import Card from "../Category/Card";
import Spinner from "../Icons/Spinner";
import Modal from "../Modal/Modal";
import ButtonGroup from "./ButtonGroup";

const variants: Variants = {
    hidden: (clickDirection: string) => ({
        opacity: 0,
        x: clickDirection === "right" ? 20 : -20,
    }),
    visible: () => ({
        opacity: 1,
        x: 0,
    }),
    exit: (clickDirection: string) => ({
        opacity: 0,
        x: clickDirection === "left" ? 20 : -20,
    }),
};

type PaginationProps = {
    queryKey: string;
    url: string;
    mediaType: string;
    pageTitle: string;
};
const Pagination = ({ queryKey, url, mediaType, pageTitle }: PaginationProps) => {
    const [pageNumber, setPageNumber] = useState(1);
    const { data } = useQuery([queryKey, pageNumber], () => getMovie(`${url}${pageNumber}`), {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: 1000 * 60 * 60 * 24 * 7,
    });

    const [clickDirection, setClickDirection] = useState<string | null>(null);
    const handleLeftClick = () => {
        setPageNumber((prev) => (prev = prev - 1));
        setClickDirection("left");
        window.scrollTo(0, 0);
    };

    const handleRightClick = () => {
        setPageNumber((prev) => (prev = prev + 1));
        setClickDirection("right");
        window.scrollTo(0, 0);
    };

    if (data) {
        return (
            <section className="container py-20 flex flex-col justify-center items-center gap-10">
                <h1 className="text-orange">{pageTitle}</h1>
                <ButtonGroup
                    pageNumber={pageNumber}
                    handleLeftClick={handleLeftClick}
                    handleRightClick={handleRightClick}
                    totalPages={data.total_pages}
                />
                <AnimatePresence mode="wait" custom={clickDirection}>
                    <motion.div
                        key={pageNumber}
                        variants={variants}
                        custom={clickDirection}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex flex-col tablet:flex-row tablet:flex-wrap justify-around items-center gap-6"
                    >
                        {data.results.map((movie) => (
                            <Card key={movie.id} movie={movie} mediaType={mediaType} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                <ButtonGroup
                    pageNumber={pageNumber}
                    handleLeftClick={handleLeftClick}
                    handleRightClick={handleRightClick}
                    totalPages={data.total_pages}
                />
                <Modal />
            </section>
        );
    }
    return (
        <div className="fixed w-full h-screen flex justify-center items-center">
            <Spinner />
        </div>
    );
};

export default Pagination;
