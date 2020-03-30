import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { CheckBox, Input, Button } from 'react-native-elements';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ViewSurveyScreen extends React.Component {
  static navigationOptions = {
    title: 'View Survey',
  };
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }

  render() {
    return (
      <View>
        <KeyboardAwareScrollView enableOnAndroid={true}>
            <Text style={styles.optionsTitleText}>Static Form</Text>
            <Text style={styles.optionSubheadingText}>General Information</Text>
            <LabelForInput customLabel='Full Name' />
            <InputTextWPlaceholder plchldrTxt='Joseph Smith' />
            <LabelForInput customLabel='Location' />
            <InputTextWPaTCT plchldrTxt='City' txtCT='addressCity' />
            <InputTextWPaTCT plchldrTxt='Country' txtCT='countryName' />
            <LabelForInput customLabel='Type of Area' />
            <View style={styles.optionMultipleButtons}>
              <CheckboxWTaCaOP
                name='Suburban'
                ischecked={this.state.suburban}
                uponpress={() => null}
              />
              <CheckboxWTaCaOP
                name='Rural'
                ischecked={this.state.rural}
                uponpress={() => null}
              />
              <CheckboxWTaCaOP
                name='Industrial'
                ischecked={this.state.industrial}
                uponpress={() => null}
              />
              <CheckboxWTaCaOP
                name='City'
                ischecked={this.state.city}
                uponpress={() => null}
              />
            </View>
            <Text style={styles.optionSubheadingText}>Event Information</Text>
            <LabelForInput customLabel='Name of Event' />
            <InputTextWPlaceholder plchldrTxt='Superstorm Sandy' />
            <LabelForInput customLabel='Nature of Impact' />
            <View style={styles.optionMultipleButtons}>
              <CheckboxWTaCaOP
                name='Wind'
                ischecked={this.state.wind}
                uponpress={() => null}
              />
              <CheckboxWTaCaOP
                name='Flood'
                ischecked={this.state.flood}
                uponpress={() => null}
              />
              <CheckboxWTaCaOP
                name='Storm Surge'
                ischecked={this.state.stormsurge}
                uponpress={() => null}
              />
              <CheckboxWTaCaOP
                name='Other'
                ischecked={this.state.other}
                uponpress={() => null}
              />
            </View>
            <View>
                {this.state.other && 
                  <InputTextWPlaceholder plchldrTxt='Nature of Impact' />
                }
            </View>
            <View style={styles.containerStacked}>
            <Button
                type="outline"
                icon={
                    <Icon
                    name='pencil'
                    size={15}
                    color='green'
                    />
                }
                onPress={() => this.props.navigation.navigate('GeneralSurvey')}
                iconRight
                title='Edit Survey    '
            />
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
                onPress={() => this.props.navigation.navigate('RelevantSurveys')}
                iconLeft
                title='   Back To Surveys'
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
      editable={false}
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
      editable={false}
    />
  );
}

function InputTextWTCT({txtCT}) {
  return (
    <Input
      labelStyle={styles.optionText}
      containerStyle={styles.containerInput}
      textContentType={txtCT}
      editable={false}
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

function ButtonWTitleAnIconAColor({name,iname,clr,uponpress}) {
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

// function SubmitOrSaveButton(state){
//     return (
//     <ButtonWTitleAnIconAColor
//         name='Edit Survey    '
//         iname='pencil'
//         clr='green'
//         uponpress={uponpress}
//     />
//     );
// }

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