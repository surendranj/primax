import React, { useEffect } from "react";

import AuthForm from "./AuthForm";
import { motion, Variants } from "framer-motion";

import FormBg from "./FormBg";
import SignInOrSignUp from "./SignInOrSignUp";
import { useAppSelector } from "../../app/hooks";
import { useRouter } from "next/router";
import Spinner from "../Icons/Spinner";

const authMotion: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
};
const Auth = () => {
    const { user } = useAppSelector((state) => state.user);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    });
    return (
        <section className="w-screen h-screen ">
            {/* background */}
            <FormBg />

            {user === false ? (
                <div className="relative z-10 container h-full w-full max-w-[500px] flex flex-col justify-center overflow-hidden">
                    <motion.div variants={authMotion} initial="hidden" animate="visible" exit="exit">
                        <AuthForm />
                        <SignInOrSignUp />
                    </motion.div>
                </div>
            ) : (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                    <Spinner />
                </div>
            )}
        </section>
    );
};

export default Auth;
