import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import { createStackNavigator } from 'react-navigation-stack';
import ProfileScreen from '../screens/ProfileScreen'
import TakenSurveyScreen from '../screens/TakenSurveyScreen';
import ConfigScreen from '../screens/ConfigScreen';
import InfoScreen from '../screens/InfoScreen';
import HelpScreen from '../screens/HelpScreen';

export default createAppContainer(
  createSwitchNavigator({
    // Add more routes here for different pages (the ordering affects which page is loaded first (first one is main, etc..))

    //Main tab contains the bottonNavigatorTab
    Main: MainTabNavigator,
    Profile: ProfileScreen,
    TakenSurveys: TakenSurveyScreen,
    Config: ConfigScreen,
    Info: InfoScreen,
    Help: HelpScreen,
  })
);