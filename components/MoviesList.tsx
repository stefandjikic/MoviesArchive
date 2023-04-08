import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {IMovie} from '../types/interfaces';
import MovieCard from './MovieCard';

interface IProps {
  movies: IMovie[];
  title: string;
}

const List = ({movies, title}: IProps) => {
  return (
    <View style={styles.listContainer}>
      <Text style={styles.listHeading}>{title}</Text>
      <FlatList
        horizontal
        data={movies}
        renderItem={({item}) => <MovieCard movie={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 10,
  },
  listHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
});
