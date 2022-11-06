import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormBtn from "./FormBtn";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import Input from "./Input";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import AuthError from "./AuthError";
import Spinner from "../Icons/Spinner";
import { auth } from "../../firebase/firebase";

const AuthForm = () => {
    const router = useRouter();
    const isSignIn = router.asPath === "/signin";

    const [error, setError] = useState("");
    async function signin(values: { email: string; password: string }) {
        try {
            await signInWithEmailAndPassword(auth, values.email, values.password);
            router.push("/");
        } catch (error) {
            if (error instanceof FirebaseError) {
                setError(error.code);
            }
        }
    }

    async function signup(values: { email: string; password: string }) {
        try {
            await createUserWithEmailAndPassword(auth, values.email, values.password);
            router.push("/");
        } catch (error) {
            if (error instanceof FirebaseError) {
                setError(error.code);
            }
        }
    }
    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
                email: Yup.string().email("Invalid email address").required("Email is required"),
                password: Yup.string()
                    .required("Password is required")
                    .min(6, "Password must be atleast 6 characters long"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
                isSignIn ? await signin(values) : await signup(values);
                setSubmitting(false);
            }}
        >
            {(formik) => (
                <>
                    <h1 className="text-xl  w-full text-center mb-12">
                        {router.asPath === "/signin" ? "Sign In" : "Sign Up"}
                    </h1>
                    <Form noValidate autoComplete="off">
                        <Input label="EMAIL" props={{ type: "email", name: "email" }} />
                        <Input label="PASSWORD" props={{ type: "password", name: "password" }} />

                        <div className="flex gap-10">
                            <FormBtn type="submit" disabled={formik.isSubmitting} className="bg-orange">
                                Submit
                            </FormBtn>
                            <FormBtn type="reset" disabled={formik.isSubmitting} className="border border-orange">
                                Reset
                            </FormBtn>
                        </div>
                        {formik.isSubmitting && (
                            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-sm">
                                <Spinner />
                            </div>
                        )}
                    </Form>
                    <AuthError error={error} setError={setError} />
                </>
            )}
        </Formik>
    );
};

export default AuthForm;
