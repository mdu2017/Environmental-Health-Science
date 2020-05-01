import Constants from 'expo-constants';
import React from 'react';
import { SectionList, Image, StyleSheet, Text, View } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation-stack';
import { Touchable } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

export default class LocationScreen extends React.Component {
  static navigationOptions = {
    title: 'About',
};
  constructor(props) {
    super(props);
    this.state ={
    };
  }
  
  render() {
    return (
      <View>
        <Text style={styles.headingText}>Developers{'\n'} </Text>
        <Text style={styles.welcomeTxt}>Mark Du{'\n'}Schaeffer Duncan{'\n'}Matt Giles{'\n'}</Text>
        <Text style={styles.headingText}>Special Thanks{'\n'}</Text>
        <Text style={styles.welcomeTxt}>Dr. Matthew Fendt{'\n'}Dr. Benjamin Ryan{'\n'}</Text>
        <Button
          onPress={() => WebBrowser.openBrowserAsync('https://github.com/SchaefferDuncan/Environmental-Health-Science/blob/master/README.md')}
          iconRight
          title="Project Repository"
          style={styles.optionButton}
          />
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
// CSS Styling for login screen
const styles = StyleSheet.create({
  loginButton: {
    marginHorizontal: '25%',
    width: '50%',
  },
  headingText: {
    fontSize: 32,
    textAlign: 'center',
    color: 'rgba(0, 20, 115, 0.9)',
  },
  welcomeTxt: {
    marginTop: 10,
    color: 'rgba(0,50,0,0.8)',
    fontSize: 22,
    lineHeight: 22,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 75,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  signUpContainer: {
    marginTop: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  signUpLink: {
    color: 'rgba(10,0,200,0.7)',
    fontSize: 18,
    lineHeight: 20,
    textAlign: 'center',
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
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
  },
  sectionContentContainer: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 15,
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
  optionButton: {
    fontSize: 15,
    paddingBottom: 20,
    paddingTop: 20,
    textAlign: 'center',
    padding: 70
},
});
