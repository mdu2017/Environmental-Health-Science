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
          <Input placeholder=' Email' 
              leftIcon={<Icon 
                  name='email'
                  size={20}
                  color='black'
                  />} />

          {/* Password */}
          <Input placeholder=' Password' secureTextEntry={true} 
              leftIcon={<Icon 
                  name='lock'
                  size={20}
                  color='black'
                  />} />

          {/* Remember */}
          <CheckBox title='Remember me?'/>

          {/* Login button */}
          
            <Button title='Login'/>
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Button title='Help' onPress={handleHelpPress}/>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>
          This is a tab bar. You can edit it in:
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <MonoText style={styles.codeHighlightText}>
            navigation/MainTabNavigator.js
          </MonoText>
        </View>
      </View>
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

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
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
    marginTop: 3,
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
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
