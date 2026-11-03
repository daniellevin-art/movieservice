export default function MovieCard({ movie }) {
  return (
    <div
      className="flex flex-col items-center w-full 
        gap-4 h-full"
    >
      <h2>{movie.Title}</h2>
      <p>{movie.Year}</p>
      <img src={movie.Poster} alt={movie.Title} />
    </div>
  );
}
