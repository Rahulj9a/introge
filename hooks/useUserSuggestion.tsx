import axios from "axios"
import {useQuery} from "react-query" 
export const UseUserSuggestion = (query:string="") => {
    
    const {data, error, isLoading, refetch} = useQuery("UserSuggestion", ()=>axios.get(`/api/user?username=${query}`))

    return {
        data,
        error,
        isLoading,
        refetch
    }
}