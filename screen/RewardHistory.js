// import React, { useState, useEffect, useContext } from "react";
// import {
//     StyleSheet,
//     Text,
//     View,
//     Image,
//     TextInput,
//     TouchableOpacity,
//     Dimensions,
//     Platform, 
//     PixelRatio,
//     ScrollView,
//     Container,
//     stylesGrid 
// } from "react-native";
// import {Avatar} from 'react-native-paper';
// import * as Animatable from 'react-native-animatable';
// import { BASE_URL } from "../config";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";

// var {width: SCREEN_WIDTH, height: SCREEN_HEIGHT,} = Dimensions.get('window');
// const scale = SCREEN_WIDTH / 320;
// console.log(SCREEN_HEIGHT)
// console.log(SCREEN_WIDTH)
// export function normalize(size) {
//     const newSize = size * scale 
//     if (Platform.OS === 'ios') {
//       return Math.round(PixelRatio.roundToNearestPixel(newSize))
//     } else {
//       return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
//     }
// }

// export default function RewardHistory({navigation}) {

//     const {userInfo} = useContext(AuthContext);
//     console.log(userInfo)
//     const [comments,setComments]=useState(null)
//     useEffect(() => {
//       fetchComments();
//     }, [])
//     useEffect(() => {
//       console.log(comments)
//     }, [comments])
//     const fetchComments=async()=>{
//     const response=await axios(`${BASE_URL}/getReward/${parseInt(userInfo.Result && userInfo.Result.panelistID)}`);
//     setComments(response.data.redeemHistory)    
//     }

//     console.log(comments)

//     return (
//     <ScrollView showsVerticalScrollIndicator ={false}>
//     <View style={styles.container}>
//     <Animatable.View 
//         animation="fadeInUpBig"
//         style={[styles.footer, {
//             backgroundColor: "rgb(235 235 235)"
//         }]}
//     >

//     {
//         comments && comments.map((ele, val) => {
//             return(
//                 <View style={styles.products} key={val}>
//             <View style={[styles.center, {width: "50%", paddingTop: 5}]}>
//                 <View style={{alignItems: 'center', marginTop: 0}}>
//                     <Image
//                         style={[styles.stretch]}
//                         source={{uri: `${ele.mode_picture}`}}
//                     />
//                     {/* <Text style={[{textAlign: 'center', fontWeight: '500', fontSize: normalize(16)}]}>{ele.mode_name}</Text> */}
//                 </View>
//             </View>
//             <View style={styles.center}>
//                 {/* <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{ele.mode_name}</Text> */}
//                 <Text style={[styles.reward_his_text,{}]}><Text style={{fontWeight: '600'}}>Redeem Points</Text> : {ele.redeem_points}</Text>
//                 <Text style={[styles.reward_his_text,{}]}><Text style={{fontWeight: '600'}}>Voucher worth</Text> : {ele.currency_sign} {ele.worth}</Text>
//                 <Text style={[styles.reward_his_text,{}]}><Text style={{fontWeight: '600'}}>Trans ID</Text> : {ele.transaction_id}</Text>
//                 <Text style={[styles.reward_his_text,{}]}><Text style={{fontWeight: '600'}}>Date</Text> : {ele.request_date}</Text>
//                 <Text style={[styles.reward_his_text,{}]}><Text style={{fontWeight: '600'}}>Status</Text> : {ele.status}</Text>
//             </View>
//         </View>

//             )
//         })
//     }

        
//         {/* dummy data */}
//         {/* <View style={styles.products}>
//             <View style={[styles.center, {width: "50%"}]}>
//                 <View style={{alignItems: 'center'}}>
//                     <Image
//                         style={[styles.stretch]}
//                         source={require("../assets/amazon_gift.png")}
//                     />
//                     <View style={styles.button}>
//                         <TouchableOpacity
//                             onPress={() => navigation.navigate('SignUpScreen')}
//                             style={[styles.signIn, {
//                                 backgroundColor: '#8C6E63',
//                             }]}
//                         >
//                             <Text style={[styles.textSign, {
//                                 color: '#fff'
//                             }]}>Processing</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//             <View style={styles.center}>
//                 <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Amazon</Text>
//                 <Text style={{textAlign: 'center'}}>Redeem Points : </Text>
//                 <Text style={{textAlign: 'center'}}>Voucher worth : </Text>
//                 <Text style={{textAlign: 'center'}}>Trans ID : </Text>
//                 <Text style={{textAlign: 'center'}}>Date : </Text>
//             </View>
//         </View> */}


//     </Animatable.View>
//   </View>
//   </ScrollView>
//     );
//   }


// const styles = StyleSheet.create({
//     reward_his_text:{
//         fontSize: normalize(14)
//     },
//     container: {
//         flex: 1, 
//         backgroundColor: '#FAFAFA',
//         justifyContent:'center',
//         mimWidth: SCREEN_WIDTH,
//         minHeight: SCREEN_HEIGHT
//     },
//     stretch: {
//         width: SCREEN_WIDTH*0.4,
//         height: 100,
//         alignSelf: 'center',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 7
//     },
//     header: {
//         flex: 1,
//         justifyContent: 'flex-end',
//         paddingHorizontal: 20,
//         paddingBottom: 50
//     },
//     footer: {
//         flex: 1,
//         backgroundColor: 'rgb(235 235 235)',
//         paddingHorizontal: 20,
//     },
//     text_header: {
//         color: '#fff',
//         fontWeight: 'bold',
//         fontSize: 30
//     },
//     text_footer: {
//         color: '#05375a',
//         fontSize: 18
//     },
//     action: {
//         marginTop: normalize(5),
//         maxHeight: 50,
//         flex:1,
//         flexDirection:'row',
//         alignItems:'center',
//         // justifyContent:'center',
//         borderRadius: normalize(10),
//         borderWidth: 1,
//         borderColor: "black",
//         paddingLeft: 3,
//         paddingRight: 3,
//     },
//     actionError: {
//         flexDirection: 'row',
//         marginTop: 10,
//         borderBottomColor: '#FF0000',
//         paddingBottom: 5
//     },
//     textInput: {
//         height: normalize(20),
//         flex: 1,
//         paddingLeft: 10,
//         color: '#05375a',
//     },
//     errorMsg: {
//         color: '#FF0000',
//         fontSize: 14,
//     },
//     button: {
//         alignItems: 'center',
//         marginTop: normalize(5),
//         height: normalize(30),
//     },
//     signIn: {
//         width: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 3,
//     },
//     textSign: {
//         fontSize: 18,
//         fontWeight: "500",
//     },
//     center :{
//         // justifyContent: 'center', //Centered vertically
//         // alignItems: 'center', // Centered horizontally
//         flex:1, 
//         paddingTop: 5,
//     },
//     points: {
//         display:'flex', 
//         flexDirection:'row', 
//         justifyContent: 'space-evenly', 
//         backgroundColor: '#1a1a1a', 
//         alignContent: "center",
//         // height: 'justifyContent',
//         paddingLeft: normalize(5),
//         paddingRight: normalize(5),
//         borderRadius: 10,
//     },
//     items:{
//         display:'flex', 
//         flexDirection:'row', 
//         justifyContent: 'space-evenly', 
//         backgroundColor: '#fff', 
//         alignContent: "center",
//         // height: 'justifyContent',
//         paddingLeft: normalize(5),
//         paddingRight: normalize(5),
//         borderRadius: 10,
//         marginTop: normalize(10),
//         borderColor: 'black',
//         borderRadius: 10,
//         padding: 10,
//         shadowColor: '#000000',
//         shadowOffset: {
//         width: 0,
//         height: 1
//         },
//         shadowRadius: 5,
//         shadowOpacity: 1.0
//     },
//     products: {
//         marginTop: 10,
//         backgroundColor: '#fff',
//         // height: 'justifyContent',
//         display:'flex',
//         flexDirection:'row', 
//         borderRadius: 10,
//         marginTop: normalize(10),
//         borderColor: 'black',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 0},
//         shadowOpacity: 0.8,
//         shadowRadius: 2,  
//         elevation: 5,
//         shadowRadius: 5,
//         shadowOpacity: 1,
//     }
//   });








import React, { useState, useEffect, useContext } from "react";
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
    Container,
    stylesGrid 
} from "react-native";
import {Avatar} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { BASE_URL } from "../config";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

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

export default function RewardHistory({navigation}) {

    const {userInfo} = useContext(AuthContext);
    console.log(userInfo)
    const [comments,setComments]=useState(null)
    useEffect(() => {
      fetchComments();
    }, [])
    useEffect(() => {
      console.log(comments)
    }, [comments])
    const fetchComments=async()=>{
    const response=await axios(`${BASE_URL}/getReward/${parseInt(userInfo.Result && userInfo.Result.panelistID)}`);
    setComments(response.data.redeemHistory)    
    }

    console.log(comments)

    return (
    <ScrollView showsVerticalScrollIndicator ={false}>
    <View style={styles.container}>
    <Animatable.View 
        animation="fadeInUpBig"
        style={[styles.footer, {
            backgroundColor: "rgb(235 235 235)"
        }]}
    >

    {
        comments && comments.map((ele, val) => {
            return(
                <View style={styles.products} key={val}>
            <View style={[styles.center, {width: "50%", paddingTop: 5}]}>
                <View style={{alignItems: 'center', marginTop: 0}}>
                    <Image
                        style={[styles.stretch]}
                        source={{uri: `${ele.mode_picture}`}}
                    />
                    <Text style={[{textAlign: 'center', fontWeight: '500', fontSize: normalize(16)}]}>{ele.mode_name}</Text>
                </View>
            </View>
            <View style={styles.center}>
                {/* <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{ele.mode_name}</Text> */}
                <Text style={[styles.reward_his_text,{}]}><Text style={{fontWeight: '600'}}>Redeem Points</Text> : {ele.redeem_points}</Text>
                <Text style={[styles.reward_his_text,{}]}><Text style={{fontWeight: '600'}}>Voucher worth</Text> : {ele.currency_sign} {ele.worth}</Text>
                <Text style={[styles.reward_his_text,{}]}><Text style={{fontWeight: '600'}}>Trans ID</Text> : {ele.transaction_id}</Text>
                <Text style={[styles.reward_his_text,{}]}><Text style={{fontWeight: '600'}}>Date</Text> : {ele.request_date}</Text>
                <Text style={[styles.reward_his_text,{}]}><Text style={{fontWeight: '600'}}>Status</Text> : {ele.status}</Text>
            </View>
        </View>

            )
        })
    }

        
        {/* dummy data */}
        {/* <View style={styles.products}>
            <View style={[styles.center, {width: "50%"}]}>
                <View style={{alignItems: 'center'}}>
                    <Image
                        style={[styles.stretch]}
                        source={require("../assets/amazon_gift.png")}
                    />
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignUpScreen')}
                            style={[styles.signIn, {
                                backgroundColor: '#8C6E63',
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Processing</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.center}>
                <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Amazon</Text>
                <Text style={{textAlign: 'center'}}>Redeem Points : </Text>
                <Text style={{textAlign: 'center'}}>Voucher worth : </Text>
                <Text style={{textAlign: 'center'}}>Trans ID : </Text>
                <Text style={{textAlign: 'center'}}>Date : </Text>
            </View>
        </View> */}


    </Animatable.View>
  </View>
  </ScrollView>
    );
  }


const styles = StyleSheet.create({
    reward_his_text:{
        fontSize: normalize(14)
    },
    container: {
        flex: 1, 
        backgroundColor: '#FAFAFA',
        justifyContent:'center',
        mimWidth: SCREEN_WIDTH,
        minHeight: SCREEN_HEIGHT
    },
    stretch: {
        width: SCREEN_WIDTH*0.4,
        height: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 1,
        backgroundColor: 'rgb(235 235 235)',
        paddingHorizontal: 20,
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
        marginTop: normalize(5),
        height: normalize(30),
    },
    signIn: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
    },
    textSign: {
        fontSize: 18,
        fontWeight: "500",
    },
    center :{
        // justifyContent: 'center', //Centered vertically
        // alignItems: 'center', // Centered horizontally
        flex:1, 
        paddingTop: 5,
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
        borderRadius: 10,
    },
    items:{
        display:'flex', 
        flexDirection:'row', 
        justifyContent: 'space-evenly', 
        backgroundColor: '#fff', 
        alignContent: "center",
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
        height: 1
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    products: {
        marginTop: 10,
        backgroundColor: '#fff',
        // height: 'justifyContent',
        display:'flex',
        flexDirection:'row', 
        borderRadius: 10,
        marginTop: normalize(10),
        borderColor: 'black',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0},
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        shadowRadius: 5,
        shadowOpacity: 1,
    }
  });