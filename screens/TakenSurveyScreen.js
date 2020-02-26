import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import ListItem from 'react-native-elements';
import SurveyList from '../components/SurveyList';

const list = [
  {
    title: 'Survey 1',
  },
  {
    title: 'Surveys B',
  },
]

export default class TakenSurveyScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      fill: ''
    }
  }

  render() {
    return (
        <View>
          <Button
            title="Go Back to settings"
            onPress={() =>
              this.props.navigation.navigate('Settings')
            }
          />
          <SurveyList/>
        </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
