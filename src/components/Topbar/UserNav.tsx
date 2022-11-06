import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { AnimatePresence, motion } from "framer-motion";
import AvatarButton, { CloseBtn, SignInUpBtn } from "./TopbarButtons";
import Spinner from "../Icons/Spinner";
import Avatar from "../Icons/Avatar";
import Link from "next/link";

const UserNav = () => {
    const { user, userInfo } = useAppSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    return (
        <>
            <AvatarButton open={open} setOpen={setOpen} />
            <AnimatePresence>
                {open && (
                    <motion.div
                        key={"account"}
                        initial={{ x: 10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 10, opacity: 0 }}
                        className="absolute z-0 w-[80vw] max-w-[400px]  top-12 right-2 flex flex-col items-center gap-4 pt-4 px-4 border border-white  rounded-md bg-gradient-to-b from-black to-black/60 "
                    >
                        {user === undefined ? (
                            <div className="mb-4">
                                <Spinner />
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col items-center ">
                                    <Avatar className="w-10 h-10 mb-4" />
                                    {userInfo && <span className="text-xl">{userInfo.email}</span>}
                                </div>
                                <hr className="w-full mb-4" />
                                <motion.div
                                    whileHover={{ color: "#FF5E5B" }}
                                    whileTap={{ scale: 0.9 }}
                                    className="self-start"
                                >
                                    <Link href={"/mylist"}>My List</Link>
                                </motion.div>

                                <SignInUpBtn setOpen={setOpen} />

                                <CloseBtn setOpen={setOpen} />
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default UserNav;
