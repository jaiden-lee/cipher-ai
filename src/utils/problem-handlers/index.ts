import twoSum from "./two-sum";
import containsDuplicate from "./contains-duplicate";
import validAnagram from "./valid-anagram";

const problemHandlers: Record<string, Function> = {
    "two-sum": twoSum,
    "contains-duplicate": containsDuplicate,
    "valid-anagram": validAnagram,
}

export default problemHandlers;