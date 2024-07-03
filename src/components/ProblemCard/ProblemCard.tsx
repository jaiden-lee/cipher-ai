import Image from "next/image";
import Link from "next/link";

export type ProblemCardData = {
    problemId: string,
    problemName: string,
    difficulty: string,
    completed: boolean
}

function ProblemCard(props: ProblemCardData) {
    const difficultyColor = (props.difficulty === "Easy" ? "green-easy" : (props.difficulty === "Medium") ? "yellow-medium" : "red-hard");
    return (
        <Link href={`/problems/${props.problemId}`} className="aspect-square shadow-center bg-white overflow-hidden rounded-md transition-all hover:scale-[1.025] active:scale-[.975]">
            <div className={`bg-${difficultyColor} flex w-full h-[70%] overflow-hidden items-start justify-start box-border p-2`}>
                <p className="text-[rgb(0,0,0,.35)] font-medium">{props.difficulty}</p>
                {
                    props.completed &&
                    <Image src="icons/completed.svg" width={100} height={100} alt="Problem is completed" className="w-[20%] ml-auto mt-auto" />
                }
            </div>
            <h3 className="text-ellipsis text-center font-semibold text-blue-header">{props.problemName}</h3>
        </Link>
    );
}

export default ProblemCard;