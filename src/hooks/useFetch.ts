import { useState, useEffect } from 'react';
import axios from 'axios';
import useIsLoading from './useIsLoading';

interface UseFetchOptions {
  url: string;
  initialData?: JSON | null; // Expecting JSON data
}

const useFetch = (options: UseFetchOptions): { data: JSON | null; error: string | null } => {

  const [data, setData] = useState<JSON | null>(options.initialData || null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      useIsLoading(true);
      try {
        const response = await axios.get(options.url);
        setData(response.data);
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      } finally {
        useIsLoading(false);
      }
    };

    fetchData();
  }, [options.url]); // Run effect when the URL changes

  return { data, error };
};

export default useFetch;
