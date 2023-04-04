export interface IMovie {
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  release_date: string;
  popularity: number;
  poster_path: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
}
