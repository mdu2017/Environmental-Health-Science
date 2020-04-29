import React from 'react';
import { StyleSheet, Text, View, Button, SectionList } from 'react-native';
import ListItem from 'react-native-elements';
import SurveyList from '../components/SurveyList';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import 'firebase/firestore';


export default class PendingSurveyScreen extends React.Component {
  static navigationOptions = {
    title: 'Pending Surveys',
  };
  constructor(props){
    super(props);
    this.state = {
      surveySection: [
        {title: 'In Progress', data: []},
      ],
      transitionFunctions: []
    };
  }

  //Can add surveys to the in progress/completed sections
  addInProgress = (surveyName,transitionFunction) => {
    let newSection = this.state.surveySection.slice();
    newSection[0].data.push(surveyName);

    let tempArray = this.state.transitionFunctions

    tempArray.push(transitionFunction)

    this.setState({
      surveySection: newSection,
      transitionFunctions: transitionFunction
    });
  }

  //Grab data from db when loading page
  componentDidMount = async() => {
    await this.readInProgress();
  }

  //Reads survey list in progress from database (not completed surveys)
  readInProgress = async () => {

    let db = firebase.firestore();
    let user = firebase.auth().currentUser["email"]

    let getOptions = {
      source: "server"
    }

    db.collection("users").doc(user).collection("incomplete").get(getOptions).then((snapshot) => {
      console.log("hi")
      snapshot.forEach((doc) => {
        console.log(doc)
        db.collection("users").doc(user).collection("incomplete").doc(doc.id).collection("number").get(getOptions).then((shotsnap) => {
          shotsnap.forEach((specificDoc) => {
            this.addInProgress(doc.id + " " + specificDoc.id, () => {this.props.navigations.navigate('ViewSurvey', {
              survey: doc.id + " " + specificDoc.id,
              new: false,
              docNum: specificDoc.id
            })})
          })
        })
      })
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Pending Completion Surveys</Text>

        <SectionList style={styles.sectionContainer}
          sections={this.state.surveySection}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          renderItem={({item}) => 
            <TouchableOpacity>
              <Text style={styles.item}>{item}</Text>
            </TouchableOpacity>
          }
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  titleText: {
    paddingTop: '5%',
    fontSize: 20,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: '8%',
    paddingTop: '15%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionContainer: {
    paddingTop: '10%',
    width: '100%',
  },
  optionsTitleText: {
    fontSize: 20,
    marginLeft: 25,
    marginTop: 10,
    marginBottom: 15,
    color: 'blue',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(92,247,128,0.5)',
  },
  item: {
    backgroundColor: '#fbfbfb',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});