import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { CheckBox, Input, Button } from 'react-native-elements';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AsyncStorage} from 'react-native';

export default class SurveyScreen extends React.Component {
  constructor(props) {
    super(props);

    this.savePressed = this.savePressed.bind(this);
    this.loadPressed = this.loadPressed.bind(this);
  }

  state = {
            surveyKey: '', // Need a way to have a unique identifier for each survey
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
            loggedin: true,
            fullName: '',
            locationCity: '',
            locationCtry: '',
            eventName: '',

  };

  //Async save (saves the JSON of the state)
  saveSurveyData = async surveyData => {
    try {
      await AsyncStorage.setItem('surveyData', surveyData);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  //Get saved data
  getSurveyData = async () => {
    let userId = '';
    try {
      userId = await AsyncStorage.getItem('surveyData') || 'none';
      // console.log('Suburban was saved when ' + userId);

      // Parse the saved JSON and update the survey fields
      let loadedState = JSON.parse(userId);
      this.setState(loadedState);
    
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return userId;
  }

  //Save button pressed
  savePressed = () => {
    let data = JSON.stringify(this.state);
    this.saveSurveyData(data);
    console.log('Saved data');
  }

  //Load button pressed
  loadPressed = () => {
    this.getSurveyData();
    console.log('Loaded data');
  }

  //Update full Name
  updateFullName = (name) => {
    this.setState({
      fullName: name
    });
  }

  //Update city Name
  updateCity = (cty) => {
    this.setState({
      locationCity: cty
    });
  }

  //Update country Name
  updateCountry = (cntry) => {
    this.setState({
      locationCtry: cntry
    });
  }

  //Update name of event 
  updateEventName = (evt) => {
    this.setState({
      eventName: evt
    });
    console.log(this.state.eventName);
  }

  render() {
    return (
      <View>
        <KeyboardAwareScrollView enableOnAndroid={true}>
            <Text style={styles.optionsTitleText}>Environmental Health Rapid Assessment Form</Text>
            <Text style={styles.optionSubheadingText}>General Information</Text>
            <LabelForInput customLabel='Full Name' />
            <Input value={this.state.fullName} 
              onChangeText={name => this.updateFullName(name)} 
              placeholder='Joseph Smith' />
            <LabelForInput customLabel='Location' />
            <Input value={this.state.locationCity} 
              onChangeText={cty => this.updateCity(cty)} 
              placeholder='City'/>
              <Input value={this.state.locationCtry} 
              onChangeText={cntry => this.updateCountry(cntry)} 
              placeholder='Country'/>
            {/* <InputTextWPaTCT plchldrTxt='City' txtCT='addressCity' /> */}
            {/* <InputTextWPaTCT plchldrTxt='Country' txtCT='countryName' /> */}
            <LabelForInput customLabel='Type of Area' />

            <View style={styles.optionMultipleButtons}>
              <CheckboxWTaCaOP
                name='Suburban'
                ischecked={this.state.suburban}
                uponpress={() => this.setState({
                    suburban: !this.state.suburban,
                    rural: false,
                    industrial: false,
                    city: false,
                  })
                }
              />
              <CheckboxWTaCaOP
                name='Rural'
                ischecked={this.state.rural}
                uponpress={() => this.setState({
                    suburban: false,
                    rural: !this.state.rural,
                    industrial: false,
                    city: false,
                  })
                }
              />
              <CheckboxWTaCaOP
                name='Industrial'
                ischecked={this.state.industrial}
                uponpress={() => this.setState({
                    suburban: false,
                    rural: false,
                    industrial: !this.state.industrial,
                    city: false,
                  })
                }
              />
              <CheckboxWTaCaOP
                name='City'
                ischecked={this.state.city}
                uponpress={() => this.setState({
                    suburban: false,
                    rural: false,
                    industrial: false,
                    city: !this.state.city,
                  })
                }
              />
            </View>

            <Text style={styles.optionSubheadingText}>Event Information</Text>
            <Input placeholder='Superstorm Sandy' 
              onChangeText={evt => this.updateEventName(evt)}
              value={this.state.eventName}/>
            {/* <InputTextWPlaceholder plchldrTxt='Superstorm Sandy' /> */}
            <LabelForInput customLabel='Nature of Impact' />

            <View style={styles.optionMultipleButtons}>
              <CheckboxWTaCaOP
                name='Wind'
                ischecked={this.state.wind}
                uponpress={() => this.setState({
                    wind: !this.state.wind,
                  })
                }
              />
              <CheckboxWTaCaOP
                name='Flood'
                ischecked={this.state.flood}
                uponpress={() => this.setState({
                    flood: !this.state.flood,
                  })
                }
              />
              <CheckboxWTaCaOP
                name='Storm Surge'
                ischecked={this.state.stormsurge}
                uponpress={() => this.setState({
                    stormsurge: !this.state.stormsurge,
                  })
                }
              />
              <CheckboxWTaCaOP
                name='Other'
                ischecked={this.state.other}
                uponpress={() => this.setState({
                    other: !this.state.other,
                  })
                }
              />
            </View>

            <View>
                {this.state.other && 
                  <InputTextWPlaceholder plchldrTxt='Nature of Impact' />
                }
            </View>

            {/* Save/Load/Submit Buttons */}
            <View style={styles.containerStacked}>
            <Button type="outline"
              icon={
                <Icon
                name={'save'}
                size={15}
                color={'green'}
                />
              }
              onPress={() => this.savePressed()}
              iconRight
              title={'Save Progress '}
            />
            <Button type="outline"
              icon={
                <Icon
                name={'check'}
                size={15}
                color={'green'}
                />
              }
              onPress={() => this.loadPressed()}
              iconRight
              title={'Load Survey '}
            />
                
                {this.state.submitted && 
                  <Text style={styles.messageText}>Successfully Submitted!</Text>
                }
            </View>

            <View style={styles.containerStacked}>
              <Button
                type="outline"
                icon={
                  <Icon
                  name='arrow-left'
                  size={15}
                  color='blue'
                  />
                }
                onPress={() => this.props.navigation.navigate('Map')}
                iconLeft
                title='   Back To Map'
              />
            </View>
          </KeyboardAwareScrollView>
      </View>
    );
  }
}

function LabelForInput({customLabel}){
  return (
    <Text style={styles.optionSmallHeadingText}>
      {customLabel}
    </Text>)
    ;
}

function InputTextWPlaceholder({plchldrTxt}) {
  return (
    <Input
      labelStyle={styles.optionText}
      placeholder={plchldrTxt}
      containerStyle={styles.containerInput}
    />
  );
}

function InputTextWPaTCT({plchldrTxt, txtCT}) {
  return (
    <Input
      labelStyle={styles.optionText}
      placeholder={plchldrTxt}
      containerStyle={styles.containerInput}
      textContentType={txtCT}
    />
  );
}

function InputTextWTCT({txtCT}) {
  return (
    <Input
      labelStyle={styles.optionText}
      containerStyle={styles.containerInput}
      textContentType={txtCT}
    />
  );
}

function CheckboxWTaCaOP({name,ischecked,uponpress}) {
  return (
    <CheckBox
      center
      textStyle={styles.optionButton}
      title={name}
      checked={ischecked}
      onPress={uponpress}
    />
  );
}

function ButtonWTitleAnIconAColor({name,iname,clr,uponpress}){
  return (
    <Button
      type="outline"
      icon={
        <Icon
        name={iname}
        size={15}
        color={clr}
        />
      }
      onPress={uponpress}
      iconRight
      title={name}
    />
  );
}

function readyToSubmit(state){
  if(state.foname && state.focity && 
    state.focountry && state.fotypeofarea &&
    state.foeventname && state.fonatureofimpact){
      return true;
    } else {
      return false;
    }
}

//Save/Submit button
function SubmitOrSaveButton(state){
  if(readyToSubmit(state) == true){
      return (
        <ButtonWTitleAnIconAColor
          name='Submit Survey    '
          iname='check'
          clr='green'
          uponpress={() => null}
        />
      );
    } else {
      return (
        <ButtonWTitleAnIconAColor
          name='Save Progress    '
          iname='save'
          clr='green'
          uponpress={() => null}
        />
      );
    }
}

//Load button
function LoadButton(){
  return(
    <ButtonWTitleAnIconAColor
          name='Load Survey    '
          iname='check'
          clr='green'
          uponpress={() => null}
        />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  optionsTitleText: {
    textAlign: 'center',
    fontSize: 32,
    paddingTop: 60,
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
  containerStacked: {
    flex: 1,
    paddingTop: 20,
  },
});