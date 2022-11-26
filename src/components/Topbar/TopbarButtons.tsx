import React from "react";
import Avatar from "../Icons/Avatar";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import Close from "../Icons/Close";
import { auth } from "../../firebase/firebase";
import { closeUserNav, toggleUserNav } from "../../features/userNav/userNavSlice";

const AvatarButton = () => {
    const dispatch = useAppDispatch();
    return (
        <button onClick={() => dispatch(toggleUserNav())}>
            <Avatar />
        </button>
    );
};

export const SignInUpBtn = () => {
    const router = useRouter();
    const { user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(closeUserNav());
        if (user) {
            signOut(auth);
            router.push("/");
        } else {
            router.push("/signin");
        }
    };
    return (
        <motion.button
            whileHover={{ color: "#FF5E5B" }}
            onClick={handleClick}
            className="self-start border border-orange rounded-md py-1 w-24"
        >
            {user === false ? "Sign In" : "Sign Out"}
        </motion.button>
    );
};

export const CloseBtn = () => {
    const dispatch = useAppDispatch();

    return (
        <button onClick={() => dispatch(closeUserNav())}>
            <Close className="absolute top-1 right-1 w-5 h-5" />
        </button>
    );
};

export default AvatarButton;
