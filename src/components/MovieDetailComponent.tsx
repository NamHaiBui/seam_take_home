import { MovieData } from '@/constants/interfaces'
import { FC, useEffect, useState } from 'react'
import axios from 'axios';


const MovieDetailComponent: FC<{ movie: MovieData, setActive: React.Dispatch<React.SetStateAction<MovieData | null>> }> = ({ movie, setActive }) => {
  // const fullMovieDetail =
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("");
  const [fullMovieDetail, setFullMovieDetail] = useState<MovieData | null>()


  const fetchDetail = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDbAPIKey}&i=${movie.imdbID}&plot=full`
      );

      if (response.status === 200) {
        // console.log(response.data)
        setFullMovieDetail(response.data);
      }
    } catch (err) {
      setError('Error fetching data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => { fetchDetail() }, [movie])
  return (

    < div className="flex h-screen overflow-y-auto ml-4 pt-4 no-scrollbar scroll-smooth focus:scroll-auto'" >
      {isLoading ? <span>Loading</span> :
        <div className="movie-info">
          <div>
            <button onClick={() => { setActive(null) }}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18">
              </path>
            </svg>
            </button>
            <div className='flex flex-row'>
              <div>
                <div className="detail-item">
                  <p className="font-bold">Title:</p> <span>{fullMovieDetail?.Title}</span>
                </div>
                <div className="detail-item">
                  <p className="font-bold">Year:</p>  <span>{fullMovieDetail?.Year}</span>
                </div>
                <div className="detail-item">
                  <p className="font-bold">Genre:</p>  <span>{fullMovieDetail?.Genre}</span>
                </div>
                <div className="detail-item">
                  <p className="font-bold">Runtime:</p> <span>{fullMovieDetail?.Runtime}</span>
                </div>
                <div className="detail-item">
                  <p className="font-bold">Rated:</p> <span>{fullMovieDetail?.Rated}</span>
                </div>
              </div>
              <div className='flex flex-auto justify-end items-end pr-24'>
                <img className='max-h-60 max-w-60' src={`${fullMovieDetail?.Poster}`} alt=''></img>
              </div>
            </div>
            <div className="detail-item">
              <p className="font-bold">Released:</p>  <span>{fullMovieDetail?.Released}</span>
            </div>

            {/* Ratings */}
            <div className="detail-item ratings">
              <p className="font-bold">Ratings:</p>
              <div className="ratings">
                {fullMovieDetail?.Ratings?.map((rating, i) => (
                  <p key={rating.Source} className="pl-4">
                    {i}. {rating.Source}: {rating.Value}
                  </p>
                ))}
              </div>
            </div>

            {/* Production */}
            <div className="detail-item">
              <p className="font-bold">Director:</p>  <span>{fullMovieDetail?.Director}</span>
            </div>
            <div className="detail-item">
              <p className="font-bold">Writer:</p>  <span>{fullMovieDetail?.Writer}</span>
            </div>
            <div className="detail-item">
              <p className="font-bold">Actors:</p>  <span>{fullMovieDetail?.Actors}</span>
            </div>
            <div className="detail-item">
              <p className="font-bold">Language:</p> <span>{fullMovieDetail?.Language}</span>
            </div>
            <div className="detail-item">
              <p className="font-bold">Country:</p> <span>{fullMovieDetail?.Country}</span>
            </div>
            <div className="detail-item">
              <p className="font-bold">Awards:</p> <span>{fullMovieDetail?.Awards}</span>
            </div>
            {/* Plot (Special Handling) */}
            <div className="detail-item plot" >
              <p className="font-bold">Plot:</p> <span>{fullMovieDetail?.Plot}</span>
            </div>
            {/* Add more detail items as needed */}
          </div>
        </div>}
    </div >
  );
}

export default MovieDetailComponent