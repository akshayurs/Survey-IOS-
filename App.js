// import { StatusBar } from 'expo-status-bar';
import React, {useContext} from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SignInScreen from './screen/SignInScreen';
// import DefaultScreen from './screen/DefaultScreen';
// import ForgotPasswordScreen from './screen/ForgotPasswordScreen';
// import SignUpScreen from './screen/SignUpScreen';
// import PresonalDetailsScreen from './screen/PresonalDetailsScreen';
// import ProfileSurvey1 from './screen/ProfileSurvey1';
// import ProfileSurvey2 from './screen/ProfileSurvey2';
// import ProfileSurvey3 from './screen/ProfileSurvey3';
// import EndOfProfileSurveyScreen from './screen/EndOfProfileSurveyScreen';
// import DashboardScreen from './screen/DashboardScreen';
// import SurveyEndPages from './screen/SurveyEndPages';
// import MyAccountScreen from './screen/MyAccountScreen';
// import UpdateProfileScreen from './screen/UpdateProfileScreen';
// import ChangePasswordScreen from './screen/ChangePasswordScreen';
// import CommunicationOptionScreen from './screen/CommunicationOptionScreen';
// import UnsubscribeReason from './screen/UnsubscribeReason';
// import DeactivationConfirmation from './screen/DeactivationConfirmation';
// import ReferFriendToFollow from './screen/ReferFriendToFollow';
// import PrivacyPolicyScreen from './screen/PrivacyPolicyScreen';
// import TermsAndConditions from './screen/TermsAndConditions';
// import FAQs from './screen/FAQs';
// import SpinnerScreen from './screen/SpinnerScreen';
// import BestPracticeScreen from './screen/BestPracticeScreen';
// import RewardScreen from './screen/RewardScreen';
// import RewardHistory from './screen/RewardHistory';
// import UserActivityScreen from './screen/UserActivitScreen';
// import LoadingScreen from './screen/LoadingScreen';
// import SpinnerEndPages from './screen/SpinnerEndPages';
import Navigation from './component/Navigation';
// import { AuthContext } from './context/AuthContext';
// import SplashScreen from './screen/SplashScreen';

// My Screen Tab
// import MyTabScreen from './screen/MyTabScreen';

import { AuthProvider } from './context/AuthContext';
// import DashboardScreen from './screen/DashboardScreen';
// import SpinnerScreen from './screen/SpinnerScreen';
// import RewardScreen from './screen/RewardScreen';
// import RewardHistory from './screen/RewardHistory';
// import DefaultScreen from './screen/DefaultScreen'
// import UserActivityScreen from './screen/UserActivitScreen';
// import MyAccountScreen from './screen/MyAccountScreen';
// import UpdateProfileScreen from './screen/UpdateProfileScreen';
// import ChangePasswordScreen from './screen/ChangePasswordScreen';
// import CommunicationOptionScreen from './screen/CommunicationOptionScreen';
// import UnsubscribeReason from './screen/UnsubscribeReason';
// import PrivacyPolicyScreen from './screen/PrivacyPolicyScreen';
// import DefaultScreen from './screen/DefaultScreen';
// import SignUpScreen from './screen/SignUpScreen';
// import ForgotPasswordScreen from './screen/ForgotPasswordScreen';
import ProfileSurvey1 from './screen/ProfileSurvey1';
// import ProfileSurvey2 from './screen/ProfileSurvey2';
// import OnboardingScreen from './screen/OnBoardingScreen';
// import LoadingScreen from './screen/LoadingScreen';
import EndOfProfileSurveyScreen from './screen/EndOfProfileSurveyScreen';
import ProfileSurvey3 from './screen/ProfileSurvey3';
//testing fonts
// import fontTest from './screen/FontTest';

const Stack = createNativeStackNavigator();
 
export default function App({ navigation }) {
  return (
    <AuthProvider>
      <Navigation></Navigation>
      {/* <SignInScreen></SignInScreen> */}
    </AuthProvider>
    // <Text>hi how are you i am fine</Text>
  );
}


// export default function App({ navigation }) {
//   // const {userInfo, splashLoading} = useContext(AuthContext);
//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
//           <Stack.Screen name="Home" component={ProfileSurvey3 } />
//           <Stack.Screen name="End Of Profile Survey Screen" component={EndOfProfileSurveyScreen } />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </AuthProvider>
//   );
// }
