import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { 
  CheckBox, 
  Input,
  Button,
  ThemeProvider
} from 'react-native-elements';
import { MonoText } from '../components/StyledText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={require('../assets/images/home_screen_logo.png')}
            style={styles.welcomeImage}
          />
        </View>

        {/* View for the form inputs */}
        <View style={styles.getStartedContainer}>
          <WelcomeText />

          {/* Email */}
          <Input 
            placeholder=' Email' 
              leftIcon={
                <Icon 
                  name='email'
                  size={20}
                  color='black'
                />
              }
              autoCompleteType='email'
              textContentType='emailAddress'
              returnKeyType='next'
          />

          {/* Password */}
          <Input 
            placeholder=' Password'
            secureTextEntry={true} 
            leftIcon={
              <Icon 
                name='lock'
                size={20}
                color='black'
              />
            }
            autoCompleteType='password'
            textContentType='password'
            returnKeyType='done'
          />

          {/* Remember */}
          <CheckBox title='Remember me?'/>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            
              <Text h4>New user? Sign Up here!</Text>
          
          </View>

          {/* Login button */}
          <Button title='Login'/>
        </View>
      </ScrollView>

    </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

function WelcomeText() {
  return (
    <Text style={styles.welcomeTxt}>
      Welcome to the Environmental Health Science App!
    </Text>
  );
}

//TODO: implement sign up screen
function handleSignUpPress() {
  //Link to sign up page here
  console.log('Sign up pressed');
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

_handlePressDocs = () => {
  WebBrowser.openBrowserAsync('http://docs.expo.io');
};

_handlePressForums = () => {
  WebBrowser.openBrowserAsync('http://forums.expo.io');
};
      


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeTxt: {
    marginBottom: 20,
    color: 'rgba(0,50,0,0.8)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 150,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  signUpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  signUpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
