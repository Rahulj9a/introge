
import axios from "axios"
import {useQuery} from "react-query" 
export const UseUser = (query:any) => {
    const {encodedNameQuery, encodedLabelQuery} = query
    const {data, error, isLoading, refetch} = useQuery("User", ()=>axios.get(`/api/user?username=${encodedNameQuery}&labels=${encodedLabelQuery}`))

    return {
        data,
        error,
        isLoading,
        refetch
    }
}