/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View} from 'react-native';
import ItemsList from './src/screens/ItemsList';

function App(): JSX.Element {
  return (
    <View style={{backgroundColor: 'white'}}>
      <ItemsList />
    </View>
  );
}

export default App;
