import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import History from ../../js/history.js
import Rate from ../../js/rate.js

export const Tabs = TabNavigator({
  History: {
    screen: HistoryScreen,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  Rate: {
    screen: RateScreen,
    navigationOptions: {
      tabBarLabel: 'Rating',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
});
