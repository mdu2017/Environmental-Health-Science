import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { CheckBox, Input, Button } from 'react-native-elements';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SurveyScreen extends React.Component {
  state = {
            suburban: false,
            rural: false,
            industrial: false,
            city: false,
            wind: false,
            flood: false,
            stormsurge: false,
            other: false,
            readytosubmit: false,
            submitted: false,
            foname: true,
            focity: true,
            focountry: true,
            fotypeofarea: true,
            foeventname: true,
            fonatureofimpact: true,
          };
  render() {
    return (
      <View>
        <KeyboardAwareScrollView enableOnAndroid={true}>
            <Text style={styles.optionsTitleText}>Environmental Health Rapid Assessment Form</Text>
            <Text style={styles.optionSubheadingText}>General Information</Text>
            <Text style={styles.optionSmallHeadingText}>Full Name</Text>
            <Input
              labelStyle={styles.optionText}
              placeholder='Joe Smith'
              containerStyle={styles.containerInput}
            />
            <Text style={styles.optionSmallHeadingText}>Location</Text>
            {/* <View style={styles.optionMultipleInputs}> */}
              <Input
                placeholder='City'
                textStyle={styles.optionText}
                containerStyle={styles.containerInput}
                textContentType='addressCity'
              />
              <Input
                placeholder='Country'
                textStyle={styles.optionText}
                containerStyle={styles.containerInput}
                textContentType='countryName'
              />
            {/* </View> */}
            <Text style={styles.optionSmallHeadingText}>Type of Area</Text>
            <View style={styles.optionMultipleButtons}>
              <CheckBox
                center
                textStyle={styles.optionButton}
                title='Suburban'
                checked={this.state.suburban}
                onPress={() => this.setState({
                  suburban: !this.state.suburban,
                  rural: false,
                  industrial: false,
                  city: false,
                })}
              />
              <CheckBox
                center
                textStyle={styles.optionButton}
                title='Rural'
                checked={this.state.rural}
                onPress={() => this.setState({
                  suburban: false,
                  rural: !this.state.rural,
                  industrial: false,
                  city: false,
                })}
              />
              <CheckBox
                center
                textStyle={styles.optionButton}
                title='Industrial'
                checked={this.state.industrial}
                onPress={() => this.setState({
                  suburban: false,
                  rural: false,
                  industrial: !this.state.industrial,
                  city: false,
                })}
              />
              <CheckBox
                center
                textStyle={styles.optionButton}
                title='City'
                checked={this.state.city}
                onPress={() => this.setState({
                  suburban: false,
                  rural: false,
                  industrial: false,
                  city: !this.state.city,
                })}
              />
            </View>
            <Text style={styles.optionSubheadingText}>Event Information</Text>
            <Text style={styles.optionSmallHeadingText}>Name of Event</Text>
            <Input
              labelStyle={styles.optionText}
              placeholder='Superstorm Sandy'
              containerStyle={styles.containerInput}
            />
            <Text style={styles.optionSmallHeadingText}>Nature of Impact</Text>
            <View style={styles.optionMultipleButtons}>
              <CheckBox
                center
                textStyle={styles.optionButton}
                title='Wind'
                checked={this.state.wind}
                onPress={() => this.setState({
                  wind: !this.state.wind,
                })}
              />
              <CheckBox
                center
                textStyle={styles.optionButton}
                title='Flood'
                checked={this.state.flood}
                onPress={() => this.setState({
                  flood: !this.state.flood,
                })}
              />
              <CheckBox
                center
                textStyle={styles.optionButton}
                title='Storm Surge'
                checked={this.state.stormsurge}
                onPress={() => this.setState({
                  stormsurge: !this.state.stormsurge,
                })}
              />
              <CheckBox
                center
                textStyle={styles.optionButton}
                title='Other'
                checked={this.state.other}
                onPress={() => this.setState({
                  other: !this.state.other,
                })}
              />
            </View>
            <View>
                {this.state.other && 
                <Input
                  labelStyle={styles.optionText}
                  placeholder='Nature of Impact'
                  containerStyle={styles.containerInput}
                />}
            </View>
            <View style={styles.optionButton}>
                {this.state.foname && this.state.focity && 
                this.state.focountry && this.state.fotypeofarea &&
                this.state.foeventname && this.state.fonatureofimpact &&
                  <Button
                    type="outline"
                    icon={
                      <Icon
                      name="arrow-right"
                      size={15}
                      color="white"
                      />
                    }
                    onPress={() => this.setState({
                      submitted: true,
                    })}
                    iconRight
                    title="Submit Survey"
                    />
                }
                {!this.state.foname || !this.state.focity || 
                !this.state.focountry || !this.state.fotypeofarea ||
                !this.state.foeventname || !this.state.fonatureofimpact &&
                  <Button
                    type="outline"
                    icon={
                      <Icon
                      name="arrow-right"
                      size={15}
                      color="red"
                      />
                    }
                    iconRight
                    title="Submit Survey"
                    />
                }
                {this.state.submitted && 
                  <Text style={styles.messageText}>Successfully Submitted!</Text>
                }
            </View>
          </KeyboardAwareScrollView>
      </View>
    );
  }

  _handlePressDocs = () => {
    WebBrowser.openBrowserAsync('http://docs.expo.io');
  };

  _handlePressForums = () => {
    WebBrowser.openBrowserAsync('http://forums.expo.io');
  };

  _handlePressCheckBox1 = () => {
    WebBrowser.openBrowserAsync('http://forums.expo.io');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  optionsTitleText: {
    textAlign: 'center',
    fontSize: 32,
    marginTop: 12,
    marginBottom: 12,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  optionIconContainer: {
    marginRight: 9,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED',
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
  },
  optionButton: {
    fontSize: 12,
    marginTop: 1,
  },
  optionSubheadingText: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 15,
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
  optionMultipleButtons: {
    flexDirection: "row",  
    justifyContent: 'space-evenly',
    paddingLeft: 25,
    paddingRight: 25,
  },
  optionMultipleInputs: {
    flexDirection: "row",  
    justifyContent: 'space-evenly',
  },
  containerInput: {
    paddingTop: 8,
    paddingBottom: 1,
    paddingHorizontal: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  containerMultipleInput: {
    paddingTop: 8,
    paddingBottom: 8,
    maxWidth: 180,
    justifyContent: "center",
  },
  optionSmallHeadingText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    fontStyle: 'italic'
  },
  messageText: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 15,
    marginBottom: 15,
  },
});