import axios from "axios"
import {useQuery} from "react-query" 
export const UseUser = async(query:any) => {
    const {encodedNameQuery} = query
    const response = await axios.get(`/api/user?username=${encodedNameQuery}`)
    return response.data
   /*  const {data, error, isLoading, refetch} = useQuery("User", () => axios.get(`/api/user?username=${encodedNameQuery}`))
    console.log(data) */
    /* return {
        data,
        error,
        isLoading,
        refetch
    } */
}