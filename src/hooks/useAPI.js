import { useState } from 'react';
import axios from 'axios';

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearHistory = async()=>{
    setIsLoading(true);
    setError(null);
   try {
    const response = await axios.post(`https://tic-tac-toe-api-0a09.onrender.com/api/clear`)
    setIsLoading(false);
    return response.data;  
} catch (error) {
    setIsLoading(false);
    setError(error.message);
   }
  }

  const addToHistory = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`https://tic-tac-toe-api-0a09.onrender.com/api/save`, data);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getHistory = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://tic-tac-toe-api-0a09.onrender.com/api/get`);
      setIsLoading(false);
      return response.data;
    } catch (error) {
        console.log(error.message)
      setIsLoading(false);
      setError(error.message);
    }
  };

  return { isLoading, error, addToHistory, clearHistory, getHistory };
};

export default useApi;
