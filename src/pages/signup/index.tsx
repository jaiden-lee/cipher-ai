// Next/React
import { useState, useTransition, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
// Types
import type { ChangeEvent, FormEvent } from "react";
// Libraries
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// Utils
import { outfit } from "@/utils/fonts";
import {auth} from "@/utils/firebase";

type RefType = HTMLInputElement | null;

function SignupPage() {
    // Sign in function --> used for after user creates his account
    const [signInWithEmailAndPassword, user, signInLoading, signInError] = useSignInWithEmailAndPassword(auth);
    const [userFormData, setUserFormData] = useState({
        email: "",
        displayName: "",
        password: ""
    });
    // this is used for display primarily, we will check validity with JS function as well
    const [formDataInvalid, setFormDataInvalid] = useState({
        email: false,
        displayName: false,
        password: false
    });
    
    // Used to display an error message if an error code while creating new account
    const [submissionError, setSubmissionError] = useState("");

    const emailRef = useRef<RefType>(null);
    const passwordRef = useRef<RefType>(null);

    const [isPending, setIsPending] = useState(false);

    /**
     * Calls the createaccount API endpoint on server
     * If fails, then it displays the error message
     * If success, logs user in, and redirects them to home page (handled in _app)
     */
    async function createAccount() {
        try {
            // Successfully creates user account
            const response = await axios.post("/api/createuser", userFormData); // don't need to encrypt password since HTTPS encrypts automatically
            setSubmissionError("");

            await signInWithEmailAndPassword(userFormData.email, userFormData.password);
            // This should sign user in
        } catch (error) {
            // User account creation failed
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data.message;
                setSubmissionError(errorMessage);
            } else {
                console.log(error);
                setSubmissionError("Sorry, an error has occurred. Please try again later.");
            }
        }
        setUserFormData({
            email: "",
            displayName:"",
            password: ""
        });
        setIsPending(false);
    }

    // This function runs when the user submits the form;
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // Prevents user from resubmitting form until submission is done processing
        if (!isPending) {
            setIsPending(true);
            if (e.currentTarget.checkValidity() && !formDataInvalid.email && !formDataInvalid.password && !formDataInvalid.displayName) {
                // Creating account
                createAccount();
            } else {
                // Client side form validation
                const emailInvalid = (emailRef.current?.validity.valid ? false : true);
                const passwordInvalid = (passwordRef.current?.validity.valid ? false : true) || (userFormData.password.length < 6);
                const displayNameInvalid = (userFormData.displayName.length < 3 || userFormData.displayName.length > 20);
                setFormDataInvalid({
                    email: emailInvalid,
                    displayName: displayNameInvalid,
                    password: passwordInvalid 
                });
                setIsPending(false);
            }
        }  
    }

    function handleChange(property: "email" | "password" | "displayName") {
        return (e: ChangeEvent<HTMLInputElement>) => {
            setUserFormData((prevUserFormData) => {
                return {
                    ...prevUserFormData,
                    [property]: e.target.value
                }
            })
            setFormDataInvalid((prevState) => {
                let valid = !e.target.validity.valid;
                if (property === "password") {
                    if (e.target.value.length < 6) {
                        valid = true;
                    }
                } else if (property === "displayName") {
                    if (e.target.value.length < 3 || e.target.value.length > 20) {
                        valid = true;
                    }
                }
                return {
                    ...prevState,
                    [property]: valid
                }
            })
        }
    }

    async function googleSignIn() {
        if (!isPending) {
            const provider = new GoogleAuthProvider();
            try {
                const result = await signInWithPopup(auth, provider);
                const JWT = await result.user.getIdToken();
                const displayName = result.user.displayName;
                const email = result.user.email;
                
                try {
                    const res = await axios.post("/api/createuserwithgoogle", {
                        token: JWT,
                        displayName: displayName,
                        email: email
                    });
                    console.log(res.data);
                } catch (e) {
                    console.log(e);
                }
            } catch (e) {
                console.log(e);
            }
            
        }
    }

    return (
        <div className="w-full flex justify-center items-center min-h-[80vh] mt-4">
            <div className="max-w-[32rem] w-full bg-white border-gray-stroke rounded-lg shadow-center p-10 text-blue-header">
                <h1 className={`${outfit.className} text-center text-2xl font-semibold mb-6`}>Sign up for Cipher!</h1>
                {
                    submissionError !== "" &&
                    <p className="text-center p-2 bg-red-400 text-white rounded-md mb-4">{submissionError}</p>
                }
                {/* OAuth sign in */}
                <div className="flex flex-col">
                    {/* Google */}
                    <button className="button-secondary py-2 text-blue-header font-medium rounded-md flex justify-center items-center gap-2" onClick={googleSignIn}>
                        <Image src="/icons/google-logo.svg" width={800} height={800} alt="Sign up with Google" className="w-6"/> 
                        Sign up with Google
                    </button>
                </div>
                
                <hr className="mt-4 mb-4 border-gray-stroke" />

                {/* Email password sign in  */}
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                    {/* Email */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-medium pb-2">Email address <span className="text-red-400">*</span></label>
                        <input 
                            ref={emailRef} 
                            type="email" 
                            id="email" 
                            className="outline-none border-[1px] border-gray-stroke px-4 py-2 rounded-md text-gray-text-dark" 
                            required 
                            placeholder="Enter email here" 
                            onChange={handleChange("email")} 
                            value={userFormData.email}
                        />
                        {
                            formDataInvalid.email &&
                            <p className="text-red-400 mt-1 text-sm">You must enter a valid email address</p>
                        }
                    </div>
                    {/* Display Name */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-medium pb-2">Display name <span className="text-red-400">*</span></label>
                        <input 
                            ref={emailRef} 
                            type="text" 
                            id="text" 
                            className="outline-none border-[1px] border-gray-stroke px-4 py-2 rounded-md text-gray-text-dark" 
                            required 
                            placeholder="Enter display name here" 
                            onChange={handleChange("displayName")} 
                            value={userFormData.displayName}
                        />
                        {
                            formDataInvalid.displayName &&
                            <p className="text-red-400 mt-1 text-sm">Your display name must be at least 3 characters and no more than 20 characters.</p>
                        }
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
                        {
                            formDataInvalid.password &&
                            <p className="text-red-400 mt-1 text-sm">Password must be at least 6 characters long</p>
                        }
                    </div>

                    <button type="submit" className="button-primary text-lg font-medium mt-4" disabled={isPending}>{isPending ? "Processing..." : "Create account!"}</button>
                </form>
                {/* Footer */}
                <div className="mt-4">
                    <p className="text-center">Already have an account? <Link href="/login" className="text-blue-primary hover:underline">Log in here.</Link></p>
                    <p className="text-center">Forgot your password? <Link href="/reset" className="text-blue-primary hover:underline">Reset it here.</Link></p>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;