import React, { useContext, useState, useEffect } from 'react'
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
  Animated,
  Easing,
  Button,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { RadioButton } from 'react-native-paper'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Dropdown } from 'react-native-element-dropdown'
import axios from 'axios'
import { useTheme } from 'react-native-paper'
import { BASE_URL } from '../config'
import { AuthContext } from '../context/AuthContext'
import KeyboardAvoidingWrapper from '../component/KeyboardAvoidingWrapper'
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
const spinValue = new Animated.Value(0)
export default function PersonalDetailsScreen({ navigation }) {
  const {
    regCre,
    panelist_basic_details,
    update_profile,
    panelistBasicDetails_func,
  } = useContext(AuthContext)
  // console.log(userInfo.Result.countryID)
  // console.log(userInfo.Result.panelistID)
  // const [data, setData] = useState([])
  console.log(regCre)
  console.log(panelist_basic_details && panelist_basic_details)
  React.useEffect(() => {
    panelistBasicDetails_func(regCre.results && regCre.results.panelistID)
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()
  }, [])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })
  const { colors } = useTheme()
  const [state, setState] = useState(null)
  console.log(panelist_basic_details && panelist_basic_details)
  const [state_, setState_data] = useState(null)
  const [state_code, setState_code] = useState(null)
  const [city, setCity] = useState(null)
  const [city_to_api, setCityToAPI] = useState(null)
  const [state_to_api, setStateToAPI] = useState(null)
  useEffect(() => {
    fetchState()
  }, [panelist_basic_details])
  useEffect(() => {
    if (state_code != 0) {
      fetchCity()
    }
  }, [state_code])
  useEffect(() => {
    console.log(state_)
  }, [state_])
  const fetchState = async () => {
    const response = await axios(
      `${BASE_URL}/getStateList/${parseInt(
        panelist_basic_details.Results.countryID
      )}`
    )
    setState_data(response.data)
  }

  const fetchCity = async () => {
    const response = await axios(
      `${BASE_URL}/getCityList/${
        state_code && state_code.value ? state_code.value : 0
      }`
    )
    setCity(response.data)
  }

  let state_data = []
  console.log(state_data)
  if (state_ && state_.status == 'success') {
    let len = Object.values(state_.result).length
    for (let i = 0; i < len; i++) {
      let obj = {
        label: Object.values(state_.result)[i].name,
        value: Object.values(state_.result)[i].id,
      }
      // data.push(obj)
      state_data.push(obj)
    }
    console.log(state_data)
  }
  console.log(state_)

  console.log(city)

  let city_data = []
  console.log(city_data)
  if (city && city.message != 'Cities are not found!') {
    let len = Object.values(city.result).length
    for (let i = 0; i < len; i++) {
      let obj = {
        label: Object.values(city.result)[i].name,
        value: Object.values(city.result)[i].id,
      }
      // data.push(obj)
      city_data.push(obj)
    }
    // console.log(data)
  }

  console.log(
    state_code && state_code.value
      ? state_code.value + ' <- state code'
      : ' no state_code'
  )

  const [firstName, setFirstName] = useState(
    panelist_basic_details && panelist_basic_details.Results.firstname
  )
  const [lastName, setLastName] = useState(
    panelist_basic_details && panelist_basic_details.Results.lastname
  )

  // date state
  const [date, setDate] = useState(null)

  const [checked, setChecked] = React.useState('')
  const [address1, setAddress1] = useState(null)
  const [address2, setAddress2] = useState(null)
  const [chooseState, setChooseState] = useState(null)
  const [chooseCity, setChooseCity] = useState(null)
  const [country, setCountry] = useState(null)
  const [zipcode, setZipcode] = useState(null)
  const [phone, setPhone] = useState(null)

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }
  const [datestr, strdatestr] = useState('Date of birth')
  let datestring = 'Date of Birth'
  const handleConfirm = (date) => {
    console.log(date)

    setDate(date)
    datestring =
      date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
    console.log(datestring)
    strdatestr(datestring)
    console.log(date)
    hideDatePicker()
  }

  const [value, setValue] = useState(null)
  const [value2, setValue2] = useState(null)
  const [isFocus, setIsFocus] = useState(false)
  const [isFocus2, setIsFocus2] = useState(false)

  const renderLabel = () => {
    if (value || isFocus) {
      return <Text style={[styles.label, isFocus && { color: 'blue' }]}></Text>
    }
    return null
  }

  const [value_, setValue_] = useState(null)
  const [isFocus_, setIsFocus_] = useState(false)

  const renderLabel_ = () => {
    if (value_ || isFocus_) {
      return <Text style={[styles.label, isFocus && { color: 'blue' }]}></Text>
    }
    return null
  }

  return (
    <KeyboardAvoidingWrapper>
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
        <Text
          style={{
            color: '#000000',
            marginTop: normalize(5),
            fontWeight: 'bold',
            fontSize: normalize(20),
          }}
        >
          Good Afternoon,{' '}
          {panelist_basic_details && panelist_basic_details.Results.firstname}
        </Text>
        <Text
          style={{
            color: '#378C3C',
            marginTop: normalize(5),
            fontSize: normalize(17),
          }}
        >
          Personal Details
        </Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 0,
          }}
        >
          <Image
            style={styles.stretch}
            source={require('../assets/logo_remove_bg.png')}
          />
          <View
            style={{
              paddingLeft: normalize(10),
              backgroundColor: 'rgb(235 235 25)',
              marginTop: -55,
            }}
          >
            <Text style={[styles.label, { fontSize: normalize(15) }]}>
              SOID:{' '}
              {panelist_basic_details && panelist_basic_details.Results.SOUID}
              {'\n'}Profile Completion:{' '}
              {panelist_basic_details &&
                panelist_basic_details.Results.profilePercentage}
              %{'\n'}Email:{' '}
              {panelist_basic_details && panelist_basic_details.Results.email}
            </Text>
          </View>
        </View>

        <View style={[styles.action, { backgroundColor: '#ffffff' }]}>
          <TextInput
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            // onChangeText={(val) => setFirstName(panelist_basic_details && panelist_basic_details.Results.firstname)}
            value={
              panelist_basic_details && panelist_basic_details.Results.firstname
            }
          />
        </View>

        <View style={[styles.action, { backgroundColor: '#ffffff' }]}>
          <TextInput
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            // onChangeText={(val) => setLastName(panelist_basic_details && panelist_basic_details.Results.lastname)}
            value={
              panelist_basic_details && panelist_basic_details.Results.lastname
            }
          />
        </View>

        <View
          style={{
            backgroundColor: '#ffffff',
            marginTop: normalize(10),
            minHeight: 40,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: normalize(10),
            paddingLeft: 3,
            paddingRight: 3,
          }}
        >
          <TouchableOpacity onPress={showDatePicker}>
            <View>
              <Text style={{ paddingLeft: 4 }}>{datestr}</Text>
              {/* <Image source={require('../assets/date.png')} size={{height: 10, width: 10}}/>  */}
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            // onChange={(event, date) => handleConfirm(date)}
            onCancel={hideDatePicker}
          />
        </View>

        <View style={[styles.action]}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={[
                styles.textInput,
                {
                  color: colors.text,
                  flex: 0.4,
                },
              ]}
            >
              Gender
            </Text>
            <View
              style={{ flexDirection: 'row', flex: 0.6, alignItems: 'center' }}
            >
              <RadioButton
                value="first"
                label="Male"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                buttonTextActiveStyle={{ color: '#378C3C' }}
                onPress={() => setChecked('first')}
              />
              <Text>Male</Text>
              <RadioButton
                value="second"
                label="Female"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('second')}
              />
              <Text>Female</Text>
            </View>
          </View>
        </View>

        <View style={[styles.action, { backgroundColor: '#ffffff' }]}>
          <TextInput
            placeholder="Address 1"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => setAddress1(val)}
          />
        </View>

        <View style={[styles.action, { backgroundColor: '#ffffff' }]}>
          <TextInput
            placeholder="Address 2"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => setAddress2(val)}
          />
        </View>
        <View style={[styles.action, { backgroundColor: '#ffffff' }]}>
          {renderLabel()}
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={state_data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select state' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value)
              setIsFocus(false)
              console.log(item)
              console.log(item.value)
              setStateToAPI(item.label)
              setState_code(item)
            }}
          />
        </View>

        {city && city.message != 'Cities are not found!' ? (
          <View style={[styles.action, { backgroundColor: '#ffffff' }]}>
            {renderLabel_()}
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={city_data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus2 ? 'Select City' : '...'}
              searchPlaceholder="Search..."
              value={value2}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue_(item.value)
                setValue2(item.value)
                // setIsFocus_(false);
                setIsFocus2(false)
                setCityToAPI(item.label)
              }}
            />
          </View>
        ) : (
          <View style={[styles.action, { backgroundColor: '#ffffff' }]}>
            <TextInput
              placeholder="City"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => {
                setCityToAPI(val)
                setValue_(val)
              }}
            />
          </View>
        )}

        <View style={[styles.action, { backgroundColor: '#ffffff' }]}>
          <TextInput
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            editable={false}
            onChangeText={(val) =>
              setCountry(
                panelist_basic_details &&
                  panelist_basic_details.Results.countryName
              )
            }
            value={
              panelist_basic_details &&
              panelist_basic_details.Results.countryName
            }
          />
        </View>

        <View style={[styles.action, { justifyContent: 'space-between' }]}>
          <View
            style={[styles.action, { backgroundColor: '#ffffff', flex: 0.48 }]}
          >
            <TextInput
              placeholder="ZIP Code"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => setZipcode(val)}
            />
          </View>
          <View
            style={[styles.action, { backgroundColor: '#ffffff', flex: 0.48 }]}
          >
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => setPhone(val)}
            />
          </View>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              console.log(firstName)
              console.log(lastName)
              console.log(date)
              console.log(checked)
              console.log(address1)
              console.log(address2)
              console.log(city_to_api)
              console.log(state_to_api)
              console.log(country)
              console.log(zipcode)
              if (
                panelist_basic_details &&
                panelist_basic_details.Results.firstname != null &&
                panelist_basic_details &&
                panelist_basic_details.Results.lastname != null &&
                date != null &&
                checked != null &&
                address1 != null &&
                address2 != null &&
                city_to_api != null &&
                state_to_api != null &&
                zipcode != null
              ) {
                let res = update_profile(
                  panelist_basic_details &&
                    panelist_basic_details.Results.firstname,
                  panelist_basic_details &&
                    panelist_basic_details.Results.lastname,
                  date,
                  checked == 'first' ? 1 : 2,
                  address1,
                  address2,
                  city_to_api,
                  state_to_api,
                  panelist_basic_details.Results.countryID,
                  zipcode,
                  phone,
                  1,
                  navigation
                )
                console.log(res)
              } else {
                alert('Please fill all the entries. Phone number is optional')
              }
            }}
            style={[
              styles.signIn,
              {
                backgroundColor: '#378C3C',
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: '#fff',
                },
              ]}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
    </KeyboardAvoidingWrapper>

  )
}

const styles = StyleSheet.create({
  dropdown: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'rgb(235 235 235)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  stretch: {
    width: SCREEN_WIDTH * 0.2,
    height: SCREEN_WIDTH * 0.2,
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
    paddingVertical: 30,
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
    marginTop: normalize(10),
    minHeight: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(10),
    paddingLeft: 3,
    paddingRight: 3,
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
    marginTop: normalize(10),
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
