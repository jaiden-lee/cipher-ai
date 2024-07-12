import type { NextApiRequest, NextApiResponse } from "next";
import {auth, firestore} from "@/utils/firebase-server";

type UserData = {
    uid: string,
    email: string,
    displayName: string,
    createdAt: number,
    updatedAt: number,
    solvedProblems: string[],
    starredProblems: string[]
}

export default async function CreateUserWithGoogle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            let {token, email, displayName} = req.body;
            const JWT = await auth.verifyIdToken(token);
            const {uid} = JWT;

            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: "Email not provided"
                })
            }
            if  (!displayName || displayName === "") {
                displayName = email;
            }

            const userDocRef = firestore.collection("/users").doc(uid);
            const userDoc = await userDocRef.get();
            if (userDoc.exists) {
                return res.status(400).json({
                    success: false,
                    message: "User already exists"
                });
            }

            const userData: UserData = {
                uid: uid,
                email: email,
                displayName: "",
                createdAt: Date.now(),
                updatedAt: Date.now(),
                solvedProblems: [],
                starredProblems: []
            }
            await userDocRef.set(userData);
            res.status(200).json({
                success: true,
                message: "User successfully created!"
            })
        } catch (e) {
            res.status(400).json({
                success: false,
                message: "User could not be verified"
            })
        }
        

    } else {
        res.status(400).json({
            success: false,
            message: "MUST BE POST REQUEST"
        });
    }
}