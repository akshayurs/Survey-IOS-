import React, { useContext, useEffect, useState } from 'react'
import { Text, Button, View, Touchable } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthContext } from '../context/AuthContext'
import SplashScreen from '../screen/SplashScreen'
import MyTabScreen from '../screen/MyTabScreen'
import SignInScreen from '../screen/SignInScreen'
import DefaultScreen from '../screen/DefaultScreen'
import ForgotPasswordScreen from '../screen/ForgotPasswordScreen'
import SignUpScreen from '../screen/SignUpScreen'
import PersonalDetailsScreen from '../screen/PersonalDetailsScreen'
import ProfileSurvey1 from '../screen/ProfileSurvey1'
import ChangePasswordScreen from '../screen/ChangePasswordScreen'
import MyAccountScreen from '../screen/MyAccountScreen'
import CommunicationOptionScreen from '../screen/CommunicationOptionScreen'
import DeactivationConfirmation from '../screen/DeactivationConfirmation'
import UnsubscribeReason from '../screen/UnsubscribeReason'
import RewardHistory from '../screen/RewardHistory'
import PrivacyPolicyScreen from '../screen/PrivacyPolicyScreen'
import FAQs from '../screen/FAQs'
import TermsAndConditions from '../screen/TermsAndConditions'
import UpdateProfileScreen from '../screen/UpdateProfileScreen'
import EndOfProfileSurveyScreen from '../screen/EndOfProfileSurveyScreen'
import LoadingScreen from '../screen/LoadingScreen'
import ProfileSurvey2 from '../screen/ProfileSurvey2'
import AsyncStorage from '@react-native-async-storage/async-storage'
import OnboardingScreen from '../screen/OnBoardingScreen'
import { TouchableOpacity } from 'react-native-web'
import Icon from 'react-native-vector-icons/FontAwesome'
import WebViewScreen from '../screen/WebViewScreen'
import ProfileSurvey3 from '../screen/ProfileSurvey3'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const { userInfo, splashLoading } = useContext(AuthContext)

  const [isFirstLaunch, setIsFirstTimeLaunch] = useState(null)

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true')
        setIsFirstTimeLaunch(true)
      } else {
        setIsFirstTimeLaunch(false)
      }
    })
  }, [])

  return (
    <>
      {splashLoading ? (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Loading Screen"
              component={LoadingScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : userInfo.Result ? (
        <NavigationContainer>
          <Stack.Navigator
          // screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="Home"
              component={MyTabScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Communication Option Screen"
              component={CommunicationOptionScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#378C3C',
                },
                title: 'Communication Options',
                headerTintColor: 'black',
                headerTitleStyle: {
                  color: 'white',
                },
              }}
              headerLeft={
                <Icon name="angle-right" color="#fff" size={25}></Icon>
              }
            />
            <Stack.Screen
              name="Deactivation Confirmation Screen"
              component={DeactivationConfirmation}
              options={{
                headerStyle: {
                  backgroundColor: '#378C3C',
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
            <Stack.Screen
              name="Unsubscribe Reason Screen"
              component={UnsubscribeReason}
              options={{
                headerStyle: {
                  backgroundColor: '#378C3C',
                },
                title: 'Unsubscribe Reason',
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
            <Stack.Screen
              name="Reward History"
              component={RewardHistory}
              options={{
                headerStyle: {
                  backgroundColor: '#378C3C',
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
            <Stack.Screen
              name="Change Password"
              component={ChangePasswordScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#378C3C',
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
            <Stack.Screen
              name="Privacy Policy Screen"
              component={PrivacyPolicyScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#378C3C',
                },
                title: 'Privacy Policy',
                headerTintColor: 'black',
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
            <Stack.Screen
              name="FAQs Screen"
              component={FAQs}
              options={{
                headerStyle: {
                  backgroundColor: '#378C3C',
                },
                title: 'FAQs',
                headerTintColor: 'black',
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
            <Stack.Screen
              name="Terms And Conditions Screen"
              component={TermsAndConditions}
              options={{
                headerStyle: {
                  backgroundColor: '#378C3C',
                },
                title: 'Terms And Conditions',
                headerTintColor: 'black',
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
            <Stack.Screen
              name="Update Profile Screen"
              component={UpdateProfileScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#378C3C',
                },
                title: 'Update Profile',
                headerTintColor: 'black',
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
            <Stack.Screen
              name="User Profile Survey"
              component={ProfileSurvey3}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile Survey"
              component={ProfileSurvey1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="End Of Profile Survey Screen"
              component={EndOfProfileSurveyScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Update Profile Survey"
              component={ProfileSurvey2}
              options={{
                headerStyle: {
                  backgroundColor: '#378C3C',
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
            <Stack.Screen
              name="Web View"
              component={WebViewScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#378C3C',
                },
                title: 'Survey',
                headerTintColor: 'black',
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Defualt Screen"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Sign In Screen"
              component={SignInScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Forgot Password Screen"
              component={ForgotPasswordScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Sign Up Screen"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Personal Details Screen"
              component={PersonalDetailsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile Survey"
              component={ProfileSurvey1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="User Profile Survey"
              component={ProfileSurvey3}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Change Password"
              component={ChangePasswordScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#378C3C',
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
            <Stack.Screen
              name="My Account Screen"
              component={MyAccountScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Terms And Conditions Screen"
              component={TermsAndConditions}
              options={{
                headerStyle: {
                  backgroundColor: '#378C3C',
                },
                title: 'Terms And Conditions',
                headerTintColor: 'black',
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
            <Stack.Screen
              name="Home"
              component={MyTabScreen}
              // screenOptions={{ headerShown: false }}
            />

            <Stack.Screen
              name="Update Profile Screen"
              component={UpdateProfileScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#378C3C',
                },
                title: 'Update Profile',
                headerTintColor: 'black',
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
            <Stack.Screen
              name="Communication Option Screen"
              component={CommunicationOptionScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#378C3C',
                },
                title: 'Communication Options',
                headerTintColor: 'black',
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
            <Stack.Screen
              name="Deactivation Confirmation Screen"
              component={DeactivationConfirmation}
              options={{
                headerStyle: {
                  backgroundColor: '#378C3C',
                },
                title: 'Deactivate Confirmation',
                headerTintColor: 'black',
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
            <Stack.Screen
              name="Unsubscribe Reason Screen"
              component={UnsubscribeReason}
              options={{
                headerStyle: {
                  backgroundColor: '#378C3C',
                },
                title: 'Unsubscribe Reason',
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
            <Stack.Screen
              name="Reward History"
              component={RewardHistory}
              options={{
                headerStyle: {
                  backgroundColor: '#378C3C',
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
            <Stack.Screen
              name="Privacy Policy Screen"
              component={PrivacyPolicyScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#378C3C',
                },
                title: 'Privacy Policy',
                headerTintColor: 'black',
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
            <Stack.Screen
              name="FAQs Screen"
              component={FAQs}
              options={{
                headerStyle: {
                  backgroundColor: '#378C3C',
                },
                title: 'FAQs',
                headerTintColor: 'black',
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
            <Stack.Screen
              name="Update Profile"
              component={UpdateProfileScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#378C3C',
                },
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
            <Stack.Screen
              name="End Of Profile Survey Screen"
              component={EndOfProfileSurveyScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Update Profile Survey"
              component={ProfileSurvey2}
              options={{
                headerStyle: {
                  backgroundColor: '#378C3C',
                },
                headerTitleStyle: {
                  color: 'white',
                },
              }}
            />
            {/* <Stack.Screen
              name="User Profile Survey"
              component={ProfileSurvey3}
              options={{headerStyle: {
                backgroundColor: '#378C3C'
              },
              title: 'User Profile Survey',
              headerTitleStyle: {
                color: 'white'
              }
              }}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  )
}

export default Navigation
