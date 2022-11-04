import { useEffect } from "react";

const useDontScrollModal = (open: boolean) => {
    useEffect(() => {
        if (typeof window != "undefined" && window.document && open) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    });
};

export default useDontScrollModal;
