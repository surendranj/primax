import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
    return (
        <li>
            <Link href={"/"} passHref={true}>
                <div className="relative w-[100px] h-[50px]">
                    <Image
                        src={"/images/icons/logo.png"}
                        alt="logo"
                        fill
                        className="object-contain"
                        sizes="(max-width: 1280px) 100px"
                        priority
                    />
                </div>
            </Link>
        </li>
    );
};

export default Logo;
