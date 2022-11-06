import React from "react";
import Avatar from "../Icons/Avatar";
import { motion } from "framer-motion";
import { useAppSelector } from "../../app/hooks";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import Close from "../Icons/Close";
import { auth } from "../../firebase/firebase";

type ButtonProps = {
    open?: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const AvatarButton = ({ open, setOpen }: ButtonProps) => {
    return (
        <button onClick={() => setOpen(!open)}>
            <Avatar />
        </button>
    );
};

export const SignInUpBtn = ({ setOpen }: ButtonProps) => {
    const router = useRouter();
    const { user } = useAppSelector((state) => state.user);
    const handleClick = () => {
        setOpen(false);
        if (user) {
            signOut(auth);
            router.reload();
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

export const CloseBtn = ({ setOpen }: ButtonProps) => {
    return (
        <button onClick={() => setOpen(false)}>
            <Close className="absolute top-1 right-1 w-5 h-5" />
        </button>
    );
};

export default AvatarButton;
