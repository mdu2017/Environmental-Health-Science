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
import { AsyncStorage } from 'react-native';

import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {

  constructor(props){
    super(props);
    this.unsubscriber = null;
    this.state = {
      email: '',
      password: '',
      rememberChecked: false,
      user: null
    }

    this.checkRemember = this.checkRemember.bind(this);
  }

  //Async save (saves the JSON of the state)
  saveUserLogin = async (userName, pass) => {
    try {
      //Saves the item as a (key, JSON string)
      await AsyncStorage.setItem('userName', userName);
      await AsyncStorage.setItem('pass', pass);

    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  //Get saved data
  getUserLogin = async () => {
    let userName = '';
    let pass = '';
    try {
      userName = await AsyncStorage.getItem('userName') || '';
      pass = await AsyncStorage.getItem('pass') || '';

      //Update user/pass info
      this.setState({
        email: userName,
        password: pass
      });
    
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }

  //On load (save login info if remember me is checked)
  componentDidMount = () => {
    this.getUserLogin();
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
  checkRemember = async () => {
    await this.setState({
      rememberChecked: !this.state.rememberChecked
    })
  }

  onPressLogin = () => {
    console.log(this.state.email);
    firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    })
    Object.assign(this.state, { isAuthenticated: true })
    console.log(this.state.isAuthenticated)

    //If remember me is checked, save login info
    if(this.state.rememberChecked){
      let e = this.state.email;
      let p = this.state.password;
      this.saveUserLogin(e, p);
    }
    else if(!this.state.rememberChecked){
      this.saveUserLogin('','');
    }
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
              defaultValue={this.state.email}
              editable={true}
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
            defaultValue={this.state.password}
            editable={true}
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

        {/* Login button*/}
        <View style={styles.loginButton}>
          <Button title='Login' style={styles.loginButton} onPress={() => {
            this.onPressLogin();
            if(this.state.isAuthenticated) {
              this.props.navigation.navigate('Home');
            } else {
              console.log("Failed to login");
              // SHOW ERROR MESSAGE SAYING LOGIN FAILED
            }
          }}/>
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
