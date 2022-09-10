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
  ScrollView,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome'
import { RadioButton } from 'react-native-paper'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { BASE_URL } from '../config'
import axios from 'axios'
import Modal from 'react-native-modal'
import { useTheme } from 'react-native-paper'
import { AuthContext } from '../context/AuthContext'
import { Dropdown } from 'react-native-element-dropdown'
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
function changeFormat(date) {
  let arr = date.split('-')
  return `${arr[2]}-${arr[1]}-${arr[0]}`
}
export default function UpdateProfileScreen({ navigation }) {
  const {
    userInfo,
    panelist_basic_details,
    panelistBasicDetails_func,
    update_profile,
    avatar_set,
  } = useContext(AuthContext)
  const [comments, setComments] = useState(null)
  const fetchState = async () => {
    const response = await axios(
      `${BASE_URL}/getStateList/${parseInt(
        panelist_basic_details.Results.countryID
      )}`
    )
    setState_data(response.data)
  }
  const [state_, setState_data] = useState(null)
  const [state_code, setState_code] = useState(null)
  const [city_to_api, setCityToAPI] = useState(null)
  const [state_to_api, setStateToAPI] = useState(null)
  const { colors } = useTheme()
  const [city1, setCity1] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [zip, setZipcode] = useState('')
  const [phone, setPhone] = useState('')
  const [add1, setAdd1] = useState('')
  const [add2, setAdd2] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState(
    comments && comments.Results.firstname
  )
  const [lastName, setLastName] = useState('')
  const [isSelected, setSelection] = useState(false)
  const [value, setValue] = useState(null)
  const [value2, setValue2] = useState(null)
  const [isFocus, setIsFocus] = useState(false)
  const [isFocus2, setIsFocus2] = useState(false)
  const [city, setCity] = useState(null)
  const fetchCity = async () => {
    const response = await axios(
      `${BASE_URL}/getCityList/${
        state_code && state_code.value ? state_code.value : 0
      }`
    )
    setCity(response.data)
  }
  useEffect(() => {
    if (state_code != 0) {
      fetchCity()
    }
  }, [state_code])
  useEffect(() => {
    fetchComments()
    fetchState()
  }, [])
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
  if (value == null && state_data.length > 0) {
    let val = state_data.find(
      (obj) =>
        obj.label.trim().toLocaleLowerCase() ==
        state?.trim().toLocaleLowerCase()
    )
    if (val) {
      setValue(val.value)
      setState_code(val.value)
      setStateToAPI(val.label)
      setState_code(val)
    }
  }

  let city_data = []
  if (city && city.message != 'Cities are not found!') {
    let len = Object.values(city.result).length
    for (let i = 0; i < len; i++) {
      let obj = {
        label: Object.values(city.result)[i].name,
        value: Object.values(city.result)[i].id,
      }
      if (
        value2 == null &&
        obj.label.trim().toLocaleLowerCase() ==
          city1?.trim().toLocaleLowerCase()
      ) {
        setValue2(obj.value)
      }
      // console.log()
      // data.push(obj)
      city_data.push(obj)
    }
    // console.log(data)
  }

  const fetchComments = async () => {
    const response = await axios(
      `${BASE_URL}/getBasicProfiling/${parseInt(userInfo.Result.panelistID)}`
    )
    setComments(response.data)
    setCity1(response.data.Results.city)
    strdatestr(changeFormat(response.data.Results.dob))
    setDate(response.data.Results.dob)
    setState(response.data.Results.state)
    setCountry(response.data.Results.countryName)
    setZipcode(response.data.Results.zipcode)
    setPhone(response.data.Results.phone)
    setAdd1(response.data.Results.address1)
    setAdd2(response.data.Results.address2)
    setEmail(response.data.Results.email)
    setFirstName(response.data.Results.firstname)
    setLastName(response.data.Results.lastname)
    setChecked(response.data.Results.gender === 1 ? 'first' : 'second')
  }

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
  console.log(comments && comments.Results.gender)
  console.log(checked)
  if (comments && comments.Results.gender == 1) {
    console.log('here fond gender')
  }
  const [checked, setChecked] = useState(null)
  // let def_date = null
  // const date_default_selected = (date) => {
  //     console.log(date)

  //     def_date = date.getDate()  + "-" + (date.getMonth()+1) + "-" + date.getFullYear()
  //     console.log(def_date)
  // }
  // console.log(def_date)
  if (comments && comments.Results.dob) {
    // date_default_selected(comments.Results.dob)
  }
  const [date, setDate] = useState(null)
  const [displaymode, setMode] = useState('date')
  const [isDisplayDate, setShow] = useState(false)
  const changeSelectedDate = (event, selectedDate) => {
    const currentDate = selectedDate || mydate
    setDate(currentDate)
  }
  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }
  const displayDatepicker = () => {
    showMode('date')
  }
  const [mydate, setMydate] = useState()

  console.log(comments)

  const [isModalVisible, setModalVisible] = useState(false)
  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const [avatar, setAvatar] = useState(null)
  const [avatarLink, setAvatarLink] = useState(null)
  useEffect(() => {
    fetchAvatar()
  }, [])
  useEffect(() => {
    console.log(avatar)
  }, [avatar])
  const fetchAvatar = async () => {
    const response = await axios(`${BASE_URL}/getAvatar`)
    setAvatar(response.data)
  }

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }
  const [datestr, strdatestr] = useState(null)
  // let datestring = "Date of Birth"
  // if(comments && comments.Results.dob){
  //     strdatestr(comments && comments.Results.dob)
  // }
  const handleConfirm = (date) => {
    console.log(`date`)
    console.log(date)
    datestring =
      date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
    strdatestr(datestring)
    setDate(date)
    hideDatePicker()
  }
  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  return (
    <KeyboardAvoidingWrapper>
    <ScrollView>
      <View style={styles.container}>
        <Animatable.View
          animation="fadeInUpBig"
          style={[
            styles.footer,
            {
              backgroundColor: '#f0f0f0',
            },
          ]}
        >
          <Text style={{ fontSize: normalize(20), color: '#378C3C' }}>
            Personal Details
          </Text>
          {comments && comments.Results ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 0,
              }}
            >
              <View style={{ alignItems: 'center' }}>
                {comments.Results.profilePic != null ? (
                  <Image
                    style={[styles.stretch]}
                    source={{ uri: `${comments.Results.profilePic}` }}
                  />
                ) : (
                  <Icon name="user" size={50}></Icon>
                )}
                <TouchableOpacity
                  style={{ color: 'red' }}
                  onPress={() => {
                    toggleModal()
                  }}
                >
                  <Text>Change avatar</Text>
                </TouchableOpacity>
              </View>

              <View style={{ paddingLeft: normalize(10) }}>
                <Text style={styles.label}>SOID: {comments.Results.SOUID}</Text>
                <Text style={styles.label}>
                  Profile Completion: {comments.Results.profilePercentage}%
                </Text>
                <Text style={styles.label}>Email: {userInfo.Result.email}</Text>
                <Text style={styles.label}>
                  Earned Points: {comments.Results.current_point}
                </Text>
              </View>
            </View>
          ) : (
            <></>
          )}

          <View style={[styles.action, { backgroundColor: '#ffffff' }]}>
            <TextInput
              placeholder={
                (comments && comments.Results.firstname) || 'First Name'
              }
              placeholderTextColor={colors.text}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => setFirstName(val)}
              //   onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
          </View>

          <View style={[styles.action, { backgroundColor: '#ffffff' }]}>
            <TextInput
              placeholder={
                (comments && comments.Results.lastname) || 'Last Name'
              }
              placeholderTextColor={colors.text}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => setLastName(val)}
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
                {datestr == null ? (
                  <Text style={{ paddingLeft: 15 }}>
                    {comments
                      ? comments.Results.dob == null ||
                        comments.Results.dob == ''
                        ? 'DOB'
                        : `${datestr}`
                      : ''}
                  </Text>
                ) : (
                  <Text style={{ paddingLeft: 15, color: colors.text }}>
                    {datestr}
                  </Text>
                )}
                {/* <Image source={require('../assets/date.png')} size={{height: 10, width: 10}}/>  */}
              </View>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              // onChange={handleConfirm}
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
                style={{
                  flexDirection: 'row',
                  flex: 0.6,
                  alignItems: 'center',
                }}
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
              placeholder={
                (comments && comments.Results.address1) || 'Address line 1'
              }
              placeholderTextColor={colors.text}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => setAdd1(val)}
            />
          </View>
          <View style={[styles.action, { backgroundColor: '#ffffff' }]}>
            <TextInput
              placeholder={
                (comments && comments.Results.address2) || 'Address line 2'
              }
              placeholderTextColor={colors.text}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => setAdd2(val)}
            />
          </View>

          <View style={[styles.action, { backgroundColor: '#ffffff' }]}>
            <View
              style={[
                styles.action,
                { marginTop: 0 },
                { backgroundColor: '#ffffff', paddingLeft: 10 },
              ]}
            >
              {renderLabel()}
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                placeholder={state ? state : 'State'}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={state_data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setIsFocus(false)
                  if (state != item.label) {
                    setValue2('')
                    setCity1('')
                    setCity(null)
                  }
                  setValue(item.value)
                  setStateToAPI(item.label)
                  setState_code(item)
                  setState(item.label)
                }}
              />
            </View>
            {/* <TextInput
              placeholder={(comments && comments.Results.state) || 'State'}
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => setState(val)}
            /> */}
          </View>
          {city &&
          city.message != 'Cities are not found!' &&
          city_data.length > 0 ? (
            <View style={[styles.action, { backgroundColor: '#ffffff' }]}>
              <View
                style={[
                  styles.action,
                  { backgroundColor: '#ffffff', marginTop: 0, paddingLeft: 10 },
                ]}
              >
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
                    setCity1(item.label)
                    setCityToAPI(item.label)
                  }}
                />
              </View>
            </View>
          ) : (
            <View style={[styles.action, { backgroundColor: '#ffffff' }]}>
              <TextInput
                placeholder={(comments && comments.Results.city) || 'City'}
                placeholderTextColor={colors.text}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={(val) => {
                  setCity1(val)
                }}
              />
            </View>
          )}
          <View style={[styles.action, { backgroundColor: '#ffffff' }]}>
            <TextInput
              placeholder={
                (comments && comments.Results.countryName) || 'Country'
              }
              placeholderTextColor={colors.text}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              editable={false}
              onChangeText={(val) => setCountry(val)}
            />
          </View>
          <View style={[styles.action1, { justifyContent: 'space-between' }]}>
            <View
              style={[
                styles.action1,
                { backgroundColor: '#ffffff', flex: 0.48 },
              ]}
            >
              <TextInput
                placeholder={
                  (comments && comments.Results.zipcode) || 'Zip Code'
                }
                placeholderTextColor={colors.text}
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
              style={[
                styles.action1,
                { backgroundColor: '#ffffff', flex: 0.48 },
              ]}
            >
              <TextInput
                placeholder={
                  (comments && comments.Results.phone) || 'Phone Number'
                }
                placeholderTextColor={colors.text}
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
                if (firstName.trim() == '') {
                  alert('First name should not be empty')
                  return
                }
                if (lastName.trim() == '') {
                  alert('Last name should not be empty')
                  return
                }
                if (add1.trim() == '') {
                  alert('Address 1 should not be empty')
                  return
                }
                if (add2.trim() == '') {
                  alert('Address 2 should not be empty')
                  return
                }
                if (city1.trim() == '') {
                  alert('City should not be empty')
                  return
                }
                if (state.trim() == '') {
                  alert('State should not be empty')
                  return
                }
                if (zip.trim() == '') {
                  alert('Zipcode should not be empty')
                  return
                }
                update_profile(
                  firstName,
                  lastName,
                  date,
                  checked == 'first' ? 1 : 2,
                  add1,
                  add2,
                  city1,
                  state,
                  country,
                  zip,
                  phone,
                  2,
                  navigation
                )
              }}
              style={[
                styles.signIn,
                {
                  backgroundColor: '#378C3C',
                  marginBottom: 10,
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
                Update Profile
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}
            style={{
              marginLeft: '15%',
              height: SCREEN_HEIGHT * 0.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View style={styles.container1}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                  }}
                >
                  {avatar &&
                    avatar.results.map((ele) => {
                      return (
                        <View style={styles.modal_} key={ele.avatarName}>
                          <TouchableOpacity
                            style={{
                              alignItems: 'center',
                              marginTop: 0,
                              width: '60%',
                            }}
                            onPress={() => {
                              setAvatarLink(ele.avatarLink)
                              avatar_set(ele.avatarName)
                              setModalVisible(!isModalVisible)
                            }}
                          >
                            <Image
                              style={[styles.stretch]}
                              source={{ uri: `${ele.avatarLink}` }}
                            />
                          </TouchableOpacity>
                        </View>
                      )
                    })}
                </View>
              </ScrollView>
            </View>
          </Modal>
        </Animatable.View>
      </View>
    </ScrollView>
    </KeyboardAvoidingWrapper>
  )
}

const styles = StyleSheet.create({
  modal_: {
    // height: 'justifyContent',
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    // flexDirection: "row",
    // flexWrap: "wrap",
  },
  dropdown: {
    width: '100%',
    paddingHorizontal: 0,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  modal_btn: {
    width: SCREEN_WIDTH * 0.2,
    color: '#378C3C',
    borderRadius: 20,
  },
  modal_sub_heading: {
    fontWeight: 500,
    fontSize: normalize(15),
    marginTop: 10,
  },
  modal_points: {
    fontWeight: 400,
    fontSize: normalize(15),
  },
  label: {
    // fontFamily: 'Poppins Regular 400',
    fontSize: normalize(13),
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  stretch: {
    width: SCREEN_WIDTH * 0.15,
    height: SCREEN_WIDTH * 0.15,
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
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
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
    minHeight: normalize(37),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(10),
    paddingLeft: 15,
    paddingRight: 15,
  },
  action1: {
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
    marginBottom: normalize(30),
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
    // fontFamily: 'Poppins Regular 400',
  },
})
