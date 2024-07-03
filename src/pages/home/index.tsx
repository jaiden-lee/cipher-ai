// Next/React
import { useState, useEffect } from "react";
import Link from "next/link";
// Types
import type { GetServerSidePropsContext } from "next";
import type { ProblemCardData } from "@/components/ProblemCard/ProblemCard";
// Libraries
import nookies from "nookies";
import { FieldPath } from "firebase-admin/firestore";
// Utils
import {auth, firestore} from "@/utils/firebase-server"; // can import server packages since NextJS separates the server bundle and client bundle when compiling
import { batchDocuments } from "@/utils/firestore-helper-functions";
import { outfit } from "@/utils/fonts";
import dynamic from "next/dynamic";
// Components
const ProblemCard = dynamic(() => import("@/components/ProblemCard/ProblemCard"), {ssr: false}); 
/* Need to load this as a client only component since it causes hydration error due to the way I did the media queries
To get everything to fit onto one line, I used a browser API, and browser APIs really mess with hydration a lot, so 
it's easiest to just load it as a client component with no SSR
*/

type HomeProps = {
    displayName: string,
    starredProblems: ProblemCardData[],
    success: boolean
}

// https://colinhacks.com/essays/nextjs-firebase-authentication
export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const cookies = nookies.get(context);
        const JWT = await auth.verifyIdToken(cookies.token); // contains a lot of info, including email, and password
        // If the user is not logged in, this line will fail
        const {uid} = JWT;

        const userDocRef = firestore.collection("users").doc(uid);
        const userDoc = await userDocRef.get();
        if (!userDoc.exists) {
            throw Error("User does not exist");
        }
        const displayName = userDoc.data()?.displayName;
        const starredProblemIDs = userDoc.data()?.starredProblems;
        const solvedProblemIDs = userDoc.data()?.solvedProblems;
        let starredProblems: ProblemCardData[] = [];
        // you can only get up to 10 documents at a time
        if (starredProblemIDs && solvedProblemIDs) {
            const solvedSet = new Set(solvedProblemIDs); // convert to a set, so we can do O(1) look up to check if user completed
            const batches = batchDocuments(starredProblemIDs, 10);
            // Loops through all batches and gets the problems
            for (let batch of batches) {
                const batchRef = firestore.collection("problems").where(FieldPath.documentId(), "in", batch);
                // Goes through problems in this batch, and adds to list
                await batchRef.get().then((docs) => {
                    docs.forEach((doc) => {
                        const pid = doc.data()?.id;
                        const problemName = doc.data()?.title;
                        const difficulty = doc.data()?.difficulty;
                        if (pid && difficulty && problemName) {
                            const completed = solvedSet.has(pid);
                            const problem: ProblemCardData = {
                                problemId: pid,
                                problemName: problemName,
                                difficulty: difficulty,
                                completed: completed
                            };
                            starredProblems.push(problem);
                        }
                    });
                }).catch((error) => {
                    console.log(error); // just basically skips over this set of documents
                });
            }
            
        }
        return {
            props: {
                displayName: displayName,
                starredProblems: starredProblems,
                success: true,
            }
        }
    } catch (e) {
        return {
            props: {
                displayName: "",
                starredProblems: [],
                success: false
            }
        }
    }
}
    

function HomePage(props: HomeProps) {
    // Used to keep track of whether or not to display all solved problems
    const [showAllStarredProblems, setShowAllStarredProblems] = useState(false);

    const starredProblems = props.starredProblems;
    const starredProblemCards = [];
    
    // Number of cards to render
    const [filteredLength, setFilteredLength] = useState(2);
    try {
        useEffect(() => {
            function handleResize() {
                setFilteredLength(2);
                if (window.matchMedia("(min-width: 640px)").matches) {
                    setFilteredLength(3);
                }
                if (window.matchMedia("(min-width: 768px)").matches) {
                    setFilteredLength(4);
                }
                if (window.matchMedia("(min-width: 1024px)").matches) {
                    setFilteredLength(5);
                }
            }
            window.addEventListener("resize", handleResize);
            handleResize();

            return () => window.removeEventListener("resize", handleResize);
        })
        
        // Loops through all solved problems or just first 4, depending on if filter is applied or not
        for (let i = 0; i < (showAllStarredProblems ? starredProblems.length : Math.min(filteredLength, starredProblems.length)); i++) {
            starredProblemCards.push(<ProblemCard {...starredProblems[i]} key={starredProblems[i].problemId} />);
        } // This caused a hydration error, which is why I import ProblemCard as a Client Component (not loaded on server, which is fine anyways since it doesn't impact SEO)
    } catch (e) {/* do nothing; on first render, this will occur since SSR first occurs on the server, so window doesn't exist yet*/}


    return (
        <div className="flex flex-col gap-4 py-6 px-4">
            <h1 className={`${outfit.className} text-blue-header text-3xl font-semibold`}>Home</h1>
            <Link href="/profile" className="flex items-center justify-start gap-8">
                <div className="aspect-square max-w-24 w-full bg-gray-stroke rounded-full"></div>
                <h2 className={`${outfit.className} text-blue-header text-2xl font-semibold`}>Welcome back, {(props.displayName !== "") ? props.displayName : "User"}!</h2>
            </Link>

            {/* Starred */}
            <div>
                <div className="flex items-center justify-start mb-4">
                    <h3 className={`${outfit.className} text-blue-header text-2xl font-semibold`}>Starred</h3>
                    <button 
                        className="underline text-gray-text-dark font-medium ml-auto hover:text-gray-800" 
                        onClick={() => setShowAllStarredProblems((old) => !old)}>
                            {showAllStarredProblems ? "Collapse" : "See all"}
                    </button>
                </div>
                {/* Grid Container */}
                <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`}>
                    {starredProblemCards}
                </div>
            </div>
        </div>
    );
}

export default HomePage;