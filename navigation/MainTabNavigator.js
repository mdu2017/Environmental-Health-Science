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
import ProfileScreen from '../screens/ProfileScreen';
import TakenSurveyScreen from '../screens/TakenSurveyScreen';
import { createSwitchNavigator, createKeyboardAwareNavigator, NavigationEvents } from 'react-navigation';
import RelevantSurveyScreen from '../screens/RelevantSurveysScreen';

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
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} />
  ),
};

HomeStack.path = '';

//Survey stack navigator (Survey is the name)
const SurveyStack = createStackNavigator(
  {
    Survey: SurveyScreen,
    Map: MapScreen,
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

//Map stack navigator (Map is the navigation page name)
const MapStack = createStackNavigator(
  {
    Map: MapScreen,
  },
  config
);

//Map stack navigation options
MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-globe' : 'md-globe'} />
  ),
};

MapStack.path = '';

//Link stack navigator (Links is the name)
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

//Profile stack navigator (Profile is the name)
const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config
);

//Link stack navigation options
ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

ProfileStack.path = '';

//Path to settings page (Settings is the name of the navigation page)
const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config,
);

//Setting stack nav options
SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-cog' : 'md-cog'} />
  ),
  // header: ({ goBack }) => ({
  //   left: ( <Icon name={'chevron-left'} onPress={ () => { goBack() } }  /> ),  
  // }),
};
SettingsStack.path = '';

//Relevant survey screens stack navigator (TESTING)
const RelevantSurveyStack = createStackNavigator(
  {
    RelevantSurvey: RelevantSurveyScreen,
  },
  config,
)
RelevantSurveyStack.navigationOptions = {
  tabBarLabel: 'RSS',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-cog' : 'md-cog'} />
  ),
};
RelevantSurveyStack.path = '';


//Navigation tabs on the bottom of the screen
const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ProfileStack,
  MapStack,
  // SurveyStack,
  // LinksStack,
  SettingsStack,
  // RelevantSurveyStack,
});

tabNavigator.path = '';

export default tabNavigator;