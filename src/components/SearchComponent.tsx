import { MovieData } from '@/constants/interfaces';
import useIsLoading from '@/hooks/useIsLoading';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import MovieCard from './MovieCard';
import MovieDetailComponent from './MovieDetailComponent';



interface SearchResult {
  Search: MovieData[];
  totalResults: string;
  Response: string;
}


const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<MovieData[]>([]);
  const [currentActiveMovie, setCurrentActiveMovie] = useState<MovieData | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(2)

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchTerm) return; // Skip empty searches

    useIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<SearchResult>(
        `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDbAPIKey}&s=${searchTerm}`
      );

      if (response.data.Response === "True") {
        setSearchResults(response.data.Search);
      } else {
        setError('Movie not found');
      }
    } catch (err) {
      setError('Error fetching data');
      console.error(err);
    } finally {
      useIsLoading(false);
    }
  };
  const fetchMore = async () => {
    setPage(page => page + 1)
    setIsLoading(true);
    try {
      const response = await axios.get<SearchResult>(
        `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDbAPIKey}&s=${searchTerm}&page=${page}`
      );

      if (response.data.Response === "True") {
        const newResults = [...searchResults, ...response.data.Search]
        setSearchResults(newResults);
      }
    } catch (err) {
      setError('Error fetching data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;

    if (container) {
      const shouldFetch =
        container.scrollHeight - container.scrollTop <= container.clientHeight;

      if (shouldFetch && !isLoading) {
        fetchMore();
      }
    }
  };
  useEffect(() => { }, [currentActiveMovie])
  return (
    <div className="flex flex-row max-h-screen" >
      <div className='pr-3'>
        <form onSubmit={handleSubmit} name='search' >
          <div className='flex flex-row justify-center p-3 border'>
            <input className='border border-white border-r-transparent rounded-none pl-2' type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Enter a movie title" />
            <button className='border border-white rounded-none' onClick={() => handleSubmit}>Search</button>
          </div>
        </form>
        {error && <p> {error}</p>}
        <div className='flex h-5/6 overflow-y-auto ml-4 no-scrollbar scroll-smooth focus:scroll-auto' ref={containerRef} onScroll={handleScroll}>
          {/* Check if run out of results (If there is a search of which results in less than 10, disable the load more button*/}
          {/* May be autocomplete? */}
          {searchResults.length > 0 && (
            <>
              <ul>
                {searchResults.map((movie, i) => {
                  return (
                    <li key={i}>
                      <MovieCard movie={movie} setActive={setCurrentActiveMovie} />
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
      {/*Details*/}
      {currentActiveMovie && <MovieDetailComponent movie={currentActiveMovie} setActive={setCurrentActiveMovie} />}
    </div>
  )
}

export default SearchComponent