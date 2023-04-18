import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ScreensComponent from './components/ScreensComponent';

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <ScreensComponent />
    </NavigationContainer>
  );
};

export default App;
