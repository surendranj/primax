import React from "react";

import { motion, useScroll, useTransform } from "framer-motion";
import Logo from "./Logo";
import Link from "next/link";

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

                <ul className="flex justify-between items-center gap-10 tablet:gap-5 laptop:gap-10 desktop:gap-20">
                    <li>
                        <ul className="hidden tablet:flex justify-between items-center gap-10 tablet:gap-14 laptop:gap-20 desktop:gap-28 font-medium text-xs">
                            {links.map((link) => (
                                <motion.li whileHover={{ color: "#FF5E5B" }} whileTap={{ scale: 0.9 }} key={link.name}>
                                    <Link scroll={false} href={link.href}>
                                        {link.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </li>
                    {/* <li>
                        <ul className="flex gap-4 tablet:gap-6">
                            <li className="relative">
                                <AccountSettings />
                            </li>
                        </ul>
                    </li> */}
                </ul>
            </ul>
        </motion.nav>
    );
};

export default Topbar;
