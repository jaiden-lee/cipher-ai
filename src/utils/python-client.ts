// import { loadPyodide } from "pyodide";
import { TestCase } from "./problemInfoType";
const util = require('util');
const exec = util.promisify(require('child_process').exec);


export default async function runPython(problemData: {starterFunctionName: string, test_cases: TestCase[], comparisonCode: string}, code: string) {
    // const pyodide = await loadPyodide();
    const functionName = problemData.starterFunctionName; // used to call the user written function
    try {
        console.log(JSON.stringify(problemData.test_cases));
        const setupStr = `
import json
${problemData.comparisonCode}

${code}
test_cases_string=${JSON.stringify(problemData.test_cases)}
test_cases=json.loads(test_cases_string)

for test_case in test_cases:
    res = ${functionName}(**test_case["input"])
    output = test_case["output"]
    isSuccess = equals(res, output)
    if !isSuccess:
        print(f"Failed test case: {test_case.input}")

print("Passed all test cases")
`;
        const inputStr = `x=10
print(x)
`;
        const singleLine = setupStr.replace("\n", ' ');
        console.log(singleLine);
        const {stdout, stderr } = await exec(`python python-helper.py`);
        console.log(stdout);
        console.log(stderr);

            // pyodide.runPython(setupStr);
        
//             for (let test_case of problemData.test_cases) {
//                 const inputStr = `
// ${test_case.input}

// res = ${functionName}
// output = ${test_case.output}

// equals(res, output)
// `
//                 // const res = pyodide.runPython(inputStr);
//                 if (res) {
//                     continue;
//                 }
                // return {
                //     succes: false,
                //     message: `Failed test case: ${test_case.input}`
                // }; // failed test case
            // }

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