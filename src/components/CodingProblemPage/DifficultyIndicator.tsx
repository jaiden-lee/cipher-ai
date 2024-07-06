export type DifficultyIndicatorProps = {
    difficulty: "Easy" | "Medium" | "Hard"
}

function DifficultyIndicator(props: DifficultyIndicatorProps) {
    const difficultyColor = (props.difficulty === "Easy" ? "green-easy" : (props.difficulty === "Medium") ? "yellow-medium" : "red-hard");
    
    return (
        <p className={`ml-auto font-bold box-border py-1 px-2 rounded-full text-center text-[rgb(0,0,0,.35)] bg-${difficultyColor}`}>{props.difficulty}</p>
    );
}

export default DifficultyIndicator;