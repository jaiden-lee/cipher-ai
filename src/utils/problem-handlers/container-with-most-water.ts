const test_cases = [
    {
        input: {
            height: [1,8,6,2,5,4,8,3,7],
        },
        output: 49,
    },
    {
        input: {
            height: [1,1],
        },
        output: 1,
    }
]

export default function containerWithMostWater(callback: Function) {
    for (let test_case of test_cases) {
        try {
            const expected = test_case.output
            const userOutput = callback(test_case.input.height);
            const success = equals(expected, userOutput);
            if (!success) {
                console.log(userOutput);
                return {
                    success: false,
                    message: `Failed test case: height: ${test_case.input.height}`
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

function equals(expected: number, userOutput: any) {
    return expected === userOutput;
}