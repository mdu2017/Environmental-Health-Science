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
            title: ''
        }

        //this.savePressed = this.savePressed.bind(this);
        //this.loadPressed = this.loadPressed.bind(this);
    }

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

    updateValue = (i,name) => {
        let tempList = this.state.list;
        tempList[i][1] = name;
        this.setState({
            list: tempList
        })
    }

    readFromDB = async(temp) => {
        let db = firebase.firestore();
        var tempList = new Array();

        var getOptions = {
            source: 'server'
        }
        db.collection("surveys").doc(temp).get(getOptions).then((doc) => {
            var object = doc.data()
            Object.entries(object).forEach(temp => {
                tempList.push(temp)
            })

            this.setState({
                list: tempList
            })
        })
    }

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

    render() {
        const { navigation } = this.props;
        this.state.title = navigation.getParam('survey')
        return (
            <View style={styles.container}>    
                <KeyboardAwareScrollView enableOnAndroid={true}>
                    <Text style={styles.optionsTitleText}>{this.state.title}</Text>
                    <Text style={styles.optionSubheadingText}>Displaying database stuff below</Text>
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
                            onPress={() => this.loadPressed()}
                            iconRight
                            title={'Load Survey     '}
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

function DisplayDatabaseStuff({element, i, updateFunction}) {
    if(Array.isArray(element[1])) {
        if(element[1].length === 4) {
            return (
                <View>
                    <LabelForInput customLabel={element[0]}/>
                    <View style={styles.optionMultipleButtons}>
                        <CheckboxWTaCaOP
                            name='Suburban'
                            ischecked={element[1][0]}
                            uponpress={value => {
                                element[1][0] = true
                                element[1][1] = false
                                element[1][2] = false
                                element[1][3] = false
                                updateFunction(i,element[1])
                            }}
                        />
                        <CheckboxWTaCaOP
                            name='Rural'
                            ischecked={element[1][1]}
                            uponpress={value => {
                                element[1][1] = true
                                element[1][0] = false
                                element[1][2] = false
                                element[1][3] = false
                                updateFunction(i,element[1])
                            }}
                        />
                        <CheckboxWTaCaOP
                            name='Industrial'
                            ischecked={element[1][2]}
                            uponpress={value => {
                                element[1][2] = true
                                element[1][0] = false
                                element[1][1] = false
                                element[1][3] = false
                                updateFunction(i,element[1])
                            }}
                        />
                        <CheckboxWTaCaOP
                            name='Rural'
                            ischecked={element[1][3]}
                            uponpress={value => {
                                element[1][3] = true
                                element[1][0] = false
                                element[1][2] = false
                                element[1][1] = false
                                updateFunction(i,element[1])
                            }}
                        />
                    </View>
                </View>
            )
        } else {
            return (
                <View>
                    <LabelForInput customLabel={element[0]}/>
                    <View style={styles.optionMultipleButtons}>
                        <CheckboxWTaCaOP
                            name='Wind'
                            ischecked={element[1][0]}
                            uponpress={() => {
                                let tempArray = element[1]
                                tempArray[0] = !tempArray[0]
                                updateFunction(i,tempArray)
                            }}
                        />
                        <CheckboxWTaCaOP
                            name='Flood'
                            ischecked={element[1][1]}
                            uponpress={() => {
                                let tempArray = element[1]
                                tempArray[1] = !tempArray[1]
                                updateFunction(i,tempArray)
                            }}
                        />
                        <CheckboxWTaCaOP
                            name='Storm Surge'
                            ischecked={element[1][2]}
                            uponpress={() => {
                                let tempArray = element[1]
                                tempArray[2] = !tempArray[2]
                                updateFunction(i,tempArray)
                            }}
                        />
                        <CheckboxWTaCaOP
                            name='Other'
                            ischecked={element[1][3]}
                            uponpress={() => {
                                let tempArray = element[1]
                                tempArray[3] = !tempArray[3]
                                updateFunction(i,tempArray)
                            }}
                        />
                    </View>

                    <View>
                        { element[1][3] &&
                            <Input
                                labelStyle={styles.optionText}
                                placeholder={element[0]}
                                containerStyle={styles.containerInput}
                                onChangeText={other => {
                                    let tempArray = element[1]
                                    tempArray[1][4] = other
                                    updateFunction(i,element[1])
                                }}
                            />
                        }
                    </View>
                </View>
            )
        }
    } else if(typeof(element[1]) === 'string') {
        var temp = element[1]
        return (
            <View>
                <LabelForInput customLabel={element[0]}/>
                <Input value={temp} 
                    onChangeText={name => {
                        updateFunction(i,name)
                        temp=name
                    }} 
                    placeholder='Enter info'
                />
            </View>
        )
        // return (
        //     <View>
        //         <Text>String</Text>
        //     </View>
        // )
    }
    return (
        <View>
            <LabelForInput customLabel={element[0]}/>
            <Input value={element[1]["City"]} 
                onChangeText={city => {
                    element[1]["City"] = city

                    updateFunction(i,element[1])
                }} 
                placeholder='City'
            />
            <Input value={element[1]["Country"]} 
                onChangeText={ country => {
                    element[1]["Country"] = country
                    updateFunction(i,element[1])
                }}
                placeholder='Country'
            />
        </View>
        // <View>
        //     <Text>Object</Text>
        // </View>
    )
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