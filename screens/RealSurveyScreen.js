import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { CheckBox, Input, Button } from 'react-native-elements';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AsyncStorage } from 'react-native';
import Toast from 'react-native-root-toast';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class RealSurveyScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            title: '',
            submitted: false,
            completed: false,
        }

        this.savePressed = this.savePressed.bind(this);
    }

    //On load generate the fields and survey page
    componentDidMount = async() => {
        await this.readFromDB(this.state.title);
        return(
            <View>
                {this.state.list.map((elem,i) => (
                    <DisplayDatabaseStuff
                        key={i}
                        element={elem}
                    />
                ))}
            </View>
        )
    }

    //Update value of each field when it is changed (i is the index of the field, name is the new value)
    updateValue = (i,name) => {
        let tempList = this.state.list;
        tempList[i][1] = name;
        this.setState({
            list: tempList
        })
    }

    //Fill list with fields from survey
    readFromDB = async(temp) => {
        let db = firebase.firestore();
        var tempList = new Array();

        var getOptions = {
            source: 'server'
        }

        db.collection("surveys").doc(temp).get(getOptions).then((doc) => {
            var object = doc.data()

            //For each field in the survey -> add to the list
            Object.entries(object).forEach(temp => {
                tempList.push(temp)
                console.log('temp is: ' + temp);
            })

            this.setState({
                list: tempList
            })
        })
    }

    //Save to DB when save pressed
    // Value[0] is the field name
    // Value[1] is the field value
    savePressed = async() => {
        let data = new Object();
        this.state.list.forEach(value => {
            console.log("Value 0: " + value[0])
            console.log("Value 1: " + value[1])
            data[value[0]] = value[1]
        })
        console.log(data)

        let user = firebase.auth().currentUser["email"];
        console.log(user);
        let db = firebase.firestore();

        //Update the corresponding survey depending if completed or not
        if(this.state.completed) {
            await db.collection("users").doc(user).collection("completed").doc(this.state.title).set(data);
        } else {
            await db.collection("users").doc(user).collection("incomplete").doc(this.state.title).set(data); 
        }

        Toast.show('Survey Saved', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });
    }

    //Toggles if a survey is completed/in-progress
    checkCompleted = async() => {
        await this.setState({
            completed: !this.state.completed
        })

        let status = ''
        if(this.state.completed) {
            status = 'Survey Completed';
        } else {
            status = 'Survey in Progress';
        }

        Toast.show(status, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });
    }

    //Refresh function for reloading data
    refreshData = async () => {
        await this.readFromDB(this.state.title);
        return(
            <View>
                {this.state.list.map((elem,i) => (
                    <DisplayDatabaseStuff
                        key={i}
                        element={elem}
                    />
                ))}
            </View>
        )
    }


    //Load the completed survey
    loadCompletePressed = async() => {
        let user = firebase.auth().currentUser["email"];
        let db = firebase.firestore()
        let tempList = new Array();
        db.collection("users").doc(user).collection("completed").doc(this.state.title).get().then((doc) => {
            var object = doc.data()
            Object.entries(object).forEach(temp => {
                tempList.push(temp)
            })

            this.setState({
                list: tempList,
                completed: true
            })
        })
    }

    //Load the in-progress survey
    loadIncompletePressed = async() => {
        let user = firebase.auth().currentUser["email"];
        let db = firebase.firestore()
        let tempList = new Array();
        db.collection("users").doc(user).collection("incomplete").doc(this.state.title).get().then((doc) => {
            var object = doc.data()
            Object.entries(object).forEach(temp => {
                tempList.push(temp)
            })

            this.setState({
                list: tempList,
                completed: false
            })
        })
    }

    render() {
        const { navigation } = this.props;
        this.state.title = navigation.getParam('survey')
        return (
            <View style={styles.container}>    
                <KeyboardAwareScrollView enableOnAndroid={true}>
                    <Text style={styles.optionsTitleText}>{this.state.title}</Text>
                    <DisplayCompleted
                        completed={this.state.completed}
                    />
                    <View style={styles.container}>
                        {
                            this.state.list.map((elem,i) => (
                                <DisplayDatabaseStuff
                                    element={this.state.list[i]}
                                    key={i}
                                    i={i}
                                    updateFunction={(i,elem) => this.updateValue(i,elem)}
                                />
                            ))
                        }
                    </View>

                    <View style={styles.containerStacked}>
                        <Button type="outline"
                            icon={
                                <Icon
                                    name={'save'}
                                    size={15}
                                    color={'green'}
                                />
                            }
                            onPress={() => this.savePressed()}
                            iconRight
                            title={'Save Progress     '}
                        />
                        <Button type="outline"
                            icon={
                                <Icon
                                    name={'upload'}
                                    size={15}
                                    color={'green'}
                                />
                            }
                            onPress={() => this.loadCompletePressed()}
                            iconRight
                            title={'Load Complete Survey     '}
                        />
                        <Button type="outline"
                            icon={
                                <Icon
                                    name={'upload'}
                                    size={15}
                                    color={'green'}
                                />
                            }
                            onPress={() => this.loadIncompletePressed()}
                            iconRight
                            title={'Load Incomplete Survey     '}
                        />
                        <Button type="outline"
                            icon={
                                <Icon
                                    name={'check'}
                                    size={15}
                                    color={'green'}
                                />
                            }
                            onPress={() => this.checkCompleted()}
                            iconRight
                            title={'Check/Uncheck as Completed     '}
                        />
                        
                        {this.state.submitted && 
                            <Text style={styles.messageText}>Successfully Submitted!</Text>
                        }
                    </View>

                    <View style={styles.containerStacked}>
                        <Button
                            type="outline"
                            icon={
                                <Icon
                                    name='arrow-left'
                                    size={15}
                                    color='blue'
                                />
                            }
                            onPress={() => this.props.navigation.navigate('RelevantSurveys')}
                            iconLeft
                            title='   Back To Surveys'
                        />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

function DisplayCompleted({completed}) {
    if(completed) {
        return(
            <Text style={styles.optionSubheadingText}>
                Completed
            </Text>
        )
    } else {
        return(
            <Text style={styles.optionSubheadingText}>
                Incomplete
            </Text>
        )
    }
}

function DisplayDatabaseStuff({element, i, updateFunction}) {
    console.log(element);
}

function LabelForInput({customLabel}){
    return (
      <Text style={styles.optionSmallHeadingText}>
        {customLabel}
      </Text>
    )
  }

  function CheckboxWTaCaOP({name,ischecked,uponpress}) {
    return (
      <CheckBox
        center
        textStyle={styles.optionButton}
        title={name}
        checked={ischecked}
        onPress={uponpress}
      />
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
    },
    optionsTitleText: {
      textAlign: 'center',
      fontSize: 32,
      paddingTop: 60,
      marginBottom: 12,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
    optionIconContainer: {
      marginRight: 9,
    },
    option: {
      backgroundColor: '#fdfdfd',
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#EDEDED',
    },
    optionText: {
      fontSize: 15,
      marginTop: 1,
    },
    optionButton: {
      fontSize: 12,
      marginTop: 1,
    },
    optionSubheadingText: {
      textAlign: 'center',
      fontSize: 24,
      marginTop: 15,
      marginBottom: 15,
      textDecorationLine: 'underline',
    },
    optionMultipleButtons: {
      flexDirection: "row",  
      justifyContent: 'space-evenly',
      paddingLeft: 25,
      paddingRight: 25,
    },
    optionMultipleInputs: {
      flexDirection: "row",  
      justifyContent: 'space-evenly',
    },
    containerInput: {
      paddingTop: 8,
      paddingBottom: 1,
      paddingHorizontal: 1,
      paddingLeft: 20,
      paddingRight: 20,
    },
    containerMultipleInput: {
      paddingTop: 8,
      paddingBottom: 8,
      maxWidth: 180,
      justifyContent: "center",
    },
    optionSmallHeadingText: {
      fontSize: 15,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
      paddingLeft: 10,
      fontStyle: 'italic'
    },
    messageText: {
      textAlign: 'center',
      fontSize: 20,
      marginTop: 15,
      marginBottom: 15,
    },
    containerStacked: {
      flex: 1,
      paddingTop: 20,
    },
  });