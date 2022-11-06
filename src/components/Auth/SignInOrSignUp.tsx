import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Link from "next/link";

const SignInOrSignUp = () => {
    const router = useRouter();
    const isLoginRoute = router.asPath === "/signin";
    return (
        <div className="flex gap-2 mt-4 text-sm text-grey">
            {isLoginRoute ? <p>New here?</p> : <p>Have an account?</p>}
            <motion.div whileHover={{ color: "#fff" }}>
                {isLoginRoute ? (
                    <Link href={"/signup"} scroll={false}>
                        Sign Up
                    </Link>
                ) : (
                    <Link href={"/signin"} scroll={false}>
                        Sign In
                    </Link>
                )}
            </motion.div>
        </div>
    );
};

export default SignInOrSignUp;
