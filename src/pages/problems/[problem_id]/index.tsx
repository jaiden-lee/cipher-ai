// Next/React
import { GetServerSidePropsContext } from "next";
import { useEffect, useState, useRef, ChangeEvent, FormEvent } from "react";
// Types
import type { ProblemExample, TestCase } from "@/utils/problemInfoType";
// Libraries
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import nookies from "nookies";
import axios from "axios";
// Utils
// import runPython from "@/utils/python-client";
import { problemInfo } from "@/utils/problems-server";
import { outfit } from "@/utils/fonts";
import { auth as serverAuth, firestore as serverFirestore } from "@/utils/firebase-server"; // only for verifying JWT
import {auth as clientAuth} from "@/utils/firebase";
// Components
import ProblemDescription from "@/components/CodingProblemPage/ProblemDescription";

type CodingProblemProps = {
    success: boolean,
    error: "Loading Error" | "Problem does not exist",
    problem?: {
        id: string,
        description: string,
        title: string,
        difficulty: "Easy" | "Medium" | "Hard",
        constraints: string[],
        examples: ProblemExample[],
        starterCode: string,
        isStarred: boolean,
        starterFunctionName: string,
    }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {problem_id}: {problem_id?: string} = context.query;
    if (problem_id) {
        const problem = problemInfo[problem_id];
        if (problem) {
            const cookies = nookies.get(context);

            // check if user is logged in and to see if they have starred the problem
            let isStarred = false;
            try {
                const JWT = await serverAuth.verifyIdToken(cookies.token);
                const {uid} = JWT;

                const userDocRef = serverFirestore.collection("users").doc(uid);
                const userDoc = await userDocRef.get();
                if (userDoc.exists) {
                    const data = userDoc.data();
                    if (data) {
                        if (data.starredProblems.includes(problem_id)) {
                            isStarred = true;
                        }
                    }
                }

            } catch (e) {} // do nothing, just catch error
            return {
                props: {
                    error: "",
                    success: true,
                    problem: {
                        id: problem_id,
                        title: problem.title,
                        description: problem.description,
                        difficulty: problem.difficulty,
                        constraints: problem.constraints,
                        examples: problem.examples,
                        starterCode: problem.starterCode,
                        isStarred: isStarred,
                        starterFunctionName: problem.starterFunctionName,
                    }
                }
                
            }
        } else {
            return {
                props: {
                    success: false,
                    error: "Problem does not exist"
                }
            }
        }
        
    } else {
        return {
            props: {
                success: false,
                error: "Loading Error"
            }
        }
    }
}

function CodingProblemPage(props: CodingProblemProps) {
    const [running, setRunning] = useState(false);
    const [code, setCode] = useState(props.problem?.starterCode || ""); // can set here, since props never changes unless different page
    const [codeOutput, setCodeOutput] = useState("");
    const codeLoaded = useRef(false); // we only save code typed after code is loaded, to prevent accidental overrides

    // AI CONVERSATION STATE
    const [currentMessage, setCurrentMessage] = useState("");
    const [messagePending, setMessagePending] = useState(false);
    const [messageHistory, setMessageHistory] = useState([
        {
            "role": "assistant",
            "content": [
                {
                    "type": "text",
                    "text": "Hi I'm Cipher! I'm here to clarify any questions you may have and provide hints for this problem. How can I assist you today?"
                }
            ]
        },
    ]);

    const systemPrompt = `
Your name is Cipher. You help the user solve coding interview questions by clarifying any questions and providing hints to the user. 

DO NOT provide the answer to the user. You are only to help the user, not to give them the answer.

Use <code></code> if you want to surround text and emphasize text, and type <br><br> if you want to put text on a new line. 

If you want to create a numbered list, make sure to put <br><br> in between each list element.

Here is the problem name:
${props.problem?.title}

Here is the problem description:
${props.problem?.description}

Here are some examples:
${props.problem?.examples}

Here are the constraints:
${props.problem?.constraints}
`

    async function queryAI() {
        const messages = [{
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": `Hi Cipher!`
                }
            ]
        },
        ...messageHistory, 
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": `Here is my code:\n${code}\n\n${currentMessage}`
                }
            ]
        }]
        try {
            const res = await axios.post("/api/queryai", {
                messages: messages,
                system: systemPrompt
            });
            if (res.data.message[0].text) {
                setMessageHistory((oldHistory) => [
                    ...oldHistory,
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": currentMessage
                            }    
                        ]
                    },
                    {
                        "role": "assistant",
                        "content": [
                            {
                                "type": "text",
                                "text": res.data.message[0].text
                            }    
                        ]
                    },
                ]);
            }
        } catch (e) {
            console.log("API CALL FAILED");
            console.log(e);
        }
        setMessagePending(false);
    }

    // load code from localStorage, but only load on client
    useEffect(() => {
        if (props.problem) {
            const storedCode = localStorage.getItem(props.problem.id);
            if (storedCode) {
                setCode(storedCode);
            }
            codeLoaded.current = true;
        }
    }, [props.problem]);

    // Everytime code changes, it will wait .5 seconds before updating localStorage; if update occurs, resets timer
    useEffect(() => {
        if (codeLoaded.current) {
            const timeoutFunc = setTimeout(() => {
                if (props.problem) {
                    localStorage.setItem(props.problem.id, code);
                }
            }, 500);
    
            return () => clearTimeout(timeoutFunc);
        }
    }, [code, props.problem]);

    function resetCode() {
        if (props.problem) {
            setCode(props.problem.starterCode);
        }
    }

    // Can run code if not logged in, but can't use AI
    async function runCode() {
        if (props.problem) {
            if (!running) {
                setRunning(true);
                try {
                    const res = await axios.post("/api/runjs", {
                        starterFunctionName: props.problem.starterFunctionName,
                        userCode: code,
                        problemId: props.problem.id
                    }, {
                        timeout: 10000
                    });
                    setCodeOutput(res.data.message || "");
                } catch (e) {
                    console.log("TIME OUT");
                    setCodeOutput("Code timed out");
                }
                setRunning(false);
            }
        }
    }

    // Display error
    if (!props.problem) {
        return (
            <div className="box-border p-6">
                <h1 className="text-center text-xl font-bold">{props.error}</h1>
            </div>
        );
    }

    const testCases = props.problem.examples.map((testCase, index) => (
        <div key={index} className="flex flex-col gap-2 mb-4 items-start">
            <h3 className="font-bold">Case {index+1}</h3>
            <code><span className="font-bold">Input:</span> {testCase.inputText}</code>
            <code><span className="font-bold">Output:</span> {testCase.outputText}</code>
        </div>
    ));

    const conversation = messageHistory.map((message, index) => {
        return (
            <div key={index} >
                {
                    message.role === "assistant" ? 
                    <h3 className="font-semibold text-blue-primary">Cipher</h3> : 
                    <h3 className="font-semibold text-blue-header">You</h3>
                }
                <p className="text-blue-header" dangerouslySetInnerHTML={{__html: message.content[0].text}}></p>
            </div>
        );
    });

    function sendMessage(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        if (!messagePending) {
            if (clientAuth.currentUser) {
                setMessagePending(true);
                setCurrentMessage("");
                queryAI();
            }
        }
    }

    return (
        <Split className="text-gray-text-dark flex h-[calc(100dvh-7rem)] mt-4" direction="horizontal" minSize={250}>
            {/* Left */}
            <Split className="flex flex-col items-start h-full w-[50%]" direction="vertical">
                {/* Problem description */}
                <ProblemDescription problem={props.problem} />

                {/* AI */}
                <div className="h-[50%] box-border p-4 pr-6 pl-0 pb-0 w-full">
                    {
                        (clientAuth.currentUser) ? 
                        <div className="flex flex-col h-full w-full">
                            <div className="overflow-auto h-[80%] gap-4 flex flex-col">
                                {conversation}
                            </div>

                            <form onSubmit={sendMessage} className="mt-auto">
                                <input type="text" 
                                    className="outline-none bg-gray-stroke text-gray-text-dark w-full rounded-full py-3 px-4"
                                    placeholder="Enter message here" 
                                    value={currentMessage} 
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {setCurrentMessage(e.target.value)}} 
                                    />
                            </form> 
                        </div> :
                        <div className="flex justify-center w-full">
                            <h3 className="text-blue-header font-semibold text-center">Please sign in to user {"Cipher's"} AI capabilities</h3>
                        </div>
                    }
                    
                </div>
            </Split>

            {/* Right */}
            <Split className="h-full flex flex-col items-start w-[50%]" direction="vertical">
                {/* Code Editor */}
                <div className="w-full h-full overflow-auto flex flex-col">
                    {/* Top bar */}
                    <div className="box-border py-2 px-6 flex items-center border-b-[1px] border-gray-stroke">
                        <button className="button-secondary">JavaScript</button>
                        <button className="ml-auto text-blue-primary font-semibold hover:text-cyan-600 transition-colors" onClick={resetCode}>Reset</button>
                    </div>
                    <CodeMirror
                            value={code}
                            onChange={(value: string) => setCode(value)}
                            extensions={[javascript()]}
                            style={{ fontSize: "16px"}}
                        />
                    <div className="box-border py-2 px-6 flex items-center mt-auto border-t-[1px] border-gray-stroke">
                        <button className="button-primary font-semibold py-1 rounded-xl ml-auto" onClick={runCode} disabled={running}>{running ? "Submitting" : "Submit"}</button>
                    </div>
                </div>
                
                {/* Console */}
                <div className="w-full overflow-auto">
                    <div className="box-border py-2 px-6 flex items-center w-full mt-auto border-b-[1px] border-gray-stroke">
                        <h2 className="text-blue-primary font-semibold text-lg">Test Cases</h2>
                    </div>

                    {
                        codeOutput !== "" && 
                        <div className="box-border p-4">
                            <p className={`${codeOutput === "Passed all test cases" ? "bg-green-500" : "bg-red-400"} box-border p-3 text-white rounded-md`}>{codeOutput}</p>
                        </div>
                    }
                
                    <div className="box-border p-4">
                        {testCases}
                    </div>
                </div>
            </Split>

        </Split>
    );
}

export default CodingProblemPage;