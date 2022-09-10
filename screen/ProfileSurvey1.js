import React, { useEffect, useState, useContext } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  PixelRatio,
  ScrollView,
  Animated,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import Logo from '../components/Logo'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../config'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

var { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const scale = SCREEN_WIDTH / 320
export function normalize(size) {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

const useFetch = (userInfo) => {
  console.log('Profile Survey 2')
  console.log('It is during login time and to update profile answers')
  console.log(userInfo && userInfo)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [data_arr, setData_arr] = useState(null)
  const [ques_idx, setQues_idx] = useState(null)

  // Similar to componentDidMount and componentDidUpdate:
  let temp_data_arr = null
  useEffect(() => {
    ;(async () => {
      const response = await fetch(
        `${BASE_URL}/getCountryQuestion/${parseInt(
          userInfo.Result.countryID
        )}/${parseInt(userInfo.Result.panelistID)}`
      )
      const data = await response.json()
      temp_data_arr = Object.values(data.Results)
      if (userInfo.Result.answerList.length > 0) {
        for (let i = 0; i < userInfo.Result.answerList.length; i++) {
          let obj = userInfo.Result.answerList[i]
          let ques_id_ = obj.ques_id
          let ans_id_ = obj.ans_id
          let ans_id_arr = ans_id_.split(',')
          for (let j = 0; j < temp_data_arr.length; j++) {
            if (
              temp_data_arr[j].AnswerList[0].profile_question_id == ques_id_
            ) {
              for (let k = 0; k < temp_data_arr[j].AnswerList.length; k++) {
                for (let x = 0; x < ans_id_arr.length; x++) {
                  if (
                    temp_data_arr[j].AnswerList[k].answer_code == ans_id_arr[x]
                  ) {
                    temp_data_arr[j].AnswerList[k].is_answered = true
                    console.log('HIiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
                  }
                }
              }
            }
          }
        }
      }

      setData_arr(Object.values(data.Results))
      setQues_idx(Object.keys(data.Results))
      console.log(data_arr)
    })()
  }, [])

  console.log('inside FETCH Function')

  return { ques_idx, data_arr }
}

export default function ProfileSurvey1({ navigation }) {
  console.log('It is during login Screen')

  const { userInfo, panelist_profiling_ans, panelist_basic_details } =
    useContext(AuthContext)

  console.log(userInfo && userInfo)
  console.log(panelist_basic_details && panelist_basic_details)
  if (userInfo && userInfo) {
    console.log(userInfo.Result.profilePercentage)
    if (parseInt(userInfo.Result.profilePercentage) >= 85) {
      navigation.navigate('Home')
    }
  }
  // if(userInfo && userInfo){
  //     console.log(userInfo.Result.profilePercentage)
  //     if(parseInt(userInfo.Result.profilePercentage) == 100){
  //         navigation.navigate('Home')
  //     }
  // }
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  // const [data, setData] = useState(null)
  const [ques, setQues] = useState(0)
  const [ans, setAns] = useState([])
  const { ques_idx, data_arr } = useFetch(userInfo)

  // if(userInfo && userInfo){
  //     {ques_idx, data_arr} = useFetch(userInfo)
  //     console.log(ques_idx && ques_idx)
  //     console.log(data_arr  && data_arr)
  // }

  // useEffect(async () => {

  //     setLoading(true)
  //     axios
  //     // .get(`${BASE_URL}/getCountryQuestion/${parseInt(userInfo.Result.countryID)}/${parseInt(userInfo.Result.panelistID)}`)
  //     .get(`${BASE_URL}/getCountryQuestion/100/396`)
  //     .then(res => {
  //         let responce_data = res.data;
  //         console.log()
  //         setData(Object.values(responce_data.Results))
  //         data_arr = Object.values(responce_data.Results)
  //
  //         console.log(data)
  //         console.log("Inside USEEffect")
  //         setLoading(false);
  //     })
  //     .catch(e => {
  //     console.log(`register error ${e}`);
  //     setLoading(false);
  //     });
  //     return () => {
  //     };

  // }, []);

  // let data_arr = null
  // useEffect(async() => {
  //     console.log("hello")
  //     data_arr = data
  //     console.log(data_arr)
  // },[data])

  // if(data && data){
  //     console.log("hello")
  //     data_arr = data
  // }

  // if(data && data && userInfo.Result && userInfo.Result.answerList ) {
  //     only_one_time = true;
  //     data_arr = data
  //     if(userInfo.Result.answerList.length > 0){
  //         for(let i=0;i<userInfo.Result.answerList.length;i++){
  //             let obj = userInfo.Result.answerList[i]
  //             let ques_id_ = obj.ques_id
  //             let ans_id_ = obj.ans_id
  //             let ans_id_arr = ans_id_.split(',')
  //             for(let j=0;j<data_arr.length;j++){
  //                 if(data_arr[j].AnswerList[0].profile_question_id == ques_id_){
  //                     for(let k=0;k<data_arr[j].AnswerList.length;k++){
  //                         for(let x=0;x<ans_id_arr.length;x++){
  //                             if(data_arr[j].AnswerList[k].answer_code == ans_id_arr[x]){
  //                                 data_arr[j].AnswerList[k].is_answered = true
  //                                 console.log("HIiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
  //                                 setData([...data, data[j].AnswerList[k].is_answered = true])
  //                             }
  //                         }
  //                     }
  //                 }
  //             }
  //         }
  //     }
  // }

  // console.log(data_arr && data_arr)

  let num_of_ques = null
  if (data_arr && data_arr) {
    num_of_ques = data_arr.length
  }
  console.log(num_of_ques)
  const move_to_next = () => {
    let flag = false
    for (let i = 0; i < data_arr[ques].AnswerList.length; i++) {
      if (data_arr[ques].AnswerList[i].is_answered == true) {
        flag == true
      }
    }
    if (flag) {
      setQues(ques + 1)
      Animated.timing(progress, {
        toValue: ques + 1,
        duration: 1000,
        useNativeDriver: false,
      }).start()
    } else {
      // alert("Please select option to continue")
      if (ques == num_of_ques - 1) {
        // let obj = {
        //     ques_id: ques_id,
        //     ans_id: ans_id
        // }
        // setAns([...ans, obj]);

        // AsyncStorage.setItem('answers', JSON.stringify(ans));
        // handleShowResult()
        // console.log("size equal")
        let arr = ans
        navigation.navigate('End Of Profile Survey Screen')
        for (let i = 0; i < arr.length; i++) {
          console.log(arr[i].ques_id)
        }
        let final_ans = []

        for (let i = 0; i < data_arr.length; i++) {
          if (data_arr[i].Question.question_type_id == 2) {
            for (let j = 0; j < data_arr[i].AnswerList.length; j++) {
              if (data_arr[i].AnswerList[j].is_answered) {
                let obj = {
                  ques_id: data_arr[i].AnswerList[j].profile_question_id,
                  ans_id: data_arr[i].AnswerList[j].answer_code,
                }
                final_ans.push(obj)
                console.log(final_ans)
                continue
              }
            }
          } else {
            let temp_ans_str = ''
            let ques_code = null
            for (let j = 0; j < data_arr[i].AnswerList.length; j++) {
              if (data_arr[i].AnswerList[j].is_answered) {
                temp_ans_str += data_arr[i].AnswerList[j].answer_code + ','
                ques_code = data_arr[i].AnswerList[j].profile_question_id
              }
            }
            let obj
            if (ques_code != null) {
              obj = {
                ques_id: ques_code,
                ans_id: temp_ans_str,
              }
              final_ans.push(obj)
            }
            console.log(final_ans)
          }
        }

        //old selection of answers
        // for(let i=0;i<arr.length;i++){
        //     for(let j=i+1;j<arr.length-1;j++){
        //         console.log(i)
        //         console.log(arr[i])
        //         console.log(j)
        //         console.log(arr[j])
        //         if(arr[i].ques_id == arr[j].ques_id){
        //             console.log("HITTTTTTTTT")
        //             arr[i] = null;
        //         }
        //     }
        // }
        // console.log(arr)
        // let counter = 0;
        // for(let i=0;i<arr.length;i++){
        //     if(arr[i]!=null){
        //         final_ans[counter] = arr[i]
        //         counter++;
        //     }
        // }
        // arr = []
        console.log(final_ans)
        AsyncStorage.setItem('ans_obj', JSON.stringify(final_ans))
        // console.log(ans_obj)
        panelist_profiling_ans(final_ans)
        console.log('here')
        setAns([])
        navigation.navigate('End Of Profile Survey Screen')
      } else {
        setQues(ques + 1)
      }
    }
    return flag
  }

  console.log(ques)
  //while going back he have two options whether to keep that answer or to change the current answer
  //if the user chooses the current answer ones again then it might happen in other case that we looses the responce of that question
  //so which one to take

  const handle_option_press = (ques_id, ans_id, ans_idx) => {
    console.log('Single select pressed')
    console.log(ans_id)
    console.log(data_arr[ques].AnswerList[ans_idx])
    // for(let i=0;i<data_arr[ques].AnswerList.length;i++){
    //     if(data_arr[ques].AnswerList[ans_idx].is_answered == true && i != ans_idx){
    //         data_arr[ques].AnswerList[ans_idx].is_answered = false
    //         console.log(data_arr)
    //     }
    // }
    // this will deactivate the current question if answered and load the current question again
    for (let i = 0; i < data_arr[ques].AnswerList.length; i++) {
      if (data_arr[ques].AnswerList[i].is_answered == true && i != ans_idx) {
        data_arr[ques].AnswerList[i].is_answered = false
        console.log(data_arr)
      }
    }
    console.log(data_arr)
    if (data_arr[ques].AnswerList[ans_idx].is_answered == true) {
      data_arr[ques].AnswerList[ans_idx].is_answered = false
      setQues(ques)
    }
    data_arr[ques].AnswerList[ans_idx].is_answered = true

    //make every option false except answer one
    for (let i = 0; i < data_arr[ques].AnswerList.length; i++) {
      if (data_arr[ques].AnswerList[i].is_answered && i != ans_idx) {
        data_arr[ques].AnswerList[i].is_answered = false
      }
    }
    // if user has not selected any options in current question state
    let flag = false
    for (let i = 0; i < data_arr[ques].AnswerList.length; i++) {
      if (data_arr[ques].AnswerList[i].is_answered) {
        flag = true
        break
      }
    }
    if (!flag) {
      alert('Please select any options')
    } else {
      console.log('here ans state is updated')
      let len = data_arr.length
      let temp_arr = ans
      let temp = true
      //checking whether the ans state already contains the present ques_id or not
      // for(let i=0;i<temp_arr.length;i++){
      //     if(temp_arr[i].ques_id == ques_id){
      //         let obj = {
      //             ques_id: ques_id,
      //             ans_id: ans_id
      //         }
      //         setQues(ques+1)
      //         setAns([...ans, obj]);
      //         if(ques == (len-1)){
      //             // AsyncStorage.setItem('answers', JSON.stringify(ans));
      //             console.log("size equal")
      //             handleShowResult()
      //         }
      //     }
      // }

      if (temp_arr.length == 0) {
        let obj = {
          ques_id: ques_id,
          ans_id: ans_id,
        }
        setQues(ques + 1)
        setAns(temp_arr)
        console.log(ans)
      }
      if (ques != num_of_ques - 1) {
        let obj = {
          ques_id: ques_id,
          ans_id: ans_id,
        }
        setQues(ques + 1)
        setAns([...ans, obj])
        console.log(ques)
      }

      if (ques == num_of_ques - 1) {
        let obj = {
          ques_id: ques_id,
          ans_id: ans_id,
        }
        setAns([...ans, obj])

        // AsyncStorage.setItem('answers', JSON.stringify(ans));
        // handleShowResult()
        // console.log("size equal")
        let arr = ans
        navigation.navigate('End Of Profile Survey Screen')
        for (let i = 0; i < arr.length; i++) {
          console.log(arr[i].ques_id)
        }
        let final_ans = []

        for (let i = 0; i < data_arr.length; i++) {
          if (data_arr[i].Question.question_type_id == 2) {
            for (let j = 0; j < data_arr[i].AnswerList.length; j++) {
              if (data_arr[i].AnswerList[j].is_answered) {
                let obj = {
                  ques_id: data_arr[i].AnswerList[j].profile_question_id,
                  ans_id: data_arr[i].AnswerList[j].answer_code,
                }
                final_ans.push(obj)
                console.log(final_ans)
                continue
              }
            }
          } else {
            let temp_ans_str = ''
            let ques_code = null
            for (let j = 0; j < data_arr[i].AnswerList.length; j++) {
              if (data_arr[i].AnswerList[j].is_answered) {
                temp_ans_str += data_arr[i].AnswerList[j].answer_code + ','
                ques_code = data_arr[i].AnswerList[j].profile_question_id
              }
            }
            let obj = {
              ques_id: ques_code,
              ans_id: temp_ans_str,
            }
            final_ans.push(obj)
            console.log(final_ans)
          }
        }

        //old selection of answers
        // for(let i=0;i<arr.length;i++){
        //     for(let j=i+1;j<arr.length-1;j++){
        //         console.log(i)
        //         console.log(arr[i])
        //         console.log(j)
        //         console.log(arr[j])
        //         if(arr[i].ques_id == arr[j].ques_id){
        //             console.log("HITTTTTTTTT")
        //             arr[i] = null;
        //         }
        //     }
        // }
        // console.log(arr)
        // let counter = 0;
        // for(let i=0;i<arr.length;i++){
        //     if(arr[i]!=null){
        //         final_ans[counter] = arr[i]
        //         counter++;
        //     }
        // }
        // arr = []
        console.log(final_ans)
        AsyncStorage.setItem('ans_obj', JSON.stringify(final_ans))
        // console.log(ans_obj)
        panelist_profiling_ans(final_ans)
        console.log('here')
        setAns([])
        navigation.navigate('End Of Profile Survey Screen')
      }

      Animated.timing(progress, {
        toValue: ques + 1,
        duration: 1000,
        useNativeDriver: false,
      }).start()

      //if answer is already selected
      // if(temp){
      //     console.log("I am ifdsafasfsafdsafsaf")
      //     data_arr[ques].AnswerList[ans_idx].is_answered = true
      //     console.log(len)
      //     console.log(ques)
      //     let obj = {
      //         ques_id: ques_id,
      //         ans_id: ans_id
      //     }
      //     setQues(ques+1)
      //     setAns([...ans, obj]);
      //     if(ques == (len-1)){
      //         // AsyncStorage.setItem('answers', JSON.stringify(ans));
      //         handleShowResult()
      //         console.log("size equal")
      //     }
      //     Animated.timing(progress, {
      //         toValue: ques+1,
      //         duration: 1000,
      //         useNativeDriver: false
      //     }).start();
      // }
    }
  }

  const [multi_ans, setMulti_ans] = useState('')
  const [isSelected, setIsSelected] = useState([])
  const [toggle, setToggle] = useState(false)
  let ans_selected = []
  const handle_multiple_select = (ques_id, ans_id, ans_idx) => {
    console.log(ques)
    console.log(ans_idx)
    if (data_arr[ques].AnswerList[ans_idx].is_answered == true) {
      console.log(data_arr[ques].AnswerList[ans_idx])
      data_arr[ques].AnswerList[ans_idx].is_answered = false
      console.log(data_arr[ques].AnswerList[ans_idx])
      setToggle(!toggle)
    } else {
      // ans_selected.push(ans_id)
      console.log(data_arr[ques].AnswerList[ans_idx])
      data_arr[ques].AnswerList[ans_idx].is_answered = true
      console.log(ans_selected)
      console.log(data_arr)
      let temp_arr = isSelected
      let flag = true
      //here I am putting ans ID
      // for(let i=0;i<temp_arr.length;i++){
      //     if(temp_arr[i] == ans_id){
      //         console.log("I am here")
      //         data_arr[ques].AnswerList[ans_idx].is_answered = false
      //         flag = false;
      //     }
      // }
      if (flag) {
        setIsSelected([...isSelected, ans_id])
        setMulti_ans(multi_ans + ans_id + ',')
        console.log(multi_ans)
        console.log(isSelected)
      }
    }
  }

  const next_question = (ques_id) => {
    let temp = ans
    let flag = true
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].ques_id == ques_id) {
        flag == false
      }
    }

    if (flag) {
      let obj = {
        ques_id: ques_idx[ques_id],
        ans_id: multi_ans,
      }
      ans_selected = []
      setIsSelected([])
      setMulti_ans('')
      setAns([...ans, obj])
      setQues(ques + 1)
      Animated.timing(progress, {
        toValue: ques + 1,
        duration: 1000,
        useNativeDriver: false,
      }).start()
    }
  }

  const back_question = () => {
    if (ques != 0) {
      setQues(ques - 1)
    }
  }
  console.log(data_arr && data_arr.length)
  const [progress, setProgress] = useState(new Animated.Value(0))
  const progressAnim = progress.interpolate({
    inputRange: [0, data_arr && data_arr.length],
    outputRange: ['0%', '100%'],
  })
  console.log(progress)
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 20,
          borderRadius: 20,
          backgroundColor: '#000000',
        }}
      >
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: '#378C3C',
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    )
  }
  console.log(ans)
  const handleShowResult = () => {
    // let arr = ques_idx;
    // let ans_obj = []
    // for(let i=0;i<arr.length;i++){
    //     for(let j=0;j<data_arr[i].AnswerList.length;j++){
    //         let flag = false;
    //         let str = ""
    //         if(data_arr[i].AnswerList[j].is_answered == true && data[ques].Question.question_type_id == 2){
    //             flag = true
    //             let temp = {
    //                 key:`${arr[i]}`,
    //                 value: `${data_arr[i].AnswerList[j].answer_code}`
    //             };
    //             ans_obj.push(temp)
    //             continue
    //         }
    //         else if(data_arr[i].AnswerList[j].is_answered == true && data[ques].Question.question_type_id == 3){
    //             str += data_arr[i].AnswerList[j].answer_code+",";
    //         }

    //         if(flag == false){
    //             let temp = {
    //                 key:`${arr[i]}`,
    //                 value: `${str}`
    //             };
    //             ans_obj.push(temp)
    //         }
    //     }
    // }

    let arr = ans
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i].ques_id)
    }
    let final_ans = []
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i].ques_id == arr[j].ques_id) {
          console.log('HITTTTTTTTT')
          arr[i] = null
        }
      }
    }
    console.log(arr)
    let counter = 0
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] != null) {
        final_ans[counter] = arr[i]
        counter++
      }
    }
    arr = []
    console.log(final_ans)
    AsyncStorage.setItem('ans_obj', JSON.stringify(final_ans))
    // console.log(ans_obj)
    panelist_profiling_ans(final_ans)
    console.log('here')
    setAns([])
    navigation.navigate('End Of Profile Survey Screen')
  }
  if (data_arr == null) {
    return <Text></Text>
  } else {
    return (
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
          {renderProgressBar()}
          {data_arr[ques] && data_arr[ques].Question ? (
            <>
              <Text
                style={{
                  color: '#000000',
                  marginTop: 10,
                  fontSize: normalize(18),
                  fontWeight: 'bold',
                }}
              >
                {data_arr[ques].Question.question_title}
              </Text>
            </>
          ) : (
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Text style={{ fontSize: 32, fontWeight: '700' }}>
                LOADING...
              </Text>
            </View>
          )}

          {data_arr &&
          data_arr[ques] &&
          data_arr[ques].Question.question_type_id == 3 ? (
            <Text
              style={{
                marginTop: 10,
                fontSize: normalize(11),
                color: '#00a4de',
                fontStyle: 'italic',
              }}
            >
              Please select all that apply
            </Text>
          ) : (
            <Text
              style={{
                marginTop: 10,
                fontSize: normalize(11),
                color: '#00a4de',
                fontStyle: 'italic',
              }}
            >
              Please select any one
            </Text>
          )}

          {data_arr && data_arr[ques] && data_arr[ques].AnswerList ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              {data_arr[ques].AnswerList.map((ele, val) => {
                if (data_arr[ques].Question.question_type_id == 2) {
                  return (
                    <View key={val}>
                      <TouchableOpacity
                        key={ele.answer_code}
                        onPress={() =>
                          handle_option_press(
                            ele.profile_question_id,
                            ele.answer_code,
                            val
                          )
                        }
                      >
                        <View
                          style={[
                            styles.action,
                            {
                              backgroundColor: ele.is_answered
                                ? '#378C3C'
                                : '#ffffff',
                            },
                          ]}
                        >
                          <Text
                            style={{
                              fontSize: normalize(13),
                              color: ele.is_answered ? '#ffffff' : '#000000',
                            }}
                          >
                            {ele.description}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )
                } else {
                  console.log(data_arr[ques].AnswerList[val])
                  return (
                    <View key={val}>
                      <TouchableOpacity
                        key={ele.answer_code}
                        onPress={() => {
                          // console.log(ele.answer_code)
                          // let flag = false;
                          // for(let i=0;i<ans_selected.length;i++){
                          //     if(ans_selected[i] == ele.answer_code){
                          //         ans_selected[i] = null;
                          //         flag = true
                          //     }
                          // }
                          // if(flag == false){
                          //     ans_selected.push(ele.answer_code)
                          // }
                          // console.log(ans_selected)
                          handle_multiple_select(
                            ele.profile_question_id,
                            ele.answer_code,
                            val
                          )
                        }}
                      >
                        <View
                          style={[
                            styles.action,
                            {
                              backgroundColor: ele.is_answered
                                ? '#378C3C'
                                : '#ffffff',
                            },
                          ]}
                        >
                          <Text
                            style={{
                              fontSize: normalize(13),
                              color: ele.is_answered ? '#ffffff' : '#000000',
                            }}
                          >
                            {ele.description}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )
                }
              })}
            </ScrollView>
          ) : (
            <Text>Loading</Text>
          )}

          {ques == 0 ? (
            <></>
          ) : data_arr &&
            data_arr[ques] &&
            data_arr[ques].Question.question_type_id == 2 ? (
            <View
              style={[
                styles.button,
                {
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.signIn,
                  {
                    backgroundColor: '#8C6E63',
                    borderRadius: 40,
                    marginRight: 10,
                  },
                ]}
                onPress={() => back_question()}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}
                >
                  Back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.signIn,
                  {
                    backgroundColor: '#378C3C',
                    borderRadius: 40,
                    marginLeft: 10,
                  },
                ]}
                onPress={() => {
                  let ret = move_to_next()
                  // if(!ret){alert("Please select one of the above")}
                }}
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
          ) : (
            <View
              style={[
                styles.button,
                {
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.signIn,
                  {
                    backgroundColor: '#8C6E63',
                    borderRadius: 40,
                    marginRight: 10,
                  },
                ]}
                onPress={() => back_question()}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}
                >
                  Back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.signIn,
                  {
                    backgroundColor: '#378C3C',
                    borderRadius: 40,
                    marginLeft: 10,
                  },
                ]}
                onPress={() => next_question(ques)}
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
          )}
        </Animatable.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    // alignItems:'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    marginTop: 20,
  },
  stretch: {
    // width: SCREEN_WIDTH*0.5,
    // height: SCREEN_WIDTH*0.5,
    width:
      SCREEN_WIDTH > SCREEN_HEIGHT ? SCREEN_HEIGHT * 0.4 : SCREEN_WIDTH * 0.4,
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
    paddingVertical: 30,
    paddingBottom: 80,
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
    padding: normalize(6),
    marginTop: normalize(10),
    minHeight: normalize(40),
    maxHeight: 80,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: normalize(10),
    borderWidth: 1,
    borderColor: '#8d8d8d',
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
    position: 'absolute',
    alignItems: 'center',
    // bottom: 20,
    flex: 1,
    justifyContent: 'flex-end',
    bottom: SCREEN_WIDTH * 0.03,
    width: SCREEN_WIDTH * 0.3,
    marginLeft: SCREEN_WIDTH * 0.35,
    marginRight: SCREEN_WIDTH * 0.35,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
