import React from 'react';
import { StyleSheet, Text, View, Button, SectionList } from 'react-native';
import ListItem from 'react-native-elements';
import SurveyList from '../components/SurveyList';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class PendingSurveyScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      surveySection: [
        {title: 'In Progress', data: ['General Information Survey']},
        {title: 'Completed', data: ['Drinking Water Survey', 'Environmental Conditions Survey']}
      ]
    };
  }

  //Test functionality of adding surveys to the in progress/completed sections
  addInProgress = () => {
    let newSection = this.state.surveySection.slice();
    newSection[0].data.push('New Survey');

    this.setState({
      surveySection: newSection
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Pending Surveys</Text>

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
          title="Go Back To Profile"
          onPress={() =>
            this.props.navigation.navigate('Profile')
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