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
import MultiSelect from 'react-native-multiple-select';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class RealSurveyScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            sectionTitles: [],
            submitted: false,
            completed: false,
            new: false,
            docNum: 0
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
        if(!this.state.new) {
            let db = firebase.firestore();
            let user = firebase.auth().currentUser;
            var tempList = new Array();
            var titleList = new Array();

            var getOptions = {
                source: 'server'
            }
            db.collection("surveys").doc(user).collection("incomplete").doc(temp).collection("number").get("" + this.state.docNum).then((doc) => {
                var object = doc.data()
                tempList.push(object)
                console.log(object)

                titleList = Object.keys(object["sections"])

                var layer1list = new Array();
                tempList.forEach((layer1) => {
                    Object.values(layer1).forEach((layer2) => {
                        var layer2list = new Array();
                        Object.values(layer2).forEach((layer3) => {
                            var layer3list = new Array();
                            Object.values(layer3).map((layer4,i) => {
                                var layer4list = new Array();
                                layer4list = Object.values(layer4)
                                layer3list.push(layer4list)
                            })
                            layer2list.push(layer3list)
                        })
                        layer1list.push(layer2list)
                    })
                    tempList.push(layer1list)
                })

                this.setState({
                    list: layer1list,
                    sectionTitles: titleList
                })
            })
        } else {
            let db = firebase.firestore();
            var tempList = new Array();
            var titleList = new Array();

            var getOptions = {
                source: 'server'
            }
            db.collection("surveys").doc(temp).get(getOptions).then((doc) => {
                var object = doc.data()
                tempList.push(object)
                console.log(object)

                titleList = Object.keys(object["sections"])

                var layer1list = new Array();
                tempList.forEach((layer1) => {
                    Object.values(layer1).forEach((layer2) => {
                        var layer2list = new Array();
                        Object.values(layer2).forEach((layer3) => {
                            var layer3list = new Array();
                            Object.values(layer3).map((layer4,i) => {
                                var layer4list = new Array();
                                layer4list = Object.values(layer4)
                                layer3list.push(layer4list)
                            })
                            layer2list.push(layer3list)
                        })
                        layer1list.push(layer2list)
                    })
                    tempList.push(layer1list)
                })

                this.setState({
                    list: layer1list,
                    sectionTitles: titleList
                })
            })
        }
    }

    render() {
        console.log("Made it")
        const { navigation } = this.props;
        this.state.title = navigation.getParam('survey')
        this.state.new = navigation.getParam('new')
        if(navigation.getParam('new')) {
            var tempID = 0;
            let db = firebase.firestore();
            let user = firebase.auth().currentUser["email"]
            let getOptions = {
                source: "server"
            }
            db.collection("users").doc(user).collection("incomplete").doc(navigation.getParam('survey')).collection("number").get(getOptions).then((snapshot) => {
                snapshot.forEach(() => {
                    tempID++
                })

                this.state.docNum = tempID
            })
        } else {
            this.state.docNum = navigation.getParam('docNum')
        }
        
        return (
            <View style={styles.container}>    
                <KeyboardAwareScrollView enableOnAndroid={true}>
                    <Text style={styles.optionsTitleText}>{this.state.title}</Text>
                    <DisplayCompleted
                        completed={"View Only"}
                    />
                    <View style={styles.container}>
                    {
                            this.state.list.map((object,i) => (
                                object.map((value,j) => (
                                    value.map((stupid,k) => (
                                        value.map((stupid2,m) => (
                                            <DisplayDatabaseStuff
                                                element={this.state.list[i][j][k][m]}
                                                key={k}
                                                i={i}
                                                j={j}
                                                k={k}
                                                m={m}
                                                sectionTitle={this.state.sectionTitles[j]}
                                                updateFunction={() => {}}
                                            />
                                        ))
                                    ))
                                ))
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
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

function DisplayCompleted({completed}) {
    return(
        <Text style={styles.optionSubheadingText}>
            {completed}
        </Text>
    )
}

function DisplayDatabaseStuff({element, i, j, k, m, updateFunction, sectionTitle}) {
    if(i===0) {
        switch(element["fieldType"]) {
            case "TEXTENTRY":
                return (
                    <View>
                        <Text style={styles.optionLargeHeadingText}>{sectionTitle}</Text>
                        <DisplayTextEntry i={i} j={j} k={k} m={m} element={element} updateFunction={updateFunction}/>
                    </View>
                )
            case "SELECTONE":
                return (
                    <View>
                        <Text style={styles.optionLargeHeadingText}>{sectionTitle}</Text>
                        <DisplayOneEntry i={i} j={j} k={k} m={m} element={element} updateFunction={updateFunction}/>
                    </View>
                )
            case "SELECTMULTIPLE":
                    return (
                        <View>
                            <Text style={styles.optionLargeHeadingText}>{sectionTitle}</Text>
                            <DisplayMultiEntry i={i} j={j} k={k} m={m} element={element} updateFunction={updateFunction}/>
                        </View>
                    )
        }
    }
    switch(element["fieldType"]) {
        case "TEXTENTRY":
            return <DisplayTextEntry i={i} j={j} k={k} m={m} element={element} updateFunction={updateFunction}/>
        case "SELECTONE":
            return <DisplayOneEntry i={i} j={j} k={k} m={m} element={element} updateFunction={updateFunction}/>
        case "SELECTMULTIPLE":
            return <DisplayMultiEntry i={i} j={j} k={k} m={m} element={element} updateFunction={updateFunction}/>
    }
    return (
        <View>
            <Text>Should never display due to agreed upon types</Text>
        </View>
    )
}

function DisplayMultiEntry({element, i, j, k, m, updateFunction}) {
    var list = new Array();
    element["field"].map((value,i) => {
        list.push({id: i + '', name: value})
    })
    return (
        <View>
            <LabelForInput customLabel={element["prompt"]}/>
            <MultiSelect
                items={list}
                onSelectedItemsChange={(values)=> {
                    updateFunction(i,j,k,m,values,3)
                }}
                hideSubmitButton={true}
                uniqueKey="id"
            />
            <View>
                {
                    element["answer"].map((value,i) => (
                        <Text style={{fontSize: 20, marginTop: 1}} key={i}>{value}</Text>
                    ))
                }
            </View>
        </View>
    )
}

function DisplayOneEntry({element, i, j, k, m, updateFunction}) {
    var list = new Array();
    element["field"].map((value,i) => {
        list.push({id: i + '', name: value})
    })
    return (
        <View>
            <LabelForInput customLabel={element["prompt"]}/>
            <MultiSelect
                items={list}
                onSelectedItemsChange={(values)=> {
                    updateFunction(i,j,k,m,values,2)
                }}
                hideSubmitButton={true}
                uniqueKey="id"
            />
            <View>
                <Text style={{fontSize: 20, marginTop: 1}} key={i}>{element["answer"]}       </Text>
            </View>
        </View>
    )
}

function DisplayTextEntry({element, i, j, k, m, updateFunction}) {
    return (
        <View>
            <LabelForInput customLabel={element["prompt"]}/>
            <Input
                value={element["field"]}
                placeholder={"Enter " + element["prompt"]}
                editable={false}
            />
        </View>
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
