import {RingLoader} from "react-spinners";

export function LoadingButton() {
    return (
        <span>
            <RingLoader color="#f0564a" loading={true} size={30}/>
        </span>
    )
}