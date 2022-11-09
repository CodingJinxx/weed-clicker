import { MouseEventHandler } from "react";

export default function Cookie(props : { size: number, cookieClicked : Function}) {

    return (
        <>
            <div className="flex w-100 h-100">
                <img src="./cookie.png" width={props.size} height="100%" className="m-auto" onClick={() => {
                    props.cookieClicked();
                }}>
                </img>
            </div>
        </>
    );
}
