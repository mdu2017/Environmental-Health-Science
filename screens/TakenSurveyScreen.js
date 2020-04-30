import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import ListItem from 'react-native-elements';
import SurveyList from '../components/SurveyList';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import 'firebase/firestore';

var i=0;


export default class PendingSurveyScreen extends React.Component {
  static navigationOptions = {
    title: 'Completed Surveys',
  };
  constructor(props){
    super(props);
    this.state = {
      title: 'Completed Surveys',
      data: [],
      transitionFunctions: []
    };
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

    let tempData = new Array()
    let tempFunction = new Array()

    db.collection("users").doc(user).collection("completed").get(getOptions).then((snapshot) => {
      snapshot.forEach((doc) => {
        db.collection("users").doc(user).collection("completed").doc(doc.id).collection("number").get(getOptions).then((shotsnap) => {
          shotsnap.forEach((specificDoc) => {
            
            let object = {
              key: doc.id + " " + specificDoc.id
            }
            tempData.push(object)
            tempFunction.push(() => {this.props.navigation.navigate('ViewSurvey', {
              survey: doc.id,
              new: false,
              docNum: specificDoc.id
            })})
            this.setState({
              data:tempData,
              transitionFunctions: tempFunction
            })
            i=0
          })
        })
      })
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Click Survey Below to Edit</Text>

        <FlatList
          data={this.state.data}
          renderItem={({item}) => (
            <RenderListItem item={item} i={i++} value={this.state.transitionFunctions}/>
          )}
        />
      </View>
    );
  }
};

function RenderListItem({item, i, value}) {
  console.log(item)
  console.log(i)
  console.log(value)
  return (
    <Button type="outline"
      onPress={() => value[i]()}
      iconRight
      title={item.key}
    />
  )
}

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