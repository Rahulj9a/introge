
import axios from "axios"
import {useQuery} from "react-query" 
export const UseUser = (query:any) => {
    const {encodedSearchNameQuery} = query
    const {data, error, isLoading, refetch} = useQuery("User", () => axios.get(`/api/user?username=${encodedSearchNameQuery}`))

    return {
        data,
        error,
        isLoading,
        refetch
    }
}