import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator,
  View,
  Modal,
  Pressable,
} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {IMovieDetails} from '../types/interfaces';
import {getMovieDetails, imagePath} from '../services/api';
import PlayButton from '../components/PlayButton';

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
  const [details, setDetails] = useState<IMovieDetails>({} as IMovieDetails);
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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

  console.log(details, '===> DETAILS');
  return (
    <>
      {isLoaded && (
        <View>
          <ScrollView>
            <View style={styles.imageContainer}>
              <Image
                source={
                  details?.poster_path
                    ? {
                        uri: `${imagePath}${details.poster_path}`,
                      }
                    : placeHolderImage
                }
                resizeMode="cover"
                style={styles.image}
              />
              {!details?.poster_path && (
                <Text style={styles.movieTitleAbsolute}>
                  {details.title || 'No data'}
                </Text>
              )}
            </View>
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton setModalVisible={setModalVisible} />
              </View>
              <Text style={styles.movieTitle}>
                {details.title || 'No data'}
              </Text>
              {details?.genres && (
                <View style={styles.genresContainer}>
                  {details?.genres?.map(genre => (
                    <Text style={styles.genre} key={genre.id}>
                      {genre.name}
                    </Text>
                  ))}
                </View>
              )}
              <Text style={styles.rating}>
                {details?.vote_average?.toFixed()}/10
              </Text>
              <Text style={styles.overview}>
                {details?.overview || 'No data'}
              </Text>
              <Text style={styles.releseDate}>
                {'Relese date: ' +
                  new Date(details?.release_date).toDateString()}
              </Text>
            </View>
          </ScrollView>
          <Modal
            animationType="slide"
            // transparent={true}
            visible={modalVisible}>
            <View style={styles.videoModal}>
              <Pressable onPress={() => setModalVisible(false)}>
                <Text>Close</Text>
              </Pressable>
            </View>
          </Modal>
        </View>
      )}
      {!isLoaded && <ActivityIndicator size="large" />}
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: height / 2,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: height / 2,
    width: '100%',
  },
  movieTitleAbsolute: {
    position: 'absolute',
    width: 80,
    textAlign: 'center',
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
  },
  genre: {
    backgroundColor: '#e6e6e6',
    padding: 5,
    marginRight: 5,
  },
  rating: {
    fontWeight: 'bold',
    // marginBottom: 8,
    marginTop: 10,
    color: '#ff8c00',
  },
  overview: {
    padding: 8,
  },
  releseDate: {
    fontWeight: 'bold',
  },
  playButton: {
    position: 'absolute',
    top: -20,
    right: 6,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
