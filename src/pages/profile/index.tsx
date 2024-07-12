// Next/React
import { useState, useEffect } from "react";
// Types
import type { GetServerSidePropsContext } from "next";
// Libraries
import {auth, firestore} from "@/utils/firebase-server";
import nookies from "nookies";
import { problemInfo } from "@/utils/problems-server";
// Layouts
import ProfileLayout from "@/components/ProfilePage/ProfileLayout";
// Components
import ProblemCard from "@/components/ProblemCard/ProblemCard";

type SolvedProblem = {
    problemId: string,
    problemName: string,
    difficulty: string
}

type UserInfo = {
    displayName: string,
    solvedProblems: SolvedProblem[]
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const cookies = nookies.get(context);
        const JWT = await auth.verifyIdToken(cookies.token);
        const {uid} = JWT;

        const userDocRef = firestore.collection("users").doc(uid);
        const userDoc = await userDocRef.get();
        if (!userDoc.exists) {
            throw Error("User doesn't exist");
        }
        const displayName = userDoc.data()?.displayName;
        const solvedProblemIDs = userDoc.data()?.solvedProblems;
        const solvedProblems = solvedProblemIDs.map((id: string) => {
            return {
                problemId: id,
                problemName: problemInfo[id]?.title,
                difficulty: problemInfo[id]?.difficulty
            }
        });
        
        return {
            props: {
                displayName: displayName,
                solvedProblems: solvedProblems
            }
        }
    } catch (e) {
        return {
            props: {
                displayName: "",
                solvedProblems: []
            }
        }
    }
}

function ProfilePage({displayName, solvedProblems}: UserInfo) {
    const [showAllSolvedProblems, setShowAllSolvedProblems] = useState(false);

    
    
    const solvedProblemCards = [];
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
        
        

        for (let i = 0; i < (showAllSolvedProblems ? solvedProblems.length : Math.min(filteredLength, solvedProblems.length)); i++) {
            const problem = solvedProblems[i];
            solvedProblemCards.push(<ProblemCard problemId={problem.problemId} problemName={problem.problemName} completed={true} difficulty={problem.difficulty} />);
        }
    } catch (e) {}

    return (
        <ProfileLayout userInfo={{displayName}}>
            {/* Solved */}
            <div>
                <div className="flex items-center justify-start mb-4">
                    <h3 className={`text-blue-header text-xl font-semibold`}>Solved</h3>
                    <button 
                        className="underline text-gray-text-dark font-medium ml-auto hover:text-gray-800" 
                        onClick={() => setShowAllSolvedProblems((old) => !old)}>
                            {showAllSolvedProblems ? "Collapse" : "See all"}
                    </button>
                </div>
                {/* Grid Container */}
                <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`}>
                    {solvedProblemCards}
                </div>
            </div>
        </ProfileLayout>
    );
}

export default ProfilePage;