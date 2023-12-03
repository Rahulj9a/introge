
import axios from "axios"
import {useQuery} from "react-query" 
export const UseUser = (query:any) => {
    const {encodedNameQuery} = query
    const {data, error, isLoading, refetch} = useQuery("User", ()=>axios.get(`/api/user?username=${encodedNameQuery}`))

    return {
        data,
        error,
        isLoading,
        refetch
    }
}