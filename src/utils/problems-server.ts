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
    },
    "contains-duplicate": {
        category: ["Array", "Hashing"],
        difficulty: "Easy",
        title: "Contains Duplicate",
        description: `<p>Given an integer array <code>nums</code>, return <code>true</code> if any value appears <strong>at least twice</strong> in the array, and return <code>false</code> if every element is distinct.</p>`,
        examples: [
            {
                id: 1,
                inputText: `nums = [1,2,3,1]`,
                outputText: `true`,
            },
            {
                id: 2,
                inputText: `nums = [1,2,3,4]`,
                outputText: `false`,
            },
            {
                id: 3,
                inputText: `nums = [1,1,1,3,3,4,3,2,4,2]`,
                outputText: `true`,
            },
        ],
        constraints: [
            "<code>1 <= nums.length <= 10^5</code>",
            "<code>-10^9 <= nums[i] <= 10^9</code>",
        ],
        starterCode: `function containsDuplicate(nums) {

}`,
        starterFunctionName: "function containsDuplicate("
    },
    "valid-anagram": {
        category: ["Array", "Hashing"],
        difficulty: "Easy",
        title: "Valid Anagram",
        description: `<p>Given two strings <code>s</code> and <code>t</code>, return <code>true</code> <em>if</em> <code>t</code> <em>is an anagram of</em> <code>s</code><em>, and</em> <code>false</code> <em>otherwise</em>.</p>

<p>An <strong>Anagram</strong> is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.</p>`,
        examples: [
            {
                id: 1,
                inputText: `s = "anagram", t = "nagaram"`,
                outputText: `true`,
            },
            {
                id: 2,
                inputText: `s = "rat", t = "car"`,
                outputText: `false`,
            },
        ],
        constraints: [
            "<code>1 <= s.length, t.length <= 5 * 10^4</code>",
            "<p><code>s</code> and <code>t</code> consist of lowercase English letters.</p>",
        ],
        starterCode: `function validAnagram(s, t) {

}`,
        starterFunctionName: "function validAnagram("
    },
    "two-sum-ii-input-array-is-sorted": {
        title: "Two Sum II - Input Array Is Sorted",
        category: ["Two Pointers", "Array"],
        difficulty: "Medium",
        description: `<p>Given a <strong>1-indexed</strong> array of integers <code>numbers</code> that is already <strong><em>sorted in non-decreasing order</em></strong>, find two numbers such that they add up to a specific <code>target</code> number. Let these two numbers be <code>numbers[index<sub>1</sub>]</code> and <code>numbers[index<sub>2</sub>]</code> where <code>1 &lt;= index<sub>1</sub> &lt; index<sub>2</sub> &lt;= numbers.length</code>.</p>

<p>Return<em> the indices of the two numbers, </em><code>index<sub>1</sub></code><em> and </em><code>index<sub>2</sub></code><em>, <strong>added by one</strong> as an integer array </em><code>[index<sub>1</sub>, index<sub>2</sub>]</code><em> of length 2.</em></p>

<p>The tests are generated such that there is <strong>exactly one solution</strong>. You <strong>may not</strong> use the same element twice.</p>

<p>Your solution must use only constant extra space.</p>`,
        examples: [
            {
                id: 1,
                inputText: `numbers = [2,7,11,15], target = 9`,
                outputText: `[1,2]`,
                explanation: `The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].`
            },
            {
                id: 2,
                inputText: `numbers = [2,3,4], target = 6`,
                outputText: `[1,3]`,
                explanation: `The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].`
            },
            {
                id: 3,
                inputText: `numbers = [-1,0], target = -1`,
                outputText: `[1,2]`,
                explanation: `The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].`
            }
        ],
        constraints: [
            "<code>2 <= numbers.length <= 3 * 10^4</code>",
            "<code>-1000 <= numbers[i] <= 1000</code>",
            "<code>numbers</code> is sorted in <strong>non-decreasing order</strong>.",
            "<code>-1000 <= target <= 1000</code>",
            "<li>The tests are generated such that there is <strong>exactly one solution</strong>.</li>"
        ],
        starterCode: `function twoSum(nums, target) {

}`,
        starterFunctionName: "function twoSum("
    },
    "container-with-most-water": {
        title: "Container With Most Water",
        category: ["Two Pointers", "Array"],
        difficulty: "Medium",
        description: `<p>You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>i<sup>th</sup></code> line are <code>(i, 0)</code> and <code>(i, height[i])</code>.</p>

<p>Find two lines that together with the x-axis form a container, such that the container contains the most water.</p>

<p>Return <em>the maximum amount of water a container can store</em>.</p>

<p><strong>Notice</strong> that you may not slant the container.</p>`,
        examples: [
            {
                id: 1,
                inputText: `height = [1,8,6,2,5,4,8,3,7]`,
                outputText: `49`,
                explanation: `The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
Example 2:`,
                image: "https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg"
            },
            {
                id: 2,
                inputText: `height = [1,1]`,
                outputText: `1`
            }
        ],
        constraints: [
            "<code>n == height.length</code>",
            "<code>2 <= n <= 10^5</code>",
            "<code>0 <= height[i] <= 10^4</code>"
        ],
        starterCode: `function maxArea(height) {

}`,
        starterFunctionName: "function maxArea("
    }
}