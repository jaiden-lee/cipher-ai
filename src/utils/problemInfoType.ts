// Put type in separate file so it can be loaded on both client and server

export type ProblemExample = {
    id: number,
    inputText: string,
    outputText: string,
    explanation?: string,
    image?: string // use a CDN link
}

export type TestCase = {
    id: number,
    input: string, // directly initializes the input parameters in code
    displayInput?: Record<string, string>, // if exists, displayed as an example to user
    output: any,
}

export type ProblemInfoType = {
    category: string[],
    difficulty: "Easy" | "Medium" | "Hard",
    title: string,
    description: string,
    examples: ProblemExample[],
    constraints: string[],
    starterCode: string,
    starterFunctionName: string,
}