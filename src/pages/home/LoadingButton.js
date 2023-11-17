import {RingLoader} from "react-spinners";

export function LoadingButton({loading}) {
    return (
            <RingLoader color="#f0564a" loading={loading} size={30}/>
    )
}