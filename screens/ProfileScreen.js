import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Your Profile:</Text>
        <Button
          title="Go Back To Settings"
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
