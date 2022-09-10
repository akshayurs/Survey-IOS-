import React, { useContext, useEffect, useState } from 'react'
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
import axios from 'axios'
import { BASE_URL } from '../config'
import Icon from 'react-native-vector-icons/FontAwesome'
import { AuthContext } from '../context/AuthContext'
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

export default function UserActivityScreen({ navigation }) {
  // const [tableHead, setTableHead] = ([])
  // const [tableData, setTableData] = ([])
  // const setTableHeadData = () =>{
  //     setTableHead(['Head', 'Head2', 'Head3', 'Head4'])
  // }
  // const setTableData_ = () =>{
  //     setTableData([
  //         ['1', '2', '3', '4'],
  //         ['a', 'b', 'c', 'd'],
  //         ['1', '2', '3', '4'],
  //         ['a', 'b', 'c', 'd']
  //     ])
  // }
  // useEffect(() => {
  //     console.log("useEffect called");
  //     // setTableHeadData
  //     // setTableData_
  //     console.log(tableData)
  // }
  // ,[])

  // console.log(tableData)

  const { userInfo, redeem_request, panelist_basic_details } =
    useContext(AuthContext)

  console.log(userInfo)
  console.log(panelist_basic_details)
  const [comments, setComments] = useState(null)
  const [salutation, setSalalutaion] = useState('Morning')
  useEffect(() => {
    fetchComments()
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
  useEffect(() => {
    console.log(comments)
  }, [comments])
  const fetchComments = async () => {
    const response = await axios(
      `${BASE_URL}/transactionHistory/${parseInt(userInfo.Result.panelistID)}`
    )
    setComments(response.data)
  }

  console.log(comments && comments.activityDetails)

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
            Points History
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

        <View
          style={[
            styles.products,
            {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#d4d6d1',
              marginTop: 10,
              paddingLeft: 6,
              paddingRight: 6,
            },
          ]}
        >
          <Text
            style={[
              {
                flex: 0.25,
                color: '#000000',
                marginTop: 10,
                textAlign: 'center',
                fontSize: normalize(15),
                fontWeight: 'bold',
              },
            ]}
          >
            Date
          </Text>
          <Text style={[styles.tabel_header, { flex: 0.4 }]}>Description</Text>
          <Text style={[styles.tabel_header, { flex: 0.2 }]}>Points</Text>
        </View>
        {comments &&
          comments.activityDetails.map((ele, val) => {
            return (
              <View
                style={[
                  styles.products,
                  {
                    justifyContent: 'space-between',
                    textAlign: 'center',
                    paddingLeft: 6,
                    paddingRight: 6,
                  },
                ]}
                key={val}
              >
                <Text style={styles.table_row_data}>{ele.Date}</Text>
                <Text style={styles.table_row_data}>{ele.Mode}</Text>
                <Text style={styles.table_row_data}>+{ele.Total_points}</Text>
              </View>
            )
          })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  table_row_data: {
    color: '#000000',
    marginTop: 10,
    textAlign: 'center',
    fontSize: normalize(13),
  },
  tabel_header: {
    color: '#000000',
    marginTop: 10,
    textAlign: 'center',
    fontSize: normalize(15),
    fontWeight: 'bold',
  },
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
    marginTop: 3,
    minHeight: normalize(40),
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    // marginTop: normalize(10),
    borderColor: 'black',
    borderRadius: 10,
    borderBottomColor: '#8d8d8d',
    borderBottomWidth: 1,
  },
})
