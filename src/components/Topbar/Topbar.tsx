import React from "react";

import { motion, useScroll, useTransform } from "framer-motion";
import Logo from "./Logo";
import Link from "next/link";
import SearchBar from "../SearchBar/SearchBar";

import UserNav from "./UserNav";

export const links = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/movies" },
    { name: "TV", href: "/tv" },
    { name: "Trending", href: "/trending" },
    { name: "Kids", href: "/kids" },
];
const Topbar = () => {
    const { scrollYProgress } = useScroll();
    const backgroundColor = useTransform(scrollYProgress, [0, 0.05], ["hsla(0,0,0,0)", "#0A0908"]);

    return (
        <motion.nav style={{ backgroundColor }} className="fixed z-40 w-full">
            <ul className="container flex justify-between items-center">
                {/* Logo */}
                <Logo />

                <SearchBar />
                <ul className="hidden tablet:flex justify-between items-center gap-2 w-[40%] text-xs">
                    {links.map((link) => (
                        <motion.li whileHover={{ color: "#FF5E5B" }} whileTap={{ scale: 0.9 }} key={link.name}>
                            <Link scroll={false} href={link.href}>
                                {link.name}
                            </Link>
                        </motion.li>
                    ))}
                </ul>
                <li>
                    <UserNav />
                </li>
            </ul>
        </motion.nav>
    );
};

export default Topbar;
