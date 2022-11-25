import { UseQueryResult } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { Data } from "../../../types";
import Card from "./Card";
import { motion } from "framer-motion";

type CategoryProps = {
    queryResult: UseQueryResult<Data>;
    categoryName?: string;
};
const Category = ({ queryResult, categoryName }: CategoryProps) => {
    const { isLoading, isError, error, data } = queryResult;

    const carousel = useRef<HTMLDivElement>(null);
    const [scrollWidth, setScrollWidth] = useState(0);

    useEffect(() => {
        if (carousel.current) {
            setScrollWidth(carousel.current.scrollWidth);
        }
    }, []);

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        if (error instanceof Error) {
            return <span>Error: {error.message}</span>;
        }
    }

    return (
        <motion.section className="container mb-14 ">
            <h2 className=" mb-5">{categoryName}</h2>

            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "30px", once: true }}
                transition={{ duration: 1 }}
                className="relative w-full overflow-hidden "
            >
                <motion.div
                    ref={carousel}
                    drag="x"
                    dragConstraints={{ left: -scrollWidth + 192, right: 0 }}
                    className="flex gap-4 hover:cursor-grab active:cursor-grabbing"
                >
                    {data!.results.map((movie) => (
                        <Card
                            key={movie.id}
                            movie={movie}
                            mediaType={categoryName === "Netflix Originals" ? "tv" : "movie"}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default Category;
