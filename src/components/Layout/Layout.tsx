import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import Topbar from "../Topbar/Topbar";
import Bottombar from "../Bottombar/Bottombar";
import Footer from "../Footer/Footer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signInUser, signOutUser } from "../../features/user/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { closeSearch } from "../../features/search/searchSlice";
import { closeUserNav } from "../../features/userNav/userNavSlice";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter();
    const isNotAuthRoute = router.asPath !== "/signin" && router.asPath !== "/signup";
    const isNotSubscriptionRoute = router.asPath !== "/subscription";
    const isNotAccRoute = router.asPath !== "/account";

    const dispatch = useAppDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(signInUser({ email: user.email! }));
            } else {
                dispatch(signOutUser());
            }
        });
    }, [dispatch]);

    const { search, userNav } = useAppSelector((state) => state);
    const handleClick = () => {
        if (search) {
            dispatch(closeSearch());
        }
        if (userNav) {
            dispatch(closeUserNav());
        }
    };

    return (
        <>
            <Head>
                <title>Primax</title>
                <link rel="icon" href="/images/icons/logo-sm.png" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
                <div key={router.pathname} onClick={handleClick}>
                    {isNotAuthRoute && <Topbar />}
                    <main>{children}</main>
                    {isNotAuthRoute && isNotSubscriptionRoute && isNotAccRoute && <Footer />}
                    {isNotAuthRoute && <Bottombar />}
                </div>
            </AnimatePresence>
        </>
    );
};

export default Layout;
