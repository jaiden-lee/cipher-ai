import { ProblemInfoType } from "./problemInfoType"




export const problemInfo: Record<string, ProblemInfoType> = {
    "best-time-to-buy-and-sell-stock": {
        category: ["Array"],
        difficulty: "Easy",
        title: "Best Time to Buy and Sell Stock",
        description: `<p>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i<sup>th</sup></code> day.</p>

<p>You want to maximize your profit by choosing a <strong>single day</strong> to buy one stock and choosing a <strong>different day in the future</strong> to sell that stock.</p>

<p>Return <em>the maximum profit you can achieve from this transaction</em>. If you cannot achieve any profit, return <code>0</code>.</p>`,
        examples: [
            {
                id: 1,
                inputText: `prices = [7,1,5,3,6,4]`,
                outputText: `5`,
                explanation: `Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.<br>
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.`,
            },
            {
                id: 2,
                inputText: `prices = [7,6,4,3,1]`,
                outputText: `0`,
                explanation: "In this case, no transactions are done and the max profit = 0.",
            },
        ],
        test_cases: [
            {
                id: 1,
                input: "prices = [7,1,5,3,6,4]",
                displayInput: {
                    prices: "[7,1,5,3,6,4]"
                },
                output: 5,
            },
            {
                id: 2,
                input: "prices = [7,6,4,3,1]",
                displayInput: {
                    prices: "[7,6,4,3,1]"
                },
                output: 0,
            }
        ],
        constraints: [
            "<code>1 <= prices.length <= 10^5</code>",
            "<code>0 <= prices.length <= 10^4</code>"
        ],
        starterCode: `def maxProfit(prices):`,
        starterFunctionName: "maxProfit(prices)",
        starterFunctionParams: ["prices"],
        comparisonCode: 
`def equals(result, output):
    return result == output`
    },
    "container-with-most-water": {
        category: ["Two Pointers"],
        difficulty: "Medium",
        title: "Container With Most Water",
        description: `<p>You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>i<sup>th</sup></code> line are <code>(i, 0)</code> and <code>(i, height[i])</code>.</p>

<p>Find two lines that together with the x-axis form a container, such that the container contains the most water.</p>

<p>Return <em>the maximum amount of water a container can store</em>.</p>

<p><strong>Notice</strong> that you may not slant the container.</p>`,
        examples: [
            {
                id: 1,
                inputText: `height = [1,8,6,2,5,4,8,3,7]`,
                outputText: `49`,
                explanation: `The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.`,
                image: "https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg"
            },
            {
                id: 2,
                inputText: `height = [1,1]`,
                outputText: `1`,
            },
        ],
        test_cases: [
            {
                id: 1,
                input: "height = [1,8,6,2,5,4,8,3,7]",
                displayInput: {
                    height: "[1,8,6,2,5,4,8,3,7]"
                },
                output: 49,
            },
            {
                id: 2,
                input: "height = [1,1]",
                displayInput: {
                    height: "[1,1]"
                },
                output: 1,
            }
        ],
        constraints: [
            "<code>n == height.length</code>",
            "<code>2 <= n <= 10^5</code>",
            "<code>0 <= height[i] <= 10^4</code>"
        ],
        starterCode: `def maxArea(height):`,
        starterFunctionName: "maxArea(height)",
        starterFunctionParams: ["height"],
        comparisonCode: 
`def equals(result, output):
    return result == output`
    },
    "jump-game": {
        category: ["Dynamic Programming"],
        difficulty: "Medium",
        title: "Jump Game",
        description: `<p>You are given an integer array <code>nums</code>. You are initially positioned at the array's <strong>first index</strong>, and each element in the array represents your maximum jump length at that position.</p>

<p>Return <code>true</code><em> if you can reach the last index, or </em><code>false</code><em> otherwise</em>.</p>`,
        examples: [
            {
                id: 1,
                inputText: `nums = [2,3,1,1,4]`,
                outputText: `true`,
                explanation: `Jump 1 step from index 0 to 1, then 3 steps to the last index.`,
            },
            {
                id: 2,
                inputText: `nums = [3,2,1,0,4]`,
                outputText: `false`,
                explanation: `You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.`
            },
        ],
        test_cases: [
            {
                id: 1,
                input: "nums = [3,2,1,0,4]",
                displayInput: {
                    nums: "[3,2,1,0,4]"
                },
                output: true,
            },
            {
                id: 2,
                input: "nums = [3,2,1,0,4]",
                displayInput: {
                    nums: "[3,2,1,0,4]"
                },
                output: false,
            }
        ],
        constraints: [
            "<code>1 <= nums.length <= 10^4</code>",
            "<code>0 <= nums[i] <= 10^5</code>",
        ],
        starterCode: `def canJump(nums):`,
        starterFunctionName: "canJump(nums)",
        starterFunctionParams: ["nums"],
        comparisonCode: 
`def equals(result, output):
    return result == output`
    },
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
        test_cases: [
            {
                id: 1,
                input: `nums = [2,7,11,15]\ntarget = 9`,
                displayInput: {
                    nums: "[2,7,11,15]",
                    target: "9"
                },
                output: [0,1],
            },
            {
                id: 2,
                input: "nums = [3,2,4]\ntarget = 6",
                displayInput: {
                    nums: "[3,2,4]",
                    target: "6"
                },
                output: [1,2],
            },
            {
                id: 3,
                input: "nums = [3,3]\ntarget = 6",
                displayInput: {
                    nums: "[3,3]",
                    target: "6"
                },
                output: [0,1],
            }
        ],
        constraints: [
            "<code>2 <= nums.length <= 10^4</code>",
            "<code>-10^9 <= nums[i] <= 10^9</code>",
            "<code>-10^9 <= target <= 10^9</code>",
            "<strong>Only one valid answer exists.</strong>"
        ],
        starterCode: `def twoSum(nums, target):`,
        starterFunctionName: "twoSum(nums, target)",
        starterFunctionParams: ["nums", "target"],
        comparisonCode: 
`def equals(result, output):
    if (result[0] == output[0] and result[1] == output[1]):
        return True
    if (result[0] == output[1] and result[1] == output[0]):
        return True
    return False`
    },
}

/*
"maximum-depth-of-binary-tree": {
        category: ["Tree"],
        difficulty: "Easy",
        title: "Maximum Depth of Binary Tree",
        description: `<p>Given the <code>root</code> of a binary tree, return <em>its maximum depth</em>.</p>

<p>A binary tree's <strong>maximum depth</strong> is the number of nodes along the longest path from the root node down to the farthest leaf node.</p>`,
        examples: [
            {
                id: 1,
                inputText: `root = [3,9,20,null,null,15,7]`,
                outputText: `3`,
                image: "https://assets.leetcode.com/uploads/2020/11/26/tmp-tree.jpg"
            },
            {
                id: 2,
                inputText: `root = [1,null,2]`,
                outputText: `2`,
            },
        ],
        test_cases: [
            {
                id: 1,
                input: "nums = [3,2,1,0,4]",
                displayInput: {
                    nums: "[3,2,1,0,4]"
                },
                output: true,
            },
            {
                id: 2,
                input: "nums = [3,2,1,0,4]",
                displayInput: {
                    nums: "[3,2,1,0,4]"
                },
                output: false,
            }
        ],
        constraints: [
            "<code>1 <= nums.length <= 10^4</code>",
            "<code>0 <= nums[i] <= 10^5</code>",
        ],
        starterCode: `def canJump(nums)`,
        starterFunctionName: "canJump",
        starterFunctionParams: ["nums"],
        comparisonCode: 
`def equals(result, output):
    return result == output`
    },
*/