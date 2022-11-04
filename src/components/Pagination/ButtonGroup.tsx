import React from "react";
import Button from "../Buttons/Button";
import { Chevron } from "../Icons/Arrows";

type ButtonGroupProps = {
    pageNumber: number;
    totalPages: number;
    handleLeftClick: () => void;
    handleRightClick: () => void;
};
const ButtonGroup = ({ pageNumber, totalPages, handleLeftClick, handleRightClick }: ButtonGroupProps) => {
    return (
        <div className="flex gap-10">
            <Button disabled={pageNumber === 1} handleClick={handleLeftClick} className="disabled:opacity-50">
                <Chevron />
            </Button>

            <Button disabled={pageNumber === totalPages} handleClick={handleRightClick}>
                <Chevron className="rotate-180 disabled:opacity-50" />
            </Button>
        </div>
    );
};

export default ButtonGroup;
