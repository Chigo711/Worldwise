import { useSearchParams } from "react-router-dom";

export function UseUrlPosition(){
    const [searchParams] = useSearchParams();//WE ARE CREATING A CUSTOM HOOK ON TOP A CUSTOM HOOK, BECAUSE useSearchParams IS A CUSTOM FROM REACT.
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return [lat, lng]
}