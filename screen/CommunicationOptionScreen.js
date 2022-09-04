import React, { useContext, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Platform, 
    PixelRatio,
    Button,
    ScrollView
} from "react-native";
import * as Animatable from 'react-native-animatable';
import Modal from "react-native-modal";
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

export default function CommunicationOptionScreen({navigation}) {
   
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const {isLoading, emailUnsubscribe, is_subscribed, setIs_subscribed, emailSubscribe} = useContext(AuthContext);

    const subscribe_user = () => {
        emailSubscribe()
    }
    console.log(is_subscribed)
    return (
    <View style={styles.container}>
    <Animatable.View 
        animation="fadeInUpBig"
        style={[styles.footer, {
            backgroundColor: "rgb(235 235 235)"
        }]}
    >
       

        <View style={[styles.action_2, {backgroundColor: '#ffffff', justifyContent: 'space-between'}]}>
            <Text style={{fontWeight: 'bold', fontSize: normalize(19) }}>Email Opt out</Text>
            <Text style={{marginTop: 6,fontSize: normalize(14), width: "90%"}}>Opt Out of receiving future emails from SurveyOptimus. If you opt out, 
            you will not receive these email invitations and notifications from SurveyOptimus.</Text>
            <View style={[styles.button]}>
            {is_subscribed ? 
                <TouchableOpacity
                    onPress={toggleModal}
                    style={[styles.signIn, {
                        backgroundColor: '#378C3C',
                        color: '#fff'
                    }]}
                >
                 <Text style={[styles.textSign, {
                        color: '#fff'
                    }]}>Unsubscribe</Text>
                    
                </TouchableOpacity> 
                : 
                <TouchableOpacity
                    onPress={subscribe_user}
                    style={[styles.signIn, {
                        backgroundColor: '#378C3C',
                        color: '#fff'
                    }]}
                >
                 <Text style={[styles.textSign, {
                        color: '#fff'
                    }]}>Subscribe</Text>
                    
                </TouchableOpacity> 
            }
            </View>
        </View>


        <View style={[styles.action_2, {backgroundColor: '#ffffff', justifyContent: 'space-between'}]}>
            <Text style={{fontWeight: 'bold', fontSize: normalize(19),}}>Deactivate Account</Text>
            <Text style={{marginTop: 6,fontSize: normalize(14), width: "90%"}}>Deaccounting your account will disable your profile from SurveyOptimus.</Text>
            <View style={[styles.button]}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Deactivation Confirmation Screen')}
                    style={[styles.signIn, {
                        backgroundColor: '#378C3C',
                        color: '#fff'
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#fff'
                    }]}>Deactivate</Text>
                </TouchableOpacity>
            </View>
        </View>


        {/* modal */}
        <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
        <ScrollView>
            <View style={styles.modal_}>
                <Text style={{fontWeight: "600", fontSize: normalize(16)}}>Are you sure you want to Unsubscribe? </Text>
                <Text style={[styles.modal_sub_heading]}>Unsubscribing means you will no longer receive any email messages from SurveyOptimus which includes:</Text>
                <View>
                <Text style={[styles.modal_points, {marginTop: 10}]}>1. Invitations to surveys</Text>
                <Text style={styles.modal_points}>2. Redeem points request from us</Text>
                <Text style={styles.modal_points}>3. Newsletters and offers</Text>
                </View>
                <Text style={[styles.modal_sub_heading, {fontWeight: "600"}]}>Do you really want to miss out on offers like this ?</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10}}>
                <TouchableOpacity
                    style={[{
                        backgroundColor: '#9e9e9e',
                        color: '#fff',
                        width: SCREEN_WIDTH*0.27,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: "center",
                        borderRadius: 30,
                    }]}
                    onPress={() => {
                        toggleModal()
                    }}
                >
                    <Text style={[styles.textSign, {
                        color: '#fff'
                    }]}>Cancel</Text>
                </TouchableOpacity>
                    <TouchableOpacity
                    style={[{
                        backgroundColor: '#378C3C',
                        color: '#fff',
                        width: SCREEN_WIDTH*0.27,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: "center",
                        borderRadius: 30,
                    }]}
                    onPress={() => {
                        toggleModal()
                        navigation.navigate('Unsubscribe Reason Screen')
                    }}
                >
                    <Text style={[styles.textSign, {
                        color: '#fff'
                    }]}>Yes</Text>
                </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        </Modal>
    </Animatable.View>
  </View>
    );
  }


const styles = StyleSheet.create({
    modal_:{
        marginTop: SCREEN_HEIGHT*0.21,
        backgroundColor: '#fff', 
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    modal_btn:{
        backgroundColor: "#9e9e9e",
        width: SCREEN_WIDTH*0.2,
        color: '#378C3C',
        borderRadius: 40,
        fontSize: normalize(15)
    },
    modal_sub_heading: {
        fontSize: normalize(15), 
        marginTop: 10
    },
    modal_points:{
        fontWeight: "400", 
        fontSize: normalize(13),
    },
    container: {
        flex: 1, 
        backgroundColor: '#FAFAFA',
        flexDirection:'row',
        // alignItems:'center',
        justifyContent:'center',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    },
    stretch: {
        width: SCREEN_WIDTH*0.5,
        height: SCREEN_WIDTH*0.5,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
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
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
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
    action_2: {
        marginTop: normalize(15),
        // maxHeight: "justifyContent",
        flexDirection:'column',
        alignItems:'center',
        // justifyContent:'center',
        borderRadius: normalize(10),
        paddingLeft: 3,
        paddingRight: 3,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0},
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        shadowRadius: 5,
        shadowOpacity: 1,
        borderRadius: 10,
    },
    action: {
        marginTop: normalize(8),
        // maxHeight: "justifyContent",
        flexDirection:'column',
            alignItems:'center',
            // justifyContent:'center',
        borderRadius: normalize(10),
        paddingLeft: 3,
        paddingRight: 3,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0},
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        shadowRadius: 5,
        shadowOpacity: 1,
        borderRadius: 10,
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
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: normalize(10),
    },
    signIn: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    textSign: {
        fontSize: 20,
    },
  });
