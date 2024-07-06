// Next/React
import { useState, useTransition, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// Types
import type { ChangeEvent, FormEvent } from "react";
// Libraries
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import axios from "axios";
// Utils
import { outfit } from "@/utils/fonts";
import {auth} from "@/utils/firebase";
import { sign } from "crypto";

type RefType = HTMLInputElement | null;

/**
 * No validation checking here, since it doesn't matter if valid email or not, we just need to check if the account exists
 */
function LoginPage() {
    // Sign in function --> used for after user creates his account
    const [signInWithEmailAndPassword, user, signInLoading, signInError] = useSignInWithEmailAndPassword(auth);
    // There are 2 types of errors: auth/invalid-credential and auth/invalid-email
    // But in either case, we will always say "wrong email or password"

    const [userFormData, setUserFormData] = useState({
        email: "",
        password: ""
    });

    const emailRef = useRef<RefType>(null);
    const passwordRef = useRef<RefType>(null);

    const [isPending, setIsPending] = useState(false);

    /**
     * Logs the user in and handles error state as well
     */
    async function loginUser() {
        await signInWithEmailAndPassword(userFormData.email, userFormData.password);
        setIsPending(false);
        setUserFormData({
            email: "",
            password: ""
        });
    }

    // This function runs when the user submits the form;
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // Prevents user from resubmitting form until submission is done processing
        if (!isPending) {
            setIsPending(true);
            loginUser();
        }  
    }

    function handleChange(property: "email" | "password") {
        return (e: ChangeEvent<HTMLInputElement>) => {
            setUserFormData((prevUserFormData) => {
                return {
                    ...prevUserFormData,
                    [property]: e.target.value
                }
            })
        }
    }

    return (
        <div className="w-full flex justify-center items-center min-h-[80vh]">
            <div className="max-w-[32rem] w-full bg-white border-gray-stroke rounded-lg shadow-center p-10 text-blue-header">
                <h1 className={`${outfit.className} text-center text-2xl font-semibold mb-6`}>Log in to Cipher!</h1>
                {
                    signInError &&
                    <p className="text-center p-2 bg-red-400 text-white rounded-md mb-4">Sorry, wrong email or password.</p>
                }
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                    {/* Email */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-medium pb-2">Email address <span className="text-red-400">*</span></label>
                        <input 
                            ref={emailRef} 
                            type="text" 
                            id="text" 
                            className="outline-none border-[1px] border-gray-stroke px-4 py-2 rounded-md text-gray-text-dark" 
                            required 
                            placeholder="Enter email here" 
                            onChange={handleChange("email")} 
                            value={userFormData.email}
                        />
                    </div>
                    {/* Password */}
                    <div className="flex flex-col">
                        <label htmlFor="password" className="font-medium pb-2">Password <span className="text-red-400">*</span></label>
                        <input 
                            type="password" 
                            id="password" 
                            ref={passwordRef} 
                            className="outline-none border-[1px] border-gray-stroke px-4 py-2 rounded-md text-gray-text-dark" 
                            required 
                            placeholder="Enter password here" 
                            onChange={handleChange("password")}
                            value={userFormData.password}
                        />
                    </div>

                    <button type="submit" className="button-primary text-lg font-medium mt-4" disabled={isPending}>Log in</button>
                </form>
                {/* Footer */}
                <div className="mt-4">
                    <p className="text-center">{"Don't have an account?"} <Link href="/signup" className="text-blue-primary hover:underline">Sign up here.</Link></p>
                    <p className="text-center">Forgot your password? <Link href="/reset" className="text-blue-primary hover:underline">Reset it here.</Link></p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;