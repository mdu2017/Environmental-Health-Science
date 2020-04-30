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
    static navigationOptions = {
        title: 'Back',
    };
    
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            title: '',
            submitted: false,
            completed: false,
        }
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
                    <Button
                      type="outline"
                      icon={
                        <Icon
                          name='pencil'
                          size={15}
                          color='green'
                        />
                      }
                      onPress={() => this.props.navigation.navigate('HandleSurvey',  {
                        survey: this.state.title
                      })}
                      iconRight
                      title='Edit Survey    '
                    />
                        
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
    if(Array.isArray(element[1])) {
        if(element[1].length === 4) {
            return (
                <View>
                    <LabelForInput customLabel={element[0]}/>
                    <View style={styles.optionMultipleButtons}>
                        <CheckboxWTaCaOP
                            name='Suburban'
                            ischecked={element[1][0]}
                            uponpress={() => null}
                        />
                        <CheckboxWTaCaOP
                            name='Rural'
                            ischecked={element[1][1]}
                            uponpress={() => null}
                        />
                        <CheckboxWTaCaOP
                            name='Industrial'
                            ischecked={element[1][2]}
                            uponpress={() => null}
                        />
                        <CheckboxWTaCaOP
                            name='City'
                            ischecked={element[1][3]}
                            uponpress={() => null}
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
                            uponpress={() => null}
                        />
                        <CheckboxWTaCaOP
                            name='Flood'
                            ischecked={element[1][1]}
                            uponpress={() => null}
                        />
                        <CheckboxWTaCaOP
                            name='Storm Surge'
                            ischecked={element[1][2]}
                            uponpress={() => null}
                        />
                        <CheckboxWTaCaOP
                            name='Other'
                            ischecked={element[1][3]}
                            uponpress={() => null}
                        />
                    </View>

                    <View>
                        { element[1][3] &&
                            <Input
                                labelStyle={styles.optionText}
                                placeholder={element[0]}
                                containerStyle={styles.containerInput}
                                onChangeText={() => null}
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
                    editable={false}
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
                editable={false}
                placeholder='City'
            />
            <Input value={element[1]["Country"]} 
                editable={false}
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
