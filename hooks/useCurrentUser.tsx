 
import { useQuery } from "react-query";

import axios from "axios";
// Replace with the correct path to your reactQueryClient.js file

const usecurrentUser = () => {
  const { data, error, isError, isLoading,refetch } = useQuery(
    "currentUser", () =>  axios.get("/api/current") 
  );

  return {
    data,
    error,
    isLoading,
    refetch,
    isError,
  };
};

export default usecurrentUser;