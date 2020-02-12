import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';

import AppNavigator from './navigation/AppNavigator';

var firebaseConfig = {
  apiKey: "AIzaSyBl3BShVOe_77qAe_Qoz-7BJ2mC7jwELzw",
  authDomain: "environmental-health-science.firebaseapp.com",
  databaseURL: "https://environmental-health-science.firebaseio.com",
  projectId: "environmental-health-science",
  storageBucket: "environmental-health-science.appspot.com",
  messagingSenderId: "775764495366",
  appId: "1:775764495366:web:07da7d351375d7a166c787",
  measurementId: "G-33D7X173GW"
}

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <View style={styles.container}>
        <AppNavigator/>
      </View>
    );
  }
}

//TODO: Need to get this integrated with the function
// function CheckLoading(){
//   const [isLoadingComplete, setLoadingComplete] = useState(false);

//   if (!isLoadingComplete && !this.props.skipLoadingScreen) {
//     return (
//       <AppLoading
//         startAsync={loadResourcesAsync}
//         onError={handleLoadingError}
//         onFinish={() => handleFinishLoading(setLoadingComplete)}
//       />
//     );
//   } else {
//     return (
//       <View style={styles.container}>
//         {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
//         <AppNavigator />
//       </View>
//     );
//   }
// }

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
