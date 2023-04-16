import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {IMovie} from '../types/interfaces';
import {getMovieDetails, imagePath} from '../services/api';

const placeHolderImage = require('../assets/images/movie_poster.png');
const height = Dimensions.get('window').height;

interface IProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const Details = ({route, navigation}: IProps) => {
  console.log(route, 'route from details');
  console.log(navigation, 'navigation from details');
  const {movieID} = route.params as {movieID: number};
  const [details, setDetails] = useState<IMovie>({} as IMovie);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getMovieDetails(movieID)
      .then(res => {
        if (res) {
          setDetails(res);
        }
      })
      .catch(err => {
        console.log(err, 'error from details');
      });
    setIsLoaded(true);
  }, [movieID]);

  return (
    <>
      {isLoaded && (
        <ScrollView>
          <Image
            source={
              details.poster_path
                ? {
                    uri: `${imagePath}${details.poster_path}`,
                  }
                : placeHolderImage
            }
            resizeMode="cover"
            style={styles.image}
          />
          {!details.poster_path && (
            <Text style={styles.movieTitle}>{details.title}</Text>
          )}
        </ScrollView>
      )}
      {!isLoaded && <ActivityIndicator size="large" />}
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  image: {
    height: height / 2,
    width: '100%',
  },
  movieTitle: {
    position: 'absolute',
    width: 80,
    textAlign: 'center',
  },
});
