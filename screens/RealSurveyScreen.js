import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { CheckBox, Input, Button } from 'react-native-elements';
import { ScrollView, KeyboardAvoidingView, Picker } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AsyncStorage } from 'react-native';
import Toast from 'react-native-root-toast';
import MultiSelect from 'react-native-multiple-select';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class RealSurveyScreen extends React.Component {
    static navigationOptions = {
        title: 'Back',
    };
    
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            completed: false,
            list: [],
            sectionTitles: []
        }

        this.savePressed = this.savePressed.bind(this);
    }

    //On load generate the fields and survey page
    componentDidMount = async() => {
        await this.readFromDB(this.state.title);
        return(
            <View>
                {}
            </View>
        )
    }

    //Update value of each field when it is changed (i is the index of the field, name is the new value)
    updateValue = (i,j,k,m,name,type) => {
        console.log("Called")
        if(type===1) {
            let tempList = this.state.list;
            tempList[i][j][k][m]["field"] = name;
            this.setState({
                list: tempList
            })
        } else if(type===2) {
            let tempList = this.state.list;
            tempList[i][j][k][m]["answer"] = tempList[i][j][k][m]["field"][name];
            this.setState({
                list: tempList
            })
        } else if(type===3) {
            console.log(name)
            let tempList=this.state.list
            if(tempList[i][j][k][m]["answer"].includes(tempList[i][j][k][m]["field"][name])) {
                var remove = tempList[i][j][k][m]["field"][name]
                console.log(remove)
                var index = tempList[i][j][k][m]["answer"].indexOf(tempList[i][j][k][m]["field"][name])
                console.log(index)
                tempList[i][j][k][m]["answer"].splice(index,1);
            } else {
                tempList[i][j][k][m]["answer"].push(tempList[i][j][k][m]["field"][name])
            }
            this.setState({
                list: tempList
            })
        }
    }

    //Fill list with fields from survey
    readFromDB = async(temp) => {
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

    //Save to DB when save pressed
    // Value[0] is the field name
    // Value[1] is the field value
    savePressed = async() => {
        let data = new Object();

        data = {
            "sections": {}
        }

        console.log("\n\n")
        this.state.list.forEach((layer1) => {
            layer1.map((layer2,j) => {
                var currentSection=this.state.sectionTitles[j]
                data["sections"][currentSection] = {
                    "questions": {}
                }
                layer2.map((layer3,i) => {
                    var question= "question" + i
                    layer3.forEach(important => {
                        data["sections"][currentSection]["questions"][question] = important
                    })
                })
            })
        })
        console.log(data)

        let user = firebase.auth().currentUser["email"];
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
        this.setState({
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
                {}
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
                                                updateFunction={(i,j,k,m,value,type) => this.updateValue(i,j,k,m,value,type)}
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
                onChangeText={(value) => updateFunction(i,j,k,m,value,1)}
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
    optionLargeHeadingText: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
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