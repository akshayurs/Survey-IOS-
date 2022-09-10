import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  PixelRatio,
  ScrollView,
} from 'react-native'
import { Avatar } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import facebook from '../assets/facebook.png'
import google from '../assets/google.png'

import { useTheme } from 'react-native-paper'
var { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const scale = SCREEN_WIDTH / 320
console.log(SCREEN_HEIGHT)
console.log(SCREEN_WIDTH)
export function normalize(size) {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

export default function DeactivationConfirmation({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Animatable.View
          animation="fadeInUpBig"
          style={[
            styles.footer,
            {
              backgroundColor: 'rgb(235 235 235)',
            },
          ]}
        >
          <View
            style={[
              styles.action,
              { backgroundColor: '#ffffff', paddingLeft: 20 },
            ]}
          >
            <Text
              style={{
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: normalize(20),
                marginTop: 5,
              }}
            >
              Are you sure?
            </Text>
            <Text
              style={{
                fontSize: normalize(13),
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              After cancellation of your SurveyOptimus account, you will no
              longer be able to take part in survey, Spinners, access your
              account information. All your points will be erased and any
              rewards request will be cancelled.
            </Text>
            <Text
              style={{
                fontSize: normalize(13),
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              Please follow the below steps to Delete Account.
            </Text>
            <Text style={{ fontSize: normalize(13), marginTop: 5 }}>
              1. Login to your account on web browser.
            </Text>
            <Text style={{ fontSize: normalize(13), marginTop: 2 }}>
              2. GOTO "My Account".
            </Text>
            <Text style={{ fontSize: normalize(13), marginTop: 2 }}>
              3. Click on "Manage Account".
            </Text>
            <Text style={{ fontSize: normalize(13), marginTop: 2 }}>
              4. Click on "Click to Deactivate" button under Deactivate Account.
            </Text>
            <Text style={{ fontSize: normalize(13), marginTop: 2 }}>
              5. Share FeedBack.
            </Text>
            <Text style={{ fontSize: normalize(13), marginTop: 2 }}>
              6. Click "Yes, Deactivate" button.
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={{
                width: '50%',
                height: 40,
                backgroundColor: '#378C3C',
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.goBack()
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    // alignItems:'center',
    // justifyContent:'center',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  stretch: {
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_WIDTH * 0.5,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 1,
    backgroundColor: 'rgb(235 235 235)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    marginTop: normalize(5),
    borderRadius: normalize(10),
    padding: 10,
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    shadowRadius: 2,
    shadowOpacity: 1,
    marginTop: normalize(15),
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    height: normalize(20),
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: normalize(18),
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
