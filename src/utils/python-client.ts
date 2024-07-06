import { loadPyodide } from "pyodide";
import { TestCase } from "./problemInfoType";

export default async function runPython(problemData: {starterFunctionName: string, test_cases: TestCase[], comparisonCode: string}, code: string) {
    const pyodide = await loadPyodide();
    const functionName = problemData.starterFunctionName; // used to call the user written function
    try {
        const setupStr = `
import json
${problemData.comparisonCode}

${code}
`;
            pyodide.runPython(setupStr);
        
            for (let test_case of problemData.test_cases) {
                const inputStr = `
${test_case.input}

res = ${functionName}
output = ${test_case.output}

equals(res, output)
`
                const res = pyodide.runPython(inputStr);
                if (res) {
                    continue;
                }
                return {
                    succes: false,
                    message: `Failed test case: ${test_case.input}`
                }; // failed test case
            }
            return {
                success: true,
                message: "Passed all test cases"
            }; // passed all test cases 
    } catch (e) {
        let message = "";
        if (e instanceof Error) {
            message = ": "+e.message;
        }
        return {
            success: false,
            message: `Runtime error${message}`
        }
    }
    
}