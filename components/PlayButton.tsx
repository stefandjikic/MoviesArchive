import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
const playIcon = require('../assets/icons/play-button.png');

interface IProps {
  setModalVisible: (value: boolean) => void;
}

const PlayButton = ({setModalVisible}: IProps) => {
  return (
    <Pressable onPress={() => setModalVisible(true)}>
      <Image style={styles.playButton} source={playIcon} />
    </Pressable>
  );
};

export default PlayButton;

const styles = StyleSheet.create({
  playButton: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 50,
  },
});
