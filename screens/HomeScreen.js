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

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  render(){
    return (
      <View style={styles.container}>

        {/* Login button on the homepage */}
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.homeLogin}>Login</Text>
        </TouchableOpacity>

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
          <WelcomeText />
            <Image
              source={require('../assets/images/home_screen_logo.png')}
              style={styles.welcomeImage}
            />
          </View>
        
          <InstructionsText/>
          </ScrollView>
          <View style={styles.tabBarInfoContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('RelevantSurveys')} style={styles.helpLink}>
              <Text style={styles.tabBarInfoText}>Nearby Surveys</Text>
            </TouchableOpacity>
          </View>
    </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

//Welcome text above image icon
function WelcomeText() {
  return (
    <Text style={styles.welcomeTxt}>
      Welcome to the Environmental Health Science App Homepage!
    </Text>
  );
}

//Instruction text for homepage
function InstructionsText(){
  return (
    <Text style={styles.InstructionsText}>
      {/* Click on the 'Survey' tab below to fill out an Environmental Assessment Form. {"\n\n"}
      <Text style={styles.orText}>OR</Text> {"\n\n"} */}
      Click on the 'Map' tab to find a relevant survey for your location.
    </Text>
  )
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
  homeLogin: {
    fontSize: 25,
    textAlign: 'right',
    color: 'rgba(0,120,120,0.8)',
    marginTop: '15%',
    paddingRight: '5%',
    width: '99%',
  },
  welcomeTxt: {
    marginTop: 10,
    marginBottom: 25,
    marginHorizontal: 25,
    color: 'rgba(0,50,0,0.8)',
    fontSize: 20,
    lineHeight: 22,
    textAlign: 'center',
  },
  InstructionsText: {
    margin: 40,
    color: 'rgba(0,50,0,0.8)',
    fontSize: 20,
    lineHeight: 22,
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
    marginTop: 50,
    marginLeft: -10,
  },
  orText: {
    margin: 40,
    color: 'rgba(0,50,0,0.8)',
    fontSize: 20,
    lineHeight: 22,
    textAlign: 'center',
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
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold'
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