import { useEffect, useState } from "react";

const useWinDims = () => {
    const [windowSize, setWindowSize] = useState<{ width: number; height: number } | null>(null);

    useEffect(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, []);

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return windowSize;
};

export default useWinDims;
