import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {getUpcomingMovies, imagePath} from '../services/api';
// import {SliderBox} from 'react-native-image-slider-box';
import {IMovie} from '../types/interfaces';
import Slider from '../components/Slider';

const Home = () => {
  // const [movies, setMovies] = useState<IMovie>({} as IMovie);
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

    // getPopularMovies()
    //   .then(mov => {
    //     setMovies(mov[0]);
    //   })
    //   .catch(err => {
    //     setError(err);
    //   });
  }, []);
  return (
    <View style={styles.slider}>
      <Slider images={moviesImages} />
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
