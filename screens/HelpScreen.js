import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class HelpScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>How to use the app: gotta google it >:D</Text>
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
