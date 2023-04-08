import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  getDocumentaries,
  getFantasyMovies,
  getPopularMovies,
  getPopularTvShows,
  getUpcomingMovies,
  imagePath,
} from '../services/api';
import {IMovie} from '../types/interfaces';
import Slider from '../components/Slider';
import MoviesList from '../components/MoviesList';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState<IMovie[]>([]);
  const [fantasyMovies, setFantasyMovies] = useState<IMovie[]>([]);
  const [documentaries, setDocumentaries] = useState<IMovie[]>([]);
  const [popularTvShows, setPopularTvShows] = useState<IMovie[]>([]);
  const [moviesImages, setMoviesImages] = useState<Array<string>>([]);
  const [error, setError] = useState(false);
  console.log(error, 'error from home');

  const getMovieData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTvShows(),
      getFantasyMovies(),
      getDocumentaries(),
    ]);
  };

  useEffect(() => {
    getMovieData()
      .then(([upcoming, popular, tv, fantasy, document]) => {
        const images = upcoming.map(
          (m: IMovie) => `${imagePath}${m.poster_path}`,
        );
        setMoviesImages(images);
        setPopularMovies(popular);
        setPopularTvShows(tv);
        setFantasyMovies(fantasy);
        setDocumentaries(document);
      })
      .catch(err => {
        setError(err);
      });
  }, []);

  return (
    <>
      <ScrollView>
        {moviesImages && (
          <View style={styles.slider}>
            <Slider images={moviesImages} />
          </View>
        )}
        {popularMovies && (
          <View style={styles.carousel}>
            <MoviesList movies={popularMovies} title="Popular Movies" />
          </View>
        )}
        {popularTvShows && (
          <View style={styles.carousel}>
            <MoviesList movies={popularTvShows} title="Popular Tv Shows" />
          </View>
        )}
        {fantasyMovies && (
          <View style={styles.carousel}>
            <MoviesList movies={fantasyMovies} title="Fantasy Movies" />
          </View>
        )}
        {documentaries && (
          <View style={styles.carousel}>
            <MoviesList movies={documentaries} title="Documentaries" />
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  slider: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    flex: 1,
  },
});

export default Home;
