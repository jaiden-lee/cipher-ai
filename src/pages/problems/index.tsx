// Types
import type { GetServerSidePropsContext } from "next";
import type { ProblemCardData } from "@/components/ProblemCard/ProblemCard";
// Libraries
import nookies from "nookies";
// Utils
import {auth, firestore} from "@/utils/firebase-server";
import ProblemCard from "@/components/ProblemCard/ProblemCard";
import { outfit } from "@/utils/fonts";
import { problemInfo } from "@/utils/problems-server"; // only use in getServerSideProps


type ProblemsPageProps = {
    problems: ProblemCardData[]
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

    try {
        // Get all problems
        const documents = Object.entries(problemInfo);

        // Get the completed problems via auth
        let completedProblems: string[] = [];
        try {
            const cookies = nookies.get(context);
            const JWT = await auth.verifyIdToken(cookies.token); // if fails returns an error (like no token provided)
            const {uid} = JWT;
            
            const userRef = firestore.collection("users").doc(uid);
            const userDoc = await userRef.get();
            if (userDoc.exists) {
                completedProblems = userDoc.data()?.solvedProblems || [];
            }
        } catch (error) {}; // do nothing, completed problems will remain as an empty array

        const completedSet = new Set(completedProblems);
    
        const problems: ProblemCardData[] = [];

        // Goes through all documents, and adds it to the problems list (and determines if the problem has been solved or not)
        for (let [id, problem] of documents) {
            const pid = id;
            const problemName = problem.title;
            const difficulty = problem.difficulty;

            if (pid && difficulty && problemName) {
                const completed = completedSet.has(pid);
                const problem: ProblemCardData = {
                    problemId: pid,
                    problemName: problemName,
                    difficulty: difficulty,
                    completed: completed
                };
                problems.push(problem);
            }
        }


        return {
            props: {
                problems: problems
            }
        }
    } catch (error) {
        return {
            props: {
                problems: []
            }
        }
    }
}
// FOR NOW, JUST DISPLAY ALL PROBLEMS, NO FILTER YET OR SEARCH YET
// ADD PAGINATION LATER AS WELL
function ProblemsPage(props: ProblemsPageProps) {
    const problemComponents = props.problems.map((problem) => <ProblemCard {...problem} key={problem.problemId} />);
    return (
        <div className="box-border py-6 px-4">
            <h1 className={`${outfit.className} text-blue-header text-3xl font-semibold`}>All Problems</h1>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(12.5rem,1fr))] gap-4 mt-4">
                {problemComponents}
            </div>
        </div>
    );
}

export default ProblemsPage;