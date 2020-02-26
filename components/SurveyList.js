// import Constants from 'expo-constants';
// import React from 'react';
// import { SectionList, Image, StyleSheet, Text, View } from 'react-native';
// import { ListItem } from 'react-native-elements';
// import { createStackNavigator } from 'react-navigation-stack';
// import {Touchable} from 'react-native';
// import { TouchableHighlight } from 'react-native-gesture-handler';

// // List of tabs on the settings screen
// const list = [
//   {
//     title: 'General Survey 1',
//   },
//   {
//     title: 'Specific Survey 2',
//   },
// ]

// export default class SurveyList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state ={
//       tabTitle: ''
//     };
//   }
  
//   render() {
//     return (
//       <View>
//       {
//         list.map((item, i) => (    
//             <ListItem
//               key={i}              
//               title={item.title}
//               leftIcon={{ name: item.icon }}
//               onPress={() => this.props.navigation.navigate('GeneralSurvey')} //need this. OR else it won't work
//               bottomDivider
//               chevron
//             />         
//         ))
//       }
//       </View>
//     );
//   }

//   _renderSectionHeader = ({ section }) => {
//     return <SectionHeader title={section.title} />;
//   };

//   _renderItem = ({ item }) => {
//     if (item.type === 'color') {
//       return <SectionContent>{item.value && <Color value={item.value} />}</SectionContent>;
//     } else {
//       return (
//         <SectionContent>
//           <Text style={styles.sectionContentText}>{item.value}</Text>
//         </SectionContent>
//       );
//     }
//   };
// }

// const SectionHeader = ({ title }) => {
//   return (
//     <View style={styles.sectionHeaderContainer}>
//       <Text style={styles.sectionHeaderText}>{title}</Text>
//     </View>
//   );
// };

// const SectionContent = props => {
//   return <View style={styles.sectionContentContainer}>{props.children}</View>;
// };


// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   titleContainer: {
//     paddingHorizontal: 15,
//     paddingTop: 15,
//     paddingBottom: 15,
//     flexDirection: 'row',
//   },
//   titleIconContainer: {
//     marginRight: 15,
//     paddingTop: 2,
//   },
//   sectionHeaderContainer: {
//     backgroundColor: '#fbfbfb',
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderWidth: StyleSheet.hairlineWidth,
//     borderColor: '#ededed',
//   },
//   sectionHeaderText: {
//     fontSize: 14,
//   },
//   sectionContentContainer: {
//     paddingTop: 8,
//     paddingBottom: 12,
//     paddingHorizontal: 15,
//   },
//   sectionContentText: {
//     color: '#808080',
//     fontSize: 14,
//   },
//   nameText: {
//     fontWeight: '600',
//     fontSize: 18,
//   },
//   slugText: {
//     color: '#a39f9f',
//     fontSize: 14,
//     backgroundColor: 'transparent',
//   },
//   descriptionText: {
//     fontSize: 14,
//     marginTop: 6,
//     color: '#4d4d4d',
//   },
//   colorContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   colorPreview: {
//     width: 17,
//     height: 17,
//     borderRadius: 2,
//     marginRight: 6,
//     borderWidth: StyleSheet.hairlineWidth,
//     borderColor: '#ccc',
//   },
//   colorTextContainer: {
//     flex: 1,
//   },
// });