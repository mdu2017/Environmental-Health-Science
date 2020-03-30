import Constants from 'expo-constants';
import React from 'react';
import { SectionList, Image, StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation-stack';
import { Touchable } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ToggleSwitch from 'toggle-switch-react-native';

export default class LocationScreen extends React.Component {
    static navigationOptions = {
        title: 'Location Settings',
    };
  constructor(props) {
    super(props);
    this.state ={
      tabTitle: '',
      locationOn: false
    };
  }
  
  render() {
    return (
      <View>
        <View style={styles.explanationStyle}>
          <ToggleSwitch
                isOn={this.state.locationOn}
                onColor='green'
                offColor='gray'
                label='Location Services'
                labelStyle={styles.nameText}
                size='medium'
                onToggle={() => this.setState({ locationOn: !this.state.locationOn })}
                style={styles.sectionHeaderText}
            />
            <View style={styles.explanationStyle}>
                { !this.state.locationOn &&
                    <ExplanationText />
                }
            </View>
        </View>
      </View>
    );
  }

  _renderSectionHeader = ({ section }) => {
    return <SectionHeader title={section.title} />;
  };

  _renderItem = ({ item }) => {
    if (item.type === 'color') {
      return <SectionContent>{item.value && <Color value={item.value} />}</SectionContent>;
    } else {
      return (
        <SectionContent>
          <Text style={styles.sectionContentText}>{item.value}</Text>
        </SectionContent>
      );
    }
  };
}

const ListHeader = () => {
  const { manifest } = Constants;

  return (
    <View style={styles.titleContainer}>
      <View style={styles.titleIconContainer}>
        <AppIconPreview iconUrl={manifest.iconUrl} />
      </View>

      <View style={styles.titleTextContainer}>
        <Text style={styles.nameText} numberOfLines={1}>
          {manifest.name}
        </Text>

        <Text style={styles.slugText} numberOfLines={1}>
          {manifest.slug}
        </Text>

        <Text style={styles.descriptionText}>{manifest.description}</Text>
      </View>
    </View>
  );
};

// Explanation text describing the settings option
function ExplanationText(){
    return (
      <Text style={styles.InstructionsText}>
        Location information is used to triangulate the user to allow ease of access. 
        However, if the location services are turned off, the user will still be able 
        to search for pertinent surveys on the Map page.
      </Text>
    )
  }

const SectionHeader = ({ title }) => {
  return (
    <View style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );
};

const SectionContent = props => {
  return <View style={styles.sectionContentContainer}>{props.children}</View>;
};

const AppIconPreview = ({ iconUrl }) => {
  if (!iconUrl) {
    iconUrl = 'https://s3.amazonaws.com/exp-brand-assets/ExponentEmptyManifest_192.png';
  }

  return <Image source={{ uri: iconUrl }} style={{ width: 64, height: 64 }} resizeMode="cover" />;
};

const Color = ({ value }) => {
  if (!value) {
    return <View />;
  } else {
    return (
      <View style={styles.colorContainer}>
        <View style={[styles.colorPreview, { backgroundColor: value }]} />
        <View style={styles.colorTextContainer}>
          <Text style={styles.sectionContentText}>{value}</Text>
        </View>
      </View>
    );
  }
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
  },
  titleIconContainer: {
    marginRight: 15,
    paddingTop: 2,
  },
  sectionHeaderContainer: {
    backgroundColor: '#fbfbfb',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ededed',
  },
  sectionHeaderText: {
    fontSize: 14,
    marginTop: 20,
  },
  sectionContentContainer: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 15,
  },
  explanationStyle: {
    margin: 20,
  },
  sectionContentText: {
    color: '#808080',
    fontSize: 14,
  },
  nameText: {
    fontWeight: '600',
    fontSize: 18,
  },
  slugText: {
    color: '#a39f9f',
    fontSize: 14,
    backgroundColor: 'transparent',
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 10,
    color: '#4d4d4d',
    textAlign: 'center',
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorPreview: {
    width: 17,
    height: 17,
    borderRadius: 2,
    marginRight: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  colorTextContainer: {
    flex: 1,
  },
});