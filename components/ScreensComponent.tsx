import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home';
import HomeNav from './HomeNav';
import Details from '../screens/Details';
import NavHeader from './NavHeader';

const ScreensComponent = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          // headerShown: false,
          headerTransparent: true,
          header: HomeNav,
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerTransparent: true,
          header: NavHeader,
        }}
      />
    </Stack.Navigator>
  );
};

export default ScreensComponent;
