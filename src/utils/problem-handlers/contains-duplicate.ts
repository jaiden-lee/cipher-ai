const test_cases = [
    {
        input: {
            nums: [1,2,3,1],
        },
        output: true,
    },
    {
        input: {
            nums: [1,2,3,4],
        },
        output: false,
    },
    {
        input: {
            nums: [1,1,1,3,3,4,3,2,4,2],
        },
        output: true,
    }
]

export default function containsDuplicate(callback: Function) {
    for (let test_case of test_cases) {
        try {
            const expected = test_case.output
            const userOutput = callback(test_case.input.nums);
            const success = equals(expected, userOutput);
            if (!success) {
                console.log(userOutput);
                return {
                    success: false,
                    message: `Failed test case: nums: ${test_case.input.nums}`
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