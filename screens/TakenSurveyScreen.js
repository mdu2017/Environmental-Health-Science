import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class TakenSurveyScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Here is a list of surveys you have filled out.</Text>
        <Text>Survey1</Text>
        <Text>Survey2</Text>
        <Text>Survey3</Text>
        <Button
          title="Go Back to settings"
          onPress={() =>
            this.props.navigation.navigate('Settings')
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
