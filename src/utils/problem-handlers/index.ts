import twoSum from "./two-sum";
import containsDuplicate from "./contains-duplicate";
import validAnagram from "./valid-anagram";
import twoSumII from "./two-sum-ii-input-array-is-sorted";
import containerWithMostWater from "./container-with-most-water";

const problemHandlers: Record<string, Function> = {
    "two-sum": twoSum,
    "contains-duplicate": containsDuplicate,
    "valid-anagram": validAnagram,
    "two-sum-ii-input-array-is-sorted": twoSumII,
    "container-with-most-water": containerWithMostWater
}

export default problemHandlers;