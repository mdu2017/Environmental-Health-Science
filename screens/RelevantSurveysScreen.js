import React from 'react';
import { StyleSheet, Image, Text, View, Button } from 'react-native';
import Touchable from 'react-native-platform-touchable';

export default class RelevantSurveyScreen extends React.Component {
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.optionSubheadingText}>Location-Relevant Surveys</Text>
                
                <View style={styles.optionIconContainer}>
                    <View style={styles.optionTextContainer}>
                        <Text style={styles.optionsTitleText}>General Information Survey</Text>
                        <Button
                            style={styles.optionSurveyButton}
                            title="To Survey"
                            onPress={() =>
                                this.props.navigation.navigate('GeneralSurvey')
                            }
                        />
                    </View>
                </View>
                
                <View style={styles.optionIconContainer}>
                    <View style={styles.optionTextContainer}>
                        <Text style={styles.optionsTitleText}>Drinking Water Survey</Text>
                        <Button
                            style={styles.optionSurveyButton}
                            title="To Survey"
                            onPress={() =>
                                this.props.navigation.navigate('GeneralSurvey')
                            }
                        />
                    </View>
                </View>

                <View style={styles.optionIconContainer}>
                    <View style={styles.optionTextContainer}>
                        <Text style={styles.optionsTitleText}>Sewage, Waste and Asbestos Survey</Text>
                        <Button
                            style={styles.optionSurveyButton}
                            title="To Survey"
                            onPress={() =>
                                this.props.navigation.navigate('GeneralSurvey')
                            }
                        />
                    </View>
                </View>
            </View>
            <View>
                <Button
                style={styles.optionButton}
                title="Back To Map"
                onPress={() =>
                    this.props.navigation.navigate('Map')
                }
                />

                <Button
                style={styles.optionButton}
                title="Back To Profile"
                onPress={() =>
                    this.props.navigation.navigate('Profile')
                }
                />
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 30,
      paddingBottom: 70,
    },
    optionsTitleText: {
      fontSize: 20,
      marginLeft: 25,
      marginTop: 10,
      marginBottom: 15,
      color: 'blue',
    },
    // optionTextContainer: {
    //     flex: 1,
    //     paddingTop: 30,
    // },
    optionIconContainer: {
      paddingTop: 15,
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
    optionSubheadingText: {
        textAlign: 'center',
        fontSize: 30,
        marginTop: 30,
        marginBottom: 15,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    optionButton: {
        fontSize: 15,
        paddingBottom: 20,
        paddingTop: 20,
        textAlign: 'center',
    },
    optionSurveyButton: {
        fontSize: 20,
        marginTop: 20,
        paddingTop: 20,
        textAlign: 'left',
        color: 'blue',
    },
  });