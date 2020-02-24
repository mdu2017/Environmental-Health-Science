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

export default class LoginScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberChecked: false
    }

    this.checkRemember = this.checkRemember.bind(this);
  }

  //Update email input box when typing
  updateEmail = (e) => {
    this.setState({
      email: e
    })
  }

  //Update password when typing
  updatePassword = (pass) => {
    this.setState({
      password: pass
    })
  }

  //Navigates to signup page when link pressed
  goToSignupPage = () => {
    this.props.navigation.navigate('Signup');
  }

  //Toggles the remember me button
  checkRemember = () => {
    this.setState({
      rememberChecked: !this.state.rememberChecked
    })
  }

  render(){
    return (
      <View style={styles.container}>

      <View
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
        <WelcomeText /> 
          <Image
            source={require('../assets/images/home_screen_logo.png')}
            style={styles.welcomeImage}
          />
        </View>
      

        {/* View for the form inputs */}
        <View style={styles.getStartedContainer}>

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
              onChangeText={e => this.updateEmail(e)}
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
            onChangeText={pass => this.updatePassword(pass)}
            autoCompleteType='password'
            textContentType='password'
            returnKeyType='done'
          />

          {/* Remember */}
          <CheckBox
            title='Remember me?'
            onPress={() => this.checkRemember()}
            checked={this.state.rememberChecked}
          />

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <TouchableOpacity onPress={() => this.goToSignupPage()}>
              <Text style={styles.signUpLink}>New User? Sign Up Here!</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* Login button (TODO: AUTHENTICATION NEEDS TO BE IMPLEMENTED)*/}
        <View style={styles.loginButton}>
          <Button title='Login' style={styles.loginButton} onPress={() => this.props.navigation.navigate('Home')}/>
        </View>
      </View>
    </View>
    );
  }
}

LoginScreen.navigationOptions = {
  header: null,
};

//Displays welcome text
function WelcomeText() {
  return (
    <Text style={styles.welcomeTxt}>
      Welcome to Environmental Heath Science!
    </Text>
  );
}

// CSS Styling for login screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20
  },
  loginButton: {
    marginHorizontal: '25%',
    width: '50%',
  },
  welcomeTxt: {
    marginTop: 50,
    color: 'rgba(0,50,0,0.8)',
    fontSize: 22,
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
    marginTop: 75,
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
    marginBottom: 20,
    alignItems: 'center',
  },
  signUpLink: {
    color: 'rgba(10,0,200,0.7)',
    fontSize: 18,
    lineHeight: 20,
    textAlign: 'center',
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
