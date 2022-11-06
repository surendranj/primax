import { motion, AnimatePresence } from "framer-motion";
import React, { SetStateAction } from "react";
import Close from "../Icons/Close";

type AuthErrorProps = {
    error: string;
    setError: React.Dispatch<SetStateAction<string>>;
};
const AuthError = ({ error, setError }: AuthErrorProps) => {
    return (
        <AnimatePresence mode="wait">
            {error && (
                <motion.div
                    key={error}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className=" absolute top-2 left-0 right-0 w-[90%] mx-auto py-3 px-6 flex justify-center bg-white text-orange rounded-md drop-shadow-xl"
                >
                    <span className="font-semibold">
                        {error
                            .slice(error.indexOf("/") + 1)
                            .replaceAll("-", " ")
                            .toUpperCase()}
                    </span>
                    <button onClick={() => setError("")}>
                        <Close className="absolute top-1 right-1" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AuthError;
