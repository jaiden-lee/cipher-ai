// Types
import type { ProblemExample, TestCase } from "@/utils/problemInfoType";
// Utils
import { outfit } from "@/utils/fonts";
// Components
import DifficultyIndicator from "@/components/CodingProblemPage/DifficultyIndicator";
import StarButton from "@/components/CodingProblemPage/StarButton";

type CodingProblemType = {
    problem: {
        id: string,
        description: string,
        title: string,
        difficulty: "Easy" | "Medium" | "Hard",
        constraints: string[],
        examples: ProblemExample[],
        starterCode: string,
        isStarred: boolean
    }
}

function ProblemDescription(props: CodingProblemType) {
    const examples = props.problem.examples.map((example, index) => (
        <div className="mt-4" key={index}>
            <h3 className="font-bold">Example {index+1}</h3>
            {example.image && <img src={example.image}/>}
            <p><span className="font-bold">Input:</span> {example.inputText}</p>
            <p><span className="font-bold">Output:</span> {example.outputText}</p>
            {example.explanation && <p><span className="font-bold">Explanation:</span> {example.explanation}</p>}
        </div>
    ));

    const constraints = props.problem.constraints.map((constraint, index) => (<li key={index} dangerouslySetInnerHTML={{__html: constraint}}></li>));

    return (
        <div className="overflow-y-scroll pr-6 h-[50%]">
                    <div className="flex items-center mb-4 flex-wrap">
                        <h1 className={`${outfit.className} text-blue-header text-3xl font-semibold max-w-[70%]`}>{props.problem.title}</h1>
                        <div className="flex items-center flex-1">
                            <StarButton problemId={props.problem.id} starred={props.problem.isStarred} />
                            <DifficultyIndicator difficulty={props.problem.difficulty} />
                        </div>
                        
                    </div>
                    
                    <div dangerouslySetInnerHTML={{__html: props.problem.description}} className="flex flex-col gap-2"></div>
                    {examples}
                    <div className="my-4">
                        <h3 className="font-bold">Constraints</h3>
                        <ul>
                            {constraints}
                        </ul>
                    </div>
                </div>
            
                
    );
}

export default ProblemDescription;