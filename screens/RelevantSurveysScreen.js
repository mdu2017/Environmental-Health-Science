import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
import 'firebase/firestore';


export default class RelevantSurveyScreen extends React.Component {
  render() {
    
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.optionSubheadingText}>Location-Relevant Surveys</Text>
                
                <script>
                    let db = firebase.firestore()
                    const surveys = document.querySelector('#survey-list');
                    // Gets all the surveys, will narrow down to name of city
                    db.collection('surveys').get().then((snapshot) => {
                        snapshot.docs.forEach(doc => {
                            let li = document.createElement('li')
                            let city = document.createElement('span');

                            li.setAttribute('data-id', doc.id);
                            city.textContent = doc.data().city;

                            li.appendChild(city);

                            surveys.appendChild(li);
                        })
                    })
                </script>
            </View>
            <View>
                <Button
                    style={styles.optionButton}
                    title="Back To Map"
                    onPress={() =>
                        this.props.navigation.navigate('Map')
                    }
                />
                <Button
                    style={styles.optionButton}
                    title="Back To Profile"
                    onPress={() =>
                        this.props.navigation.navigate('Profile')
                    }
                />
            </View>
        </View>
    );
  }
}

function LabelAndRedir({labeltext,uponpress1,uponpress2}) {
    return (
        <View>
            <View style={styles.optionMultipleButtons}>
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
                        onPress={uponpress1}
                        iconLeft
                        title=' '
                        />
                    <Button
                        type="outline"
                        icon={
                            <Icon
                            name='pencil'
                            size={15}
                            color='green'
                            />
                        }
                        onPress={uponpress2}
                        iconRight
                        title=' '
                        />
                {/* </View> */}
            </View>
        </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 30,
      paddingBottom: 70,
    },
    optionsTitleText: {
      fontSize: 20,
      marginLeft: 25,
      marginTop: 10,
      marginBottom: 15,
      color: 'black',
    },
    optionIconContainer: {
      paddingTop: 15,
      justifyContent: 'flex-start',
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
        marginTop: 30,
        marginBottom: 15,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    optionButton: {
        fontSize: 15,
        paddingBottom: 20,
        paddingTop: 20,
        textAlign: 'center',
        padding: 50
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
  });