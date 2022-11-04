import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <footer className="relative w-full h-full pb-20 bg-black py-10">
            <div className="container max-w-[300px]">
                <h4 className="text-grey w-full text-center">Data Source</h4>
                <motion.a whileHover={{ opacity: 0.7 }} href="https://www.themoviedb.org/">
                    <div className="relative w-full h-20">
                        <Image
                            src="/images/icons/tmdb-logo.svg"
                            alt="TMDB Logo"
                            fill
                            className="object-contain"
                            sizes="(max-width: 1280px) 100%"
                        />
                    </div>
                </motion.a>
            </div>
        </footer>
    );
};

export default Footer;
