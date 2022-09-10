import React, { useContext, useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
  PixelRatio,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import WebViewScreen from './WebViewScreen'
import { BASE_URL } from '../config'

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

export default function SpinnerScreen({ navigation }) {
  const { userInfo, panelist_basic_details } = useContext(AuthContext)
  const [comments, setComments] = useState(null)
  const [link, setLink] = useState(null)
  const [salutation, setSalalutaion] = useState('Morning')
  useEffect(() => {
    fetchComments()
  }, [])
  useEffect(() => {
    console.log(comments)
    const date = new Date()
    const hour = date.getHours()
    if (hour < 12) {
      setSalalutaion('Morning')
    } else if (hour >= 12 && hour < 16) {
      setSalalutaion('Afternoon')
    } else {
      setSalalutaion('Evening')
    }
  }, [])
  const fetchComments = async () => {
    // const response=await axios(`${BASE_URL}/surveyListing/${parseInt(userInfo.Result.panelistID)}`);
    axios
      .get(
        `${BASE_URL}/surveySpinner/${parseInt(
          userInfo.Result.countryID
        )}/${parseInt(userInfo.Result.panelistID)}`
      )
      .then((res) => {
        setComments(res.data.result)
      })
      .catch((e) => {
        console.log(`register error ${e}`)
        setIsLoading(false)
      })
  }

  const handleNavigation = (link) => {
    setLink(link)
    console.log()
    navigation.navigate('Web View', { link: link })
  }
  // if(link === null){
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={[styles.container,{paddingTop:15}]}>

        <View>
          <Text style={styles.header}>
            Good {salutation}, {userInfo.Result && userInfo.Result.firstname}
          </Text>
        </View>
        {/* heading */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 6,
          }}
        >
          <Text
            style={{
              color: '#378C3C',
              marginTop: 10,
              textAlign: 'center',
              fontSize: normalize(15),
            }}
          >
            Spinner
          </Text>
          <Image
            style={{ width: 27, height: 27, marginRight: 15 }}
            source={{
              uri: `${
                userInfo && userInfo.Result && userInfo.Result.profilePic
              }`,
            }}
          />
        </View>
        <View style={styles.points}>
          <View style={styles.center}>
            <Text style={styles.text_box_black_header}>My Points</Text>
            <Text style={styles.text_box_black_points}>
              {panelist_basic_details == null
                ? userInfo.Result && userInfo.Result.current_point
                : panelist_basic_details.Results.current_point}
            </Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.text_box_black_header}>My Profile</Text>
            <Text style={styles.text_box_black_points}>
              {panelist_basic_details == null
                ? userInfo.Result && userInfo.Result.profilePercentage
                : panelist_basic_details.Results.profilePercentage}
              %
            </Text>
          </View>
        </View>
        {comments &&
          comments.map((ele, val) => {
            let path = `../assets/${ele.Incentive}.png`
            console.log(path)
            if (val % 2 == 0) {
              return (
                <TouchableOpacity
                  style={styles.products}
                  key={val}
                  onPress={() => {
                    handleNavigation(ele.Link)
                  }}
                >
                  <View style={[styles.center_, { flex: 1.2 }]}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 15,
                        fontWeight: '500',
                        padding: 10,
                      }}
                    >
                      {ele.Description}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.center_,
                      { flex: 0.8, alignItems: 'center', marginTop: 0 },
                    ]}
                  >
                    <ImageBackground
                      style={styles.stretch}
                      source={require('../assets/spinner_edited.gif')}
                      resizeMode="cover"
                    >
                      {ele.Incentive == 100 ? (
                        <Image
                          style={{ width: 70, height: 70 }}
                          // source={{uri: `${path}`}}
                          source={require('../assets/100.png')}
                        />
                      ) : ele.Incentive == 75 ? (
                        <Image
                          style={{ width: 70, height: 70 }}
                          // source={{uri: `${path}`}}
                          source={require('../assets/75.png')}
                        />
                      ) : (
                        <Image
                          style={{ width: 70, height: 70 }}
                          // source={{uri: `${path}`}}
                          source={require('../assets/50.png')}
                        />
                      )}
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
              )
            } else {
              {
                /* let path = `../assets/${ele.Incentive}/.png` */
              }
              return (
                <TouchableOpacity
                  style={styles.products}
                  key={val}
                  onPress={() => {
                    handleNavigation(ele.Link)
                  }}
                >
                  <View
                    style={[
                      styles.center_,
                      { flex: 0.8, alignItems: 'center', marginTop: 0 },
                    ]}
                  >
                    <ImageBackground
                      style={styles.stretch}
                      source={require('../assets/spinner_edited.gif')}
                      resizeMode="cover"
                    >
                      {ele.Incentive == 100 ? (
                        <Image
                          style={{ width: 70, height: 70 }}
                          // source={{uri: `${path}`}}
                          source={require('../assets/100.png')}
                        />
                      ) : ele.Incentive == 75 ? (
                        <Image
                          style={{ width: 70, height: 70 }}
                          // source={{uri: `${path}`}}
                          source={require('../assets/75.png')}
                        />
                      ) : (
                        <Image
                          style={{ width: 70, height: 70 }}
                          // source={{uri: `${path}`}}
                          source={require('../assets/50.png')}
                        />
                      )}
                    </ImageBackground>
                  </View>
                  <View style={[styles.center_, { flex: 1.2 }]}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 15,
                        fontWeight: '500',
                        padding: 10,
                      }}
                    >
                      {ele.Description}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            }
          })}
      </View>
    </ScrollView>
  )
  // }
  // else{
  //     console.log(link)
  //     return (
  //         <WebViewScreen link={link}></WebViewScreen>
  //     )
  // }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    padding: 10,
    flexDirection: 'column',
    minHeight: SCREEN_HEIGHT,
    minWidth: SCREEN_WIDTH,
    marginTop: 20,
  },
  stretch: {
    width: 100,
    height: 100,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: '#000000',
    marginTop: 10,
    fontSize: normalize(19),
  },
  footer: {
    flex: 1,
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
    maxHeight: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'center',
    borderRadius: normalize(10),
    borderWidth: 1,
    borderColor: 'black',
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
    marginTop: normalize(30),
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
  center: {
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
    flex: 1,
  },
  center_: {
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
    // borderColor: 'black',
  },
  points: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#1a1a1a',
    alignContent: 'center',
    // height: 'justifyContent',
    paddingLeft: normalize(5),
    paddingRight: normalize(5),
    borderRadius: 20,
  },
  text_box_black_header: {
    color: '#fff',
    marginTop: 10,
    fontWeight: '200',
    textAlign: 'center',
    fontSize: normalize(15),
  },
  text_box_black_points: {
    color: '#fff',
    // fontWeight: '500',
    textAlign: 'center',
    fontSize: normalize(23),
  },
  items: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    alignContent: 'center',
    // height: 'justifyContent',
    paddingLeft: normalize(5),
    paddingRight: normalize(5),
    borderRadius: 10,
    marginTop: normalize(10),
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  products: {
    maxHeight: 120,
    flex: 1,
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: normalize(10),
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    shadowRadius: 2,
    shadowOpacity: 1,
  },
})
