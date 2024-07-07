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
    input: Record<string, any>, // directly initializes the input parameters in code
    displayInput?: Record<string, string>, // if exists, displayed as an example to user
    output: any,
}

export type ProblemInfoType = {
    category: string[],
    difficulty: "Easy" | "Medium" | "Hard",
    title: string,
    description: string,
    examples: ProblemExample[],
    test_cases: TestCase[],
    constraints: string[],
    starterCode: string,
    starterFunctionName: string,
    starterFunctionParams: string[], // determines order to pass in aprameters to function
    comparisonCode: string, // just in case you have a case where you have to compare arrays and order doesn't matter or smth
    codeSetup?: string
}