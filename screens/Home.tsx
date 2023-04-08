import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {getPopularMovies, getUpcomingMovies, imagePath} from '../services/api';
import {IMovie} from '../types/interfaces';
import Slider from '../components/Slider';
import MoviesList from '../components/MoviesList';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState<IMovie[]>([]);
  const [moviesImages, setMoviesImages] = useState<Array<string>>([]);
  const [error, setError] = useState(false);
  console.log(error, 'error from home');

  useEffect(() => {
    getUpcomingMovies()
      .then((mov: IMovie[]) => {
        const images = mov.map(m => `${imagePath}${m.poster_path}`);
        console.log(images, 'images');
        setMoviesImages(images);
      })
      .catch(err => {
        setError(err);
      });

    getPopularMovies()
      .then(mov => {
        setPopularMovies(mov);
      })
      .catch(err => {
        setError(err);
      });
  }, []);

  return (
    <>
      <View style={styles.slider}>
        <Slider images={moviesImages} />
      </View>
      <View style={styles.carousel}>
        <MoviesList movies={popularMovies} title="Popular Movies" />
      </View>
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
