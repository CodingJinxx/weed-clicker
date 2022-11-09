export default function Score(props : {score : number}) {
    return (
        <>
            <h1 className="w-12 h-3 bg-red"> {props.score} </h1>
        </>
    );
}