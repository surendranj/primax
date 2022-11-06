import Image from "next/image";
import Link from "next/link";
import React from "react";

const FormLogo = () => {
    return (
        <div className="relative w-full h-[50px] bottom-[10%]">
            <Link href={"/"} passHref={true}>
                <Image src={"/images/icons/logo.png"} alt="logo" layout="fill" objectFit="contain" />
            </Link>
        </div>
    );
};

export default FormLogo;
