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
      <View style={styles.container}>
        <Text>Here is a list of surveys you have filled out.</Text>
        
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionsTitleText}>General Information Survey</Text>
          <Button
              style={styles.optionSurveyButton}
              title="To Survey"
              onPress={() =>
                  this.props.navigation.navigate('GeneralSurvey')
              }
          />
        </View>
        <View style={styles.optionIconContainer}>
            <View style={styles.optionTextContainer}>
                <Text style={styles.optionsTitleText}>Drinking Water Survey</Text>
                <Button
                    style={styles.optionSurveyButton}
                    title="To Survey"
                    onPress={() =>
                        this.props.navigation.navigate('GeneralSurvey')
                    }
                />
            </View>
        </View>

        <View style={styles.optionIconContainer}>
            <View style={styles.optionTextContainer}>
                <Text style={styles.optionsTitleText}>Sewage, Waste and Asbestos Survey</Text>
                <Button
                    style={styles.optionSurveyButton}
                    title="To Survey"
                    onPress={() =>
                        this.props.navigation.navigate('GeneralSurvey')
                    }
                />
            </View>
        </View>
        <Button
          title="Go Back to settings"
          onPress={() =>
            this.props.navigation.navigate('Settings')
          }
        />
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
  optionsTitleText: {
    fontSize: 20,
    marginLeft: 25,
    marginTop: 10,
    marginBottom: 15,
    color: 'blue',
  },
});
