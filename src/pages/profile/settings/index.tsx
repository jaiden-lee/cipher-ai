// Next/React
import { useState, useEffect } from "react";
// Types
import type { GetServerSidePropsContext } from "next";
// Libraries
import {auth as serverAuth, firestore} from "@/utils/firebase-server";
import {auth as clientAuth} from "@/utils/firebase";
import nookies from "nookies";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
// Layouts
import ProfileLayout from "@/components/ProfilePage/ProfileLayout";


type UserInfo = {
    displayName: string,
    email: string
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const cookies = nookies.get(context);
        const JWT = await serverAuth.verifyIdToken(cookies.token);
        const {uid, email} = JWT;
        const userDocRef = firestore.collection("users").doc(uid);
        const userDoc = await userDocRef.get();
        if (!userDoc.exists) {
            throw Error("User does not exist");
        }
        const displayName = userDoc.data()?.displayName;
        
        return {
            props: {
                displayName: displayName,
                email: email
            }
        };
    } catch (e) {
        return {
            props: {
                displayName: "",
                email: ""
            }
        }
    }
}

function SettingsPage({displayName, email}: UserInfo) {
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(clientAuth);
    const [resetPasswordPending, setResetPasswordPending] = useState(false);

    async function handlePasswordReset() {
        if (!resetPasswordPending) {
            setResetPasswordPending(true);
            await sendPasswordResetEmail(email);
            setResetPasswordPending(false);
        }
    }

    return (
        <ProfileLayout userInfo={{displayName}}>
            {/* Password */}
            <div className="flex flex-col gap-2 items-start">
                <h3 className="font-semibold text-xl text-blue-header">Password Settings</h3>
                <p className="max-w-full w-[32rem]">Click below and {"we'll"} send a link and instructions for how to change your password</p>
                <button className="button-primary mt-3" onClick={handlePasswordReset} disabled={resetPasswordPending}>{resetPasswordPending ? "Sending..." : "Reset Password"}</button>
            </div>
        </ProfileLayout>
    );
}

export default SettingsPage;