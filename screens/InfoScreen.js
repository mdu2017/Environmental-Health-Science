import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class InfoScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Info: This App was made by Baylor students - blah blah blah Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
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
