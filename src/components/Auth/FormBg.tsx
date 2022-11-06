import Image from "next/image";
import React from "react";

const FormBg = () => {
    return (
        <div className="absolute z-0 top-0 left-0 w-full h-full">
            <div className="relative w-full h-full opacity-10">
                <Image src={"/images/background/central-cinema.jpg"} layout="fill" objectFit="cover" alt="background" />
            </div>
        </div>
    );
};

export default FormBg;
