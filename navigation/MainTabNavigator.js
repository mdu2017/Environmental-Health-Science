import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SurveyScreen from '../screens/SurveyScreen';
import MapScreen from '../screens/MapScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

//Creates a home stack navigator
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

//Options for home nav button
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-information-circle${focused ? '' : '-outline'}` : 'md-information-circle'}
    />
  ),
};

HomeStack.path = '';

//Survey stack navigator
const SurveyStack = createStackNavigator(
  {
    Survey: SurveyScreen,
  },
  config
);

//Link stack navigation options
SurveyStack.navigationOptions = {
  tabBarLabel: 'Survey',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-clipboard' : 'md-clipboard'} />
  ),
};

SurveyStack.path = '';

//Map stack navigator
const MapStack = createStackNavigator(
  {
    Map: MapScreen,
  },
  config
);

//Link stack navigation options
MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-globe' : 'md-globe'} />
  ),
};

MapStack.path = '';

//Link stack navigator
const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

//Link stack navigation options
LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

//Path to settings page
const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

//Setting stack nav options
SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

//Navigation tabs on the bottom of the screen
const tabNavigator = createBottomTabNavigator({
  HomeStack,
  MapStack,
  SurveyStack,
  LinksStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
