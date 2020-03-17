import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import { createStackNavigator } from 'react-navigation-stack';
import ProfileScreen from '../screens/ProfileScreen'
import TakenSurveyScreen from '../screens/TakenSurveyScreen';
import ConfigScreen from '../screens/ConfigScreen';
import InfoScreen from '../screens/InfoScreen';
import HelpScreen from '../screens/HelpScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import RelevantSurveyScreen from '../screens/RelevantSurveysScreen';
import MapScreen from '../screens/MapScreen';
import SurveyScreen from '../screens/SurveyScreen';
import ViewSurveyScreen from '../screens/ViewSurveyScreen';
import PendingSurveyScreen from '../screens/PendingSurveyScreen';

export default createAppContainer(
  createSwitchNavigator({
    // Add more routes here for different pages (the ordering affects which page is loaded first (first one is main, etc..))

    //Main tab contains the bottonNavigatorTab
    Login: LoginScreen,
    Main: MainTabNavigator,
    Profile: ProfileScreen,
    Maps: MapScreen,
    RelevantSurveys: RelevantSurveyScreen,
    TakenSurveys: TakenSurveyScreen,
    PendingSurveys: PendingSurveyScreen,
    GeneralSurvey: SurveyScreen,
    Config: ConfigScreen,
    Info: InfoScreen,
    Help: HelpScreen,
    Signup: SignupScreen,
    ViewSurvey: ViewSurveyScreen,
  },
  {
    initialRouteName: 'Login'
  }
  )
);
