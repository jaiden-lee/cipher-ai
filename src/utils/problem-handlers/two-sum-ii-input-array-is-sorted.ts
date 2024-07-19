const test_cases = [
    {
        input: {
            nums: [2,7,11,15],
            target: 9
        },
        output: [1,2],
    },
    {
        input: {
            nums: [2,3,4],
            target: 6
        },
        output: [1,3],
    },
    {
        input: {
            nums: [-1,0],
            target: -1
        },
        output: [1,2],
    }
]

export default function twoSumII(callback: Function) {
    for (let test_case of test_cases) {
        try {
            const expected = test_case.output
            const userOutput = callback(test_case.input.nums, test_case.input.target);
            const success = equals(expected, userOutput);
            if (!success) {
                console.log(userOutput);
                return {
                    success: false,
                    message: `Failed test case: nums: ${test_case.input.nums}, target: ${test_case.input.target}`
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

function equals(expected: number[], userOutput: any) {
    if (Array.isArray(userOutput) && userOutput.length == expected.length) {
        if (userOutput[0] === expected[0] && userOutput[1] === expected[1]) {
            return true;
        }
        if (userOutput[0] === expected[1] && userOutput[1] === expected[0]) {
            return true;
        }
    }
    return false;
}