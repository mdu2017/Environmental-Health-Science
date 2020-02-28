import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class InfoScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Info: This App was made by a group of Baylor students.</Text>
        <Text>A mobile application used by Baylor students on their mission trips to measure environmental health factors at their location.</Text>
        <Button
          title="Go Back to Settings"
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
