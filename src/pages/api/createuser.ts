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

export default async function createUser(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const userInfo = req.body;
            const {email, password, displayName} = userInfo;
            if (displayName.length < 3 || displayName.length > 20) {
                throw Error("Display name is too short");
            }
            const newUser = await auth.createUser({
                email: email,
                password: password
            });
            // Only add the document if the user doesn't exist
            const userDocRef = firestore.collection("users").doc(newUser.uid);
            const userDoc = await userDocRef.get();
            if (!userDoc.exists) {
                const newUserData: UserData = {
                    uid: newUser.uid,
                    email: newUser.email || "",
                    displayName: displayName,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    solvedProblems: [],
                    starredProblems: []
                };
                await userDocRef.set(newUserData);
                // cannot provide signin/login code on server, can only handle on client
            }
            res.status(200).json({message: "User successfully created"});
        } catch (error) {
            let message = "Error";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({message: message});
        }
        
    } else {
        res.status(400).json({message: "createUser only accepts POST requests"});
    }
    
}