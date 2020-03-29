import React from 'react';
import { ScrollView, StyleSheet, View, Button, Text } from 'react-native';
import MapView, { CalloutSubview } from 'react-native-maps';
import Callout from 'react-native-maps';
import Marker from 'react-native-maps';
import * as WebBrowser from 'expo-web-browser';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Missions',
  };
  constructor(props) {
    super(props);
    this.state ={
      tabTitle: ''
    };
    this.toTakenSurveys = this.toTakenSurveys.bind(this);
  }

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
   
  // When tab is pressed go to corresponding page
  toTakenSurveys(){
    console.log("yikes");
    this.props.navigation.navigate('Home');
    console.log("yikes 2");
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
      >
        <MapView.Marker
          coordinate={{
            latitude: 31.5467,
            longitude: -97.1043
          }}
          title={"Sample Mission #1"}
          description={"Sample Description"}
          pinColor='green'
        >
          <MapView.Callout
            style={styles.calloutThatRedirects}
            onPress={() => this.props.navigation.navigate('RelevantSurveys')}
          >
            <Button
              title="Relevant Surveys"
            />
          </MapView.Callout>
        </MapView.Marker>
        <MapView.Marker
          coordinate={{
            latitude: 31.5487,
            longitude: -97.1143
          }}
          title={"Sample Mission #2"}
          description={"Sample Description"}
          pinColor='yellow'
        >
          <MapView.Callout
            style={styles.calloutThatRedirects}
            onPress={() => this.props.navigation.navigate('RelevantSurveys')}
          >
            <Button
              title="Relevant Surveys"
            />
          </MapView.Callout>
        </MapView.Marker>
        <MapView.Marker
          coordinate={{
            latitude: 31.5507,
            longitude: -97.1243
          }}
          title={"Sample Mission #3"}
          description={"Sample Description"}
          pinColor='red'
        >
          <MapView.Callout
            style={styles.calloutThatRedirects}
            onPress={() => this.props.navigation.navigate('RelevantSurveys')}
          >
            <Button
              title="Relevant Surveys"
            />
          </MapView.Callout>
        </MapView.Marker>
      </MapView>
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
  calloutThatRedirects: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED',
  },
});