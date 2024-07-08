const test_cases = [
    {
        input: {
            s: "anagram",
            t: "nagaram"
        },
        output: true,
    },
    {
        input: {
            s: "rat",
            t: "car"
        },
        output: false,
    },
    {
        input: {
            s: "egg",
            t: "eg",
        },
        output: false,
    }
]

export default function validAnagram(callback: Function) {
    for (let test_case of test_cases) {
        try {
            const expected = test_case.output
            const userOutput = callback(test_case.input.s, test_case.input.t);
            const success = equals(expected, userOutput);
            if (!success) {
                console.log(userOutput);
                return {
                    success: false,
                    message: `Failed test case: s: ${test_case.input.s}, t: ${test_case.input.t}`
                }
            }
        } catch (e) {
            let message = "Runtime error";
            if (e instanceof Error) {
                message += ": " + e.message;
            }
            return {
                success: false,
                message: message
            }
        }
    }
    return {
        success: true,
        message: "Passed all test cases"
    }
}

function equals(expected: boolean, userOutput: any) {
    return expected === userOutput;
}