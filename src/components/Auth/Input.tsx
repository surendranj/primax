import React from "react";
import { FieldHookConfig, useField } from "formik";
import { AnimatePresence, motion } from "framer-motion";

interface InputProps {
    label: string;
    props: FieldHookConfig<string>;
}

const Input = ({ label, props }: InputProps) => {
    const [field, meta] = useField(props);

    return (
        <div className="flex flex-col min-h-[96px]">
            <label htmlFor={props.id || props.name} className="text-xs tracking-widest opacity-50 ">
                {label}
            </label>
            <input
                {...field}
                type={props.type}
                className="bg-transparent border-b h-10 focus:outline-none active:bg-transparent font-semibold"
            />
            <AnimatePresence mode="wait">
                {meta.touched && meta.error ? (
                    <motion.div
                        key={`${meta.error}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-orange text-sm"
                    >
                        {meta.error}
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
};

export default Input;
