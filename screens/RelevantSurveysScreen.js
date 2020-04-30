import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
import 'firebase/firestore';

/** Remove popup for Android timer warning */
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer']);
/** *************************************** */


export default class RelevantSurveyScreen extends React.Component {

    static navigationOptions =({navigation})=> ({
        title: 'Location Relevant Surveys',
        headerTitleStyle:{
            fontSize:24,
            marginTop:5,
            alignSelf:'center'
        },
      });

    constructor(props){
        super(props);
        this.state = {
          surveyList: []
        }
    };

    //Display data upon load
    componentDidMount = async () =>{
        await this.readFromDB();
        return(
            <View>
                {this.state.surveyList.map((elem,i) => (
                    <LabelAndRedir 
                    key={i}
                    labeltext={elem} 
                    uponpress1={() => this.props.navigation.navigate('ViewSurvey',  {
                        survey: elem
                    })}
                    uponpress2={() => this.props.navigation.navigate('HandleSurvey',  {
                        survey: elem
                    })}
                    />
                ))}
            </View>
        );
    }

    //update button
    readFromDB = async () => {
        let db = firebase.firestore();
        let tempList = []

        console.log("hello")

        let getOptions = {
            source: "server"
        }
        db.collection("surveys").get(getOptions).then((snapshot) => {
            snapshot.docs.forEach(doc => {
                console.log("hello")
                let str = doc.id;
                tempList.push(str);
            })

            //update state
            this.setState({
                surveyList: tempList
            })
        })
    };

    refreshData = async () => {
        await this.readFromDB();
        return(
            <View>
                {this.state.surveyList.map((elem,i) => (
                    <LabelAndRedir 
                    key={i}
                    labeltext={elem} 
                    uponpress1={() => this.props.navigation.navigate('ViewSurvey',  {
                        survey: elem
                    })}
                    uponpress2={() => this.props.navigation.navigate('HandleSurvey', {
                        survey: elem
                    })}
                    />
                ))}
            </View>
        );
    }

  render() {
    return (
        <View style={styles.container}>    
        

            <View style={styles.container}>
                <Text style={styles.optionSubheadingText}>Nearby Surveys</Text>
            </View>

            <View>
                {this.state.surveyList.map((elem,i) => (
                    <LabelAndRedir 
                    key={i}
                    labeltext={elem} 
                    uponpress1={() => this.props.navigation.navigate('ViewSurvey',  {
                        survey: elem
                    })}
                    uponpress2={() => this.props.navigation.navigate('HandleSurvey', {
                        survey: elem
                    })}
                    />
                ))}
            </View>
            <View>

                <Button 
                    title="Refresh Survey List" 
                    onPress={() => this.refreshData()}
                    style={styles.optionButton}
                />
                <Button
                    style={styles.optionButton}
                    title="Back To Profile"
                    onPress={() =>
                        this.props.navigation.navigate('Profile')
                    }
                    on
                />
            </View>
        </View>
    );
  }
}

function LabelAndRedir({labeltext,uponpress1,uponpress2}) {
    return (
        <View style={styles.iconStyle}>
            {/* <View style={styles.optionMultipleButtons}> */}
                {/* <View> */}
                    <Text style={styles.optionsTitleText}>{labeltext}</Text>
                    <Button
                        type="outline"
                        icon={
                            <Icon
                                name='eye'
                                size={15}
                                color='black'
                            />
                        }
                        style={styles.iconStyle}
                        onPress={uponpress1}
                        iconLeft
                        title=''
                    />
                    <Button
                        type="outline"
                        icon={
                            <Icon
                                name='pencil'
                                size={15}
                                color='black'
                            />
                        }
                        style={styles.iconStyle}
                        onPress={uponpress2}
                        iconRight
                        title=''
                    />
                {/* </View> */}
            {/* </View> */}
        </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: '5%',
    },
    optionsTitleText: {
      fontSize: 24,
      marginLeft: 25,
      marginTop: 10,
      marginBottom: 15,
      color: 'black',
    },
    optionIconContainer: {
      paddingTop: 15,
      justifyContent: 'flex-start',
      flexDirection: 'row'
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
    optionSubheadingText: {
        textAlign: 'center',
        fontSize: 30,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    optionButton: {
        fontSize: 15,
        paddingBottom: '1%',
        paddingTop: '1%',
        textAlign: 'center',
        padding: '1%',
    },
    optionSurveyButton: {
        fontSize: 20,
        marginTop: 20,
        paddingTop: 20,
        textAlign: 'left',
        color: 'blue',
    },
    optionMultipleButtons: {
        flexDirection: "row",  
        justifyContent: 'space-evenly',
        paddingLeft: 25,
        paddingRight: 25,
    },
    containerStacked: {
        flexDirection: 'row',
        padding: 20,
        textAlign: 'left'
    },
    iconStyle: {
        flexDirection: 'row-reverse',
        padding: 10
    }
});