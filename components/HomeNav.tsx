import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';

const searchIcon = require('../assets/icons/search.png');

const HomeNav = () => {
  return (
    <SafeAreaView>
      <View style={styles.navContainer}>
        <View>
          <Text style={styles.logo}>MA</Text>
          <Text style={styles.logoSM}>rchive</Text>
        </View>
        <Image source={searchIcon} style={styles.search} />
      </View>
    </SafeAreaView>
  );
};

export default HomeNav;

export const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    // color: '#ff8c00',
    color: '#78B3F0',
  },
  logoSM: {
    marginTop: -10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff8c00',
    // color: '#78B3F0',
  },
  search: {
    width: 30,
    height: 30,
  },
});
