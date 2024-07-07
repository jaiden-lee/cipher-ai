import { ProblemInfoType } from "./problemInfoType"




export const problemInfo: Record<string, ProblemInfoType> = {
    "two-sum": {
        category: ["Array", "Hashing"],
        difficulty: "Easy",
        title: "Two Sum",
        description: `<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>

<p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>

<p>You can return the answer in any order.</p>`,
        examples: [
            {
                id: 1,
                inputText: `nums = [2,7,11,15], target = 9`,
                outputText: `[0,1]`,
                explanation: `Because nums[0] + nums[1] == 9, we return [0, 1].`,
            },
            {
                id: 2,
                inputText: `nums = [3,2,4], target = 6`,
                outputText: `[1,2]`,
            },
            {
                id: 3,
                inputText: `nums = [3,3], target = 6`,
                outputText: `[0,1]`,
            },
        ],
        constraints: [
            "<code>2 <= nums.length <= 10^4</code>",
            "<code>-10^9 <= nums[i] <= 10^9</code>",
            "<code>-10^9 <= target <= 10^9</code>",
            "<strong>Only one valid answer exists.</strong>"
        ],
        starterCode: `function twoSum(nums, target) {

}`,
        starterFunctionName: "function twoSum(",
    }
}