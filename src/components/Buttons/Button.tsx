import React from "react";
import { motion, Variants } from "framer-motion";

const buttonMotion: Variants = {
    hover: {
        opacity: 0.9,
        fill: "#fff",
    },
    tap: {
        scale: 0.9,
    },
};

interface ButtonProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode;
    handleClick?: () => void;
    className?: string;
}
const Button = ({ children, handleClick, className, disabled }: ButtonProps) => {
    return (
        <motion.button
            disabled={disabled}
            variants={buttonMotion}
            whileHover={disabled ? "" : "hover"}
            whileTap={disabled ? "" : "tap"}
            onClick={handleClick}
            className={`${className ? className : ""}`}
        >
            {children}
        </motion.button>
    );
};

export default Button;
