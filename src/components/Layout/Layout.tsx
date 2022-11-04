import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import Topbar from "../Topbar/Topbar";
import Bottombar from "../Bottombar/Bottombar";
import Footer from "../Footer/Footer";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter();
    const isNotAuthRoute = router.asPath !== "/signin" && router.asPath !== "/signup";
    const isNotSubscriptionRoute = router.asPath !== "/subscription";
    const isNotAccRoute = router.asPath !== "/account";

    return (
        <>
            <Head>
                <title>Primax</title>
                <link rel="icon" href="/images/icons/logo-sm.png" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
                <div key={router.pathname}>
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
