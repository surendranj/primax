import React from "react";

import { motion, useScroll, useTransform } from "framer-motion";
import HomeIcon from "../Icons/HomeIcon";
import Movie from "../Icons/Movie";
import TV from "../Icons/TV";
import New from "../Icons/New";
import { links } from "../Topbar/Topbar";
import Link from "next/link";
import Kids from "../Icons/Kids";

const Bottombar = () => {
    const { scrollYProgress } = useScroll();
    const backgroundColor = useTransform(scrollYProgress, [0, 0.05], ["hsla(0,0,0,0)", "#0A0908"]);

    const linkIcons = [
        <HomeIcon key={"homeIcon"} />,
        <Movie key={"movieIcon"} />,
        <TV key={"tvIcon"} />,
        <New key={"newIcon"} />,
        <Kids key={"kidsIcon"} />,
    ];
    return (
        <motion.nav style={{ backgroundColor }} className="tablet:hidden fixed bottom-0 left-0 z-40 w-full h-12">
            <ul className="container flex justify-between items-center w-full h-full">
                {links.map((link, idx) => (
                    <motion.li whileTap={{ scale: 0.9 }} key={link.name}>
                        <Link href={link.href}>
                            {/* <motion.a whileTap={{ scale: 0.9 }}>
                                <New />
                            </motion.a> */}
                            {linkIcons[idx]}
                        </Link>
                    </motion.li>
                ))}
            </ul>
        </motion.nav>
    );
};

export default Bottombar;
