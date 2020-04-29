import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';

export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tempPassword: "",
            confirmPassword: "",
            changed: false,
        }
    }

    updateTempPassword = (password) => {
        this.setState({
            tempPassword: password
        })
    }

    updateConfirmPassword = (password) => {
        this.setState({
            confirmPassword: password
        })
    }

    onPressLogin = async() => {
        if(this.state.tempPassword === this.state.confirmPassword) {
            console.log("Hello")
            var user = firebase.auth().currentUser;
            user.updatePassword(this.state.tempPassword).then(() => {
                this.setState({
                    changed: true
                })
            }).catch(() => {
                console.log("Bad format")
            })
        } else {
            //DISPLAY MESSAGE SAYING THEY ARE NOT EQUAL
        }
    }

    render() {
        return(
            <View style={styles.container}>

                <View
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>
                    <View style={styles.welcomeContainer}>
                        <AreYouSure /> 
                    </View>
                    <View style={styles.getStartedContainer}>
                        <LabelForInput customLabel="New Password"/>

                        {/* Email */}
                        <Input 
                            placeholder='New Password'
                            defaultValue=""
                            editable={true}
                            onChangeText={e => this.updateTempPassword(e)}
                            autoCompleteType='password'
                            textContentType='password'
                            returnKeyType='next'
                        />
                    </View>
                    <View style={styles.getStartedContainer}>
                        <LabelForInput customLabel="Confirm new Email"/>

                        {/* Email */}
                        <Input 
                            placeholder='Confirm New Password'
                            defaultValue=""
                            editable={true}
                            onChangeText={e => this.updateConfirmPassword(e)}
                            autoCompleteType='password'
                            textContentType='password'
                            returnKeyType='done'
                        />
                    </View>

                    <View style={styles.loginButton}>
                        <Button title='Submit' style={styles.loginButton} onPress={() => {
                            this.onPressLogin().then(() => {
                                if(this.state.changed) {
                                    console.log("Success")
                                    // SHOW THAT CHANGE WAS SUCCESSFUL
                                    var currEmail = firebase.auth().currentUser.email;
                                    this.setState({
                                        email: currEmail,
                                        changed: false
                                    })
                                } else {
                                    console.log("Failed to login");
                                    // SHOW ERROR MESSAGE SAYING LOGIN FAILED
                                }
                            })
                        }}/>
                    </View>
                </View>
            </View>
        )
    }
}

function LabelForInput({customLabel}){
    return (
      <Text style={styles.optionSmallHeadingText}>
        {customLabel}
      </Text>
    )
}

function AreYouSure() {
    return (
      <Text style={styles.welcomeTxt}>
        Change your password?
      </Text>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 20
    },
    loginButton: {
      marginHorizontal: '25%',
      width: '50%',
      paddingTop: 20
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
  