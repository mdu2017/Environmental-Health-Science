import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class ConfigScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Configuration screen here: adjust settings, etc</Text>
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
