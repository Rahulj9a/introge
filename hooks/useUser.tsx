
import axios from "axios"
import {useQuery} from "react-query" 
export const UseUser = (query:string="") => {
    
    const {data, error, isLoading, refetch} = useQuery("User", ()=>axios.get(`/api/user?q=${query}`))

    return {
        data,
        error,
        isLoading,
        refetch
    }
}