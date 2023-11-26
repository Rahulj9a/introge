
import axios from "axios"
import {useQuery} from "react-query"

export const UseUser = ()=>{
    const {data, error, isLoading, refetch} = useQuery("User", ()=>axios.get("/api/user"))

    return {
        data,
        error,
        isLoading,
        refetch
    }
}