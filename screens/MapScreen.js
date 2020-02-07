import React from 'react';
import { ScrollView, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';

export default class MapScreen extends React.Component {
  state = {
      
  };

  getInitialState() {
    return {
      region: {
        latitude: 31.5497,
        longitude: -97.1143,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      },
    };
  }
   
  onRegionChange(region) {
    // this.setState({ region });
  }
   
  render() {
    return (
      <MapView
        style={styles.map}
        region={{
          latitude: 31.5497,
          longitude: -97.1143,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        onRegionChange={this.onRegionChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});