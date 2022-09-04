import React, { useContext, useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    Platform, 
    PixelRatio,
    ScrollView,
    Alert
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios'
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

var {width: SCREEN_WIDTH, height: SCREEN_HEIGHT,} = Dimensions.get('window');
const scale = SCREEN_WIDTH / 320;
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

export default function DashboardScreen({navigation}) {

    const [isFirstLaunch, setIsFirstTimeLaunch] = useState(null)
    const [salutation, setSalalutaion] = useState("Morning");
    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then(value => {
            if(value == null){
                AsyncStorage.setItem('alreadyLaunched', 'true')
                setIsFirstTimeLaunch(true)
            }else{
                setIsFirstTimeLaunch(false)
            }
        })
        const date = new Date();
        const hour = date.getHours()
        if(hour < 12) {
            setSalalutaion("Morning");
            } else if(hour > 12 && hour < 16) {
                setSalalutaion("Afternoon");
            } else {
                setSalalutaion("Evening");
            }
    },[])

    const {userInfo, panelist_basic_details} = useContext(AuthContext);
    console.log(panelist_basic_details)
    const [comments,setComments]=useState(null)
    const [link, setLink] = useState(null)
    useEffect(() => {
      fetchComments();
    }, [])
    useEffect(() => {
      console.log(comments)
    }, [comments])
    const fetchComments=async()=>{
    // const response=await axios(`${BASE_URL}/surveyListing/${parseInt(userInfo.Result.panelistID)}`);
    axios.get(`${BASE_URL}/surveyListing/${parseInt(userInfo.Result.panelistID)}`)
    .then(res => {
      setComments(res.data.Results)
    })
    .catch(e => {
      console.log(`register error ${e}`);
      setIsLoading(false);
    });
      
    }
    console.log(comments)
    // if(link ==  null){
        return (
        <ScrollView showsVerticalScrollIndicator ={false} contentContainerStyle={{ flex: 1 }}>
        <View style={styles.container}>
            <View>
                <Text style={styles.header}>Good {salutation}, {userInfo.Result && userInfo.Result.firstname}</Text>
            </View>
            {/* heading */}
            <View style={{display:'flex', flexDirection:'row', justifyContent: 'space-between', marginBottom: 6}}>
                <Text style={{color: '#378C3C', marginTop:10, textAlign: "center", fontSize:normalize(15), }}>Dashboard</Text>
                <Image
                        style={{width: 27, height: 27, marginRight: 15}}
                        source={{uri:  `${userInfo && userInfo.Result && userInfo.Result.profilePic}`}}
                />
            </View>
            <View style={styles.points}>
                <View style={styles.center}>
                    <Text style={styles.text_box_black_header}>My Points</Text>
                    <Text style={styles.text_box_black_points}>{panelist_basic_details == null ? userInfo.Result && userInfo.Result.current_point : panelist_basic_details.Results.current_point}</Text>
                </View>
                <View style={styles.center}>
                    <Text style={styles.text_box_black_header}>My Profile</Text>
                    <Text style={styles.text_box_black_points}>{panelist_basic_details == null ? userInfo.Result && userInfo.Result.profilePercentage : panelist_basic_details.Results.profilePercentage}%</Text>
                </View>
            </View>

            {
                comments && comments.map((ele) => {
                    console.log(ele);
                    return (
                        <View style={styles.products} key={ele.survey_id}>
                        <View style={[styles.center, {justifyContent: "space-between"}]}>
                            <Text style={{ fontSize: normalize(16), paddingLeft: 10}}>{ele.survey_title}</Text>
                            <View style={{flex: 1,display:'flex', flexDirection:'row', justifyContent: "space-around"}}>
                                <View style={{padding: 10, alignItems: 'center', paddingBottom: 4}}>
                                    <Image source={require('../assets/LOI.png')} style={styles.product_sml_icon_1}></Image>
                                    <Text style={styles.points_}>{ele.survey_duration}<Text style={{fontWeight: "400", fontSize: normalize(14)}}>min</Text></Text>
                                </View>
                                <View style={{padding: 10, alignItems: 'center',paddingBottom: 4}}>
                                    <Image source={require('../assets/reward_Gr.png')} style={styles.product_sml_icon_2}></Image>
                                    <Text style={styles.points_}>{ele.survey_incentive}<Text style={{fontWeight: "400", fontSize: normalize(14)}}>pts</Text></Text>
                                </View>
                            </View>
                            <View style={{alignItems: 'center', borderRadius: '50'}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setLink(ele.survey_link)
                                        navigation.navigate('Web View', {link: ele.survey_link})}
                                    // onPress={() => {navigation.navigate("")setLink(ele.survey_link)}
                                        }
                                    style={[styles.survey_button, {
                                        backgroundColor: '#378C3C',
                                    }]}
                                >
                                    <Text style={[styles.textSign, {
                                        color: '#fff'
                                    }   ]}>Take Survey</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.center, {width: "50%"}]}> 
                            <Image
                                style={{width: 115, height: 115, alignItems: 'center', marginTop: 0}}
                                source={require('../assets/health.png')}
                            />
                        </View>
                    </View>
                    )
                })
            }
        </View>
        </ScrollView>
        );
        // }else{
        //     console.log(link)
        //     return (
        //         <WebViewScreen link={link}></WebViewScreen>
        //     )
        // }
      }


const styles = StyleSheet.create({
    points_:{
        color: '#000000', 
        textAlign: "center", 
        fontSize: normalize(14), 
        fontWeight: '500'
    },
    header:{
        color: '#000000', 
        marginTop:14, 
        fontSize:normalize(19),
    },
    container: {
        marginTop: 20,
        backgroundColor: '#FAFAFA',
        padding: 10,
        flexDirection: "column",
        minHeight: SCREEN_HEIGHT,
        minWidth: SCREEN_WIDTH,
      },
    text_box_black_header: {
        color: '#fff', 
        marginTop:10, 
        fontWeight: "200",
        textAlign: "center", 
        fontSize:normalize(15),
    },
    text_box_black_points: {
        color: '#fff', 
        textAlign: "center", 
        fontSize: normalize(23),
    },
    product_sml_icon_1:{
        height: 30,
        width: 25,
        maxHeight: 30,
        maxWidth: 30,
    },
    product_sml_icon_2:{
        height: 30,
        width: 30,
        maxHeight: 30,
        maxWidth: 30,
    },
    stretch: {
        width: 25,
        height: 25,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        backgroundColor: 'rgb(235 235 235)',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        marginTop: normalize(5),
        maxHeight: 50,
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        // justifyContent:'center',
        borderRadius: normalize(10),
        borderWidth: 1,
        borderColor: "black",
        paddingLeft: 3,
        paddingRight: 3,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
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
    survey_button:{
        width: '100%',
        minHeight: 30,
        maxHeight: 40,
        justifyContent: 'center',
        height: 150,
        alignItems: 'center',
        borderRadius: 20,
        padding: normalize(8),
        backgroundColor: '#4cb050',
        marginBottom: 5,
    },
    textSign: {
        fontSize: normalize(15),
        fontWeight: "500",
        paddingLeft: 10,
        paddingRight: 10
    },
    center :{
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
        flex:1, 
    },
    points: {
        display:'flex', 
        flexDirection:'row', 
        justifyContent: 'space-evenly', 
        backgroundColor: '#1a1a1a', 
        alignContent: "center",
        // height: 'justifyContent',
        paddingLeft: normalize(5),
        paddingRight: normalize(5),
        borderRadius: 20,
    },
    items:{
        height: 190,
        display:'flex', 
        flexDirection:'row', 
        justifyContent: 'space-evenly', 
        backgroundColor: '#fff', 
        alignContent: "center",
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
        height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 1.0
    },
    products: {
        paddingTop: 4,
        paddingBottom: 4,
        width: SCREEN_WIDTH*0.94,
        alignSelf: "center",
        backgroundColor: '#fff',
        minHeight:140,
        display:'flex',
        flexDirection:'row', 
        justifyContent: "space-evenly",
        borderRadius: 10,
        marginTop: normalize(10),
        borderColor: 'black',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0},
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        shadowRadius: 2,
        shadowOpacity: 1,
    }
  });
