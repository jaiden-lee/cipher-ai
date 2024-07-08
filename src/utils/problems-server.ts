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
    }
}