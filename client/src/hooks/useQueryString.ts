import {useLocation} from "react-router-dom";

export const useQueryString = () => {
    const location = useLocation()
    const query = new URLSearchParams(location.search)


    return { location, query }
}