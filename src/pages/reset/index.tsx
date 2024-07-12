// Next/React
import { useState, useTransition, useRef } from "react";
import Link from "next/link";
// Types
import type { ChangeEvent, FormEvent } from "react";
// Libraries
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
// Utils
import { outfit } from "@/utils/fonts";
import {auth} from "@/utils/firebase";

type RefType = HTMLInputElement | null;

/**
 * No validation checking here, since it doesn't matter if valid email or not, we just need to check if the account exists
 */
function ResetPage() {
    // Reset password function
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
    
    const [isPending, setIsPending] = useState(false); // use a pending state, even though I have sending state just in case email doesn't start sending immediately, so sending is still false


    const [userFormData, setUserFormData] = useState({email: ""});


    function handleChange(property: "email") {
        return (e: ChangeEvent<HTMLInputElement>) => {
            setUserFormData((prevUserFormData) => {
                return {
                    ...prevUserFormData,
                    [property]: e.target.value
                }
            })
        }
    }

    async function handleReset() {
        const res = await sendPasswordResetEmail(userFormData.email); // don't need result, bc if email not in system, we just don't send email
        console.log(res);
        setUserFormData({
            email: ""
        });
        setIsPending(false);
        
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!isPending) {
            setIsPending(true);
           
            handleReset();
        }
    }

    return (
        <div className="w-full flex justify-center items-center min-h-[80vh]">
            <div className="max-w-[32rem] w-full bg-white border-gray-stroke rounded-lg shadow-center p-10 text-blue-header">
                <h1 className={`${outfit.className} text-center text-2xl font-semibold mb-6`}>Reset your password</h1>
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                    {/* Email */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-medium pb-2">Email address <span className="text-red-400">*</span></label>
                        <input 
                            type="text" 
                            id="text" 
                            className="outline-none border-[1px] border-gray-stroke px-4 py-2 rounded-md text-gray-text-dark" 
                            required 
                            placeholder="Enter email here" 
                            onChange={handleChange("email")} 
                            value={userFormData.email}
                        />
                    </div>

                    <button type="submit" className="button-primary text-lg font-medium mt-4" disabled={isPending}>Send reset email</button>
                </form>
                {/* Footer */}
                <div className="mt-4">
                    <p className="text-center">{"Don't have an account?"} <Link href="/signup" className="text-blue-primary hover:underline">Sign up here.</Link></p>
                    <p className="text-center">{"Trying to sign in?"} <Link href="/login" className="text-blue-primary hover:underline">Log in here</Link></p>
                </div>
            </div>
        </div>
    );
}

export default ResetPage;