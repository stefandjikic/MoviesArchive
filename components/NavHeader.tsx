import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface IProps {
  navigation: NavigationProp<any, any>;
}

const NavHeader = ({navigation}: IProps) => {
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'👈'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavHeader;

export const styles = StyleSheet.create({
  backButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
});
