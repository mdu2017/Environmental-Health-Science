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
      password: ''
    }
  }

  //Update email input box when typing
  updateEmail = (e) => {
    this.setState({
      email: e
    })
    console.log("Email: " + e);
  }

  updatePassword = (pass) => {
    this.setState({
      password: pass
    })
    console.log('Password: ' + pass);
  }

  render(){
    return (
      <View style={styles.container}>

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
          <CheckBox title='Remember me?'/>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            
              <Text h4>New user? Sign Up here!</Text>
          
          </View>

          {/* Login button (TODO: AUTHENTICATION NEEDS TO BE IMPLEMENTED)*/}
          <Button title='Login'
            onPress={() => this.props.navigation.navigate('Home')}/>

        </View>
      </ScrollView>

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
      Welcome! Please login!
    </Text>
  );
}

// CSS Styling for login screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
