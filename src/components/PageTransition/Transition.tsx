import { motion } from "framer-motion";
import React from "react";

type TransitionProps = {
    children: React.ReactNode;
};
const Transition = ({ children }: TransitionProps) => {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "tween", duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
};

export default Transition;
