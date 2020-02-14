// import auth from '@react-native-firebase/auth';
// import { firebase } from '@react-native-firebase/auth'; 
// import React, { useState, useEffect } from 'react';
// import { View, Text } from 'react-native';

// const confirmation = await auth().signInWithPhoneNumber('+1 469-408-4550');
// try {
//     await confirmation.confirm('666666'); // User entered code
//     // Successful login - onAuthStateChanged is triggered
// } catch (e) {
//     console.error(e); // Invalid code
// } 

// firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       // Stop the login flow / Navigate to next page
//       console.log('User has logged in');
//     }
//   });

// function Authentication() {
//   // Set an initializing state whilst Firebase connects
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();
 
//   // Handle user state changes
//   function onAuthStateChanged(user) {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   }
 
//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);
 
//   if (initializing) return null;
 
//   if (!user) {
//     return (
//       <View>
//         <Text>Login</Text>
//       </View>
//     );
//   }
 
//   return (
//     <View>
//       <Text>Welcome {user.email}</Text>
//     </View>
//   );
// }