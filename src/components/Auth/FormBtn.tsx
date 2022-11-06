import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { motion } from "framer-motion";

// type FormBtnProps extends = {
//     disabled: boolean;
//     type: string;
//   children: React.ReactNode;
//     className?:string
// };

const FormBtn = ({
    disabled,
    type,
    children,
    className,
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return (
        <motion.button
            whileHover={{ opacity: 0.7 }}
            whileTap={{ scale: 0.9 }}
            disabled={disabled}
            type={type}
            className={`w-full h-10  rounded-md font-semibold disabled:opacity-70 disabled:hover:cursor-not-allowed ${
                className ? className : ""
            }`}
        >
            {children}
        </motion.button>
    );
};

export default FormBtn;
