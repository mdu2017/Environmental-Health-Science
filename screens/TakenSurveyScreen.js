import React from 'react';
import { StyleSheet, Text, View, Button, SectionList, AsyncStorage } from 'react-native';
import ListItem from 'react-native-elements';
import SurveyList from '../components/SurveyList';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class TakenSurveyScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      surveySection: [
        {title: 'In Progress', data: ['General Information Survey']},
        {title: 'Completed', data: ['Drinking Water Survey', 'Environmental Conditions Survey']}
      ]
    };
  }

  //Can add surveys to the in progress/completed sections
  addInProgress = () => {
    let newSection = this.state.surveySection.slice();
    newSection[0].data.push('New Survey');

    this.setState({
      surveySection: newSection
    });

    this.saveSurveyData(this.state);
  }

  // Saves the list
  //Async save (saves the JSON of the state)
  saveSurveyData = async surveyList => {
    try {

      let data = JSON.stringify(surveyList);

      //Saves the item as a (key, JSON string)
      await AsyncStorage.setItem('SurveysTakenList', data);

    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  //Get saved data
  getSurveyData = async () => {
    let userId = '';
    try {
      userId = await AsyncStorage.getItem('SurveysTakenList') || 'none';

      // Parse the saved JSON and update the survey list
      let loadedState = JSON.parse(userId);
      this.setState(loadedState);
    
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return userId;
  }

  //Load list when page is loaded
  componentDidMount = () => {
    this.getSurveyData();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Here is a list of surveys you have filled out.</Text>

        <SectionList style={styles.sectionContainer}
          sections={this.state.surveySection}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          renderItem={({item}) => 
          <TouchableOpacity>
            <Text style={styles.item} onPress={() => this.props.navigation.navigate('GeneralSurvey')}>{item}</Text>
          </TouchableOpacity>
        }
          keyExtractor={(item, index) => index}
        />

        <Button title='Add In-Progress Survey' onPress={() => this.addInProgress()}/>
        
        <Button
          title="Go Back To Settings"
          onPress={() =>
            this.props.navigation.navigate('Settings')
          }
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
