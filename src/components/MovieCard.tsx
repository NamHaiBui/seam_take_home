import { MovieData } from "@/constants/interfaces";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FC } from "react";
// May be add highlight when hover and change color when clicked?
const MovieCard: FC<{ movie: MovieData, setActive: React.Dispatch<React.SetStateAction<MovieData | null>> }> = ({ movie, setActive }) => {
  return (
    <Card className="mt-6 w-80 border" color={"transparent"}>
      <CardBody>
        <Typography variant="h4" color={"white"} children={movie.Title} className="mb-2 overflow-x-auto overflow-y-auto" />
        <Typography variant="small" children={`(${movie.Year})`} color={"white"} />
      </CardBody>
      <CardFooter className="pt-0">
        <Button size="sm" variant="outlined" className="flex items-center gap-2 text-white" onClick={() => { setActive(movie) }}>
          Learn More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </Button>
      </CardFooter>
    </Card>
  );
}
export default MovieCard;