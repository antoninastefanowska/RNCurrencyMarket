import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ExchangeRates from './views/ExchangeRates';
import Converter from './views/Converter';
import History from './views/History';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Exchange Rates" component={ExchangeRates} />
        <Tab.Screen name="Converter" component={Converter} />
        <Tab.Screen name="History" component={History} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}