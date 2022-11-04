import React from "react";

type RupeeProps = {
    className?: string;
};
const Rupee = ({ className }: RupeeProps) => {
    return (
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${className ? className : ""}`}
        >
            <path
                d="M35.9999 10H13.9999H19.9999C22.1217 10 24.1565 10.8429 25.6568 12.3431C27.1571 13.8434 27.9999 15.8783 27.9999 18C27.9999 20.1217 27.1571 22.1566 25.6568 23.6569C24.1565 25.1571 22.1217 26 19.9999 26H13.9999L25.9999 38"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M13.9999 18H35.9999" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default Rupee;
