import Constants from 'expo-constants';
import React from 'react';
import { SectionList, Image, StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation-stack';
import { TouchableOpacity } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

// List of tabs on the settings screen
const list = [
  {
    title: 'Account',
    icon: 'account-circle'
  },
  {
    title: 'Pending Surveys',
    icon: 'timer'
  },
  {
    title: 'Completed Surveys',
    icon: 'check'
  },
]

export default class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      tabTitle: ''
    };
    this.onTabPress = this.onTabPress.bind(this);
  }

  // When tab is pressed go to corresponding page
  onTabPress(itemTitle){
    if(itemTitle == 'Account'){
      this.props.navigation.navigate('Profile');
    }
    else if(itemTitle == 'Pending Surveys'){
      this.props.navigation.navigate('PendingSurveys');
    }
    else if(itemTitle == 'Completed Surveys'){
      this.props.navigation.navigate('TakenSurveys');
    }
    else if(itemTitle == 'Info'){
      this.props.navigation.navigate('Info');
    }
    else if(itemTitle == 'Help'){
      this.props.navigation.navigate('Help');
    }
  }
  
  render() {
    return (
      <View>
        <View>
          <Text style={styles.accountName}>Joseph R. Smith</Text>
          <Text style={styles.accountInfo}>jsmith@gmail.com</Text>
        </View>
        <View>
          {
            list.map((item, i) => (    
                <ListItem
                  key={i}              
                  title={item.title}
                  leftIcon={{ name: item.icon }}
                  onPress={() => this.onTabPress(item.title)} //need this. OR else it won't work
                  bottomDivider
                  chevron
                />         
            ))
          }
        {/* <View style={styles.tabBarInfoContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('RelevantSurveys')} style={styles.helpLink}>
            <Text style={styles.tabBarInfoText}>Quick Survey</Text>
          </TouchableOpacity>
        </View> */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  accountName: {
    fontSize: 25,
    textAlign: 'right',
    color: 'rgba(0,120,120,0.8)',
    marginTop: '15%',
    paddingRight: '5%',
    width: '99%',
  },
  accountInfo: {
    fontSize: 18,
    textAlign: 'right',
    color: 'rgba(0,120,120,0.8)',
    marginTop: '2%',
    paddingRight: '5%',
    width: '99%',
  },
  welcomeTxt: {
    marginTop: 10,
    marginBottom: 25,
    marginHorizontal: 25,
    color: 'rgba(0,50,0,0.8)',
    fontSize: 20,
    lineHeight: 22,
    textAlign: 'center',
  },
  InstructionsText: {
    margin: 40,
    color: 'rgba(0,50,0,0.8)',
    fontSize: 20,
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
    marginTop: 50,
    marginLeft: -10,
  },
  orText: {
    margin: 40,
    color: 'rgba(0,50,0,0.8)',
    fontSize: 20,
    lineHeight: 22,
    textAlign: 'center',
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
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  signUpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  signUpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
