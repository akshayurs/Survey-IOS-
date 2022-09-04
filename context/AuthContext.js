import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL, X_ACCESS_TOKEN } from "../config";
// import {NetworkInfo} from 'react-native-network-info';
import publicIP from 'react-native-public-ip';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [getIP, setIP] = useState();
  publicIP()
  .then(ip => {    
    console.log(ip);
    setIP(ip)
    // '47.122.71.234'
  })
  .catch(error => {
    console.log(error);
    // 'Unable to get IP address.'
  });

  // NetworkInfo.getIPAddress().then(ipAddress => {
  //   setIP(ipAddress)
  // });
  // console.log(getIP)
  
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [surveyQuestion, setSurveyQuestion] = useState({});
  const [trans_history, setTrans_history] = useState([]);
  const [panelist_basic_details, setPanelist_basic_details] = useState(null);
  const [is_subscribed, setIs_subscribed] = useState(true);
  const [temp_password, setTemp_password] = useState("");
  const [regCre, setRegCre] = useState(null);

  const panelist_profiling_ans = (ans_key) => {
    const data = JSON.stringify(ans_key);
    console.log(ans_key);
    axios
      .post(
        `${BASE_URL}/setProfilingAnswer/${parseInt(
          userInfo.Result.panelistID
        )}`,
        data,
        {
          Headers: {
            "Content-Type": "application/json",
            "x-access-token": X_ACCESS_TOKEN,
            "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS",
          },
        }
      )
      .then((res) => {
        let responce = res.data;
        console.log(responce);
        panelistBasicDetails_func(parseInt(userInfo.Result.panelistID))
        // alert(res.data.message)
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`login error ${e}`);
        alert(`error ${e}`);
        setIsLoading(false);
      });
  };

  const avatar_set = (avatar_name) => {
    console.log(avatar_name);
    const data = JSON.stringify({
      is_avatar: 1,
      avatar_name: avatar_name,
    });

    axios
      .post(
        `${BASE_URL}/setAvatar/${parseInt(userInfo.Result.panelistID)}`,
        data,
        {
          Headers: {
            "Content-Type": "application/json",
            "x-access-token": X_ACCESS_TOKEN,
          },
        }
      )
      .then((res) => {
        let userInfo = res.data;
        console.log(userInfo);
        alert(res.data.message);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`login error ${e}`);
        alert(`error ${e}`);
        setIsLoading(false);
      });
  };

  const redeem_request = (redeem_points, redeem_mode) => {
    const data = JSON.stringify({
      panelistID: `${userInfo.Result.panelistID}`,
      redeem_points: `${redeem_points}`,
      redeem_mode: `${redeem_mode}`,
    });

    axios
      .post(`${BASE_URL}/redeemRequest`, data, {
        Headers: {
          "Content-Type": "application/json",
          "x-access-token": "3b5Udae8brA5yuXA7C3ZCnWVvwFUXPRB",
          "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS",
        },
      })
      .then((res) => {
        let userInfo = res.data;
        console.log(userInfo);
        alert(res.data.message);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`login error ${e}`);
        alert(`error ${e}`);
        setIsLoading(false);
      });
  };

  const update_profile = (
    firstname,
    lastname,
    date,
    gender,
    add1,
    add2,
    city,
    state,
    country,
    zip,
    phone,
    code,
    navigation
  ) => {
    console.log(firstname);
    console.log(lastname);
    console.log(date);
    console.log(gender);
    console.log(add1);
    console.log(add2);
    console.log(city);
    console.log(state);
    console.log(country);
    console.log(zip);
    console.log(phone);
    setIsLoading(true);
    const data = JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      dob: date,
      gender: gender,
      address1: add1,
      address2: add2,
      countryId: 100,
      state: state,
      city: city,
      zipcode: zip,
      phone: phone,
    });
    console.log(data);
    console.log(panelist_basic_details.Results.panelistID);
    axios
      .post(
        `${BASE_URL}/setBasicProfiling/${parseInt(
          panelist_basic_details.Results.panelistID
        )}`,
        data,
        {
          Headers: {
            "Content-Type": "application/json",
            "x-access-token": X_ACCESS_TOKEN,
            "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS",
          },
        }
      )
      .then((res) => {
        let userInfo = res.data;
        console.log(userInfo);
        alert(res.data.message);
        if (code == 1) {
          console.log(temp_password);
          login_after_update_profile(
            panelist_basic_details.Results.email,
            temp_password
          );
          navigation.navigate("User Profile Survey");
          if (userInfo.message == "success") {
            navigation.navigate("User Profile Survey");
          }
        }
        setIsLoading(false);
        return res.date;
      })
      .catch((e) => {
        console.log(`Update Profile error ${e}`);
        alert(`Update Profile error ${e}`);
        setIsLoading(false);
      });
  };

  const emailUnsubscribe = (
    unsubscribe_code,
    feedback_option_code,
    feedback_message
  ) => {
    setIsLoading(true);
    let data = "";
    feedback_option_code !== 6
      ? (data = JSON.stringify({
          unsubscribe_code: unsubscribe_code,
          feedback_option_code: feedback_option_code,
        }))
      : (data = JSON.stringify({
          unsubscribe_code: unsubscribe_code,
          feedback_option_code: feedback_option_code,
          feedback_message: feedback_message,
        }));
    console.log(data);
    console.log(parseInt(userInfo.Result.panelistID));
    axios
      .post(
        `${BASE_URL}/unsubscribes/${parseInt(userInfo.Result.panelistID)}`,
        data,
        {
          Headers: {
            "Content-Type": "application/json",
            "x-access-token": X_ACCESS_TOKEN,
          },
        }
      )
      .then((res) => {
        let userInfo = res.data;
        console.log(userInfo);
        alert(res.data.message);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const emailSubscribe = () => {
    setIsLoading(true);
    let data = JSON.stringify({
      unsubscribe_code: 1,
    });
    console.log(data);
    console.log(parseInt(userInfo.Result.panelistID));
    axios
      .post(
        `${BASE_URL}/subscribes/${parseInt(userInfo.Result.panelistID)}`,
        data,
        {
          Headers: {
            "Content-Type": "application/json",
            "x-access-token": X_ACCESS_TOKEN,
          },
        }
      )
      .then((res) => {
        let info = res.data;
        console.log(info);
        alert(res.data.message);
        setIs_subscribed(true);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const changePassword = (curr_pass, new_pass, conf_new_pass) => {
    setIsLoading(true);
    const data = JSON.stringify({
      current_passwrod: curr_pass,
      new_password: new_pass,
      confirm_new_password: conf_new_pass,
    });
    console.log(userInfo.Result.panelistID);
    axios
      .post(
        `${BASE_URL}/changePassword/${parseInt(userInfo.Result.panelistID)}`,
        data,
        {
          Headers: {
            "x-access-token": "3b5Udae8brA5yuXA7C3ZCnWVvwFUXPRB",
          },
        }
      )
      .then((res) => {
        let userInfo = res.data;
        console.log(userInfo);
        alert(res.data.message);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const survey_question_func = () => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/getCountryQuestion/232/536`)
      .then((res) => {
        let questions = res.data;
        setSurveyQuestion(questions);
        console.log(questions);
        // AsyncStorage.setItem('surveyQuestion', JSON.stringify(surveyQuestion));
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

  const register = (
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    navigation
  ) => {
    setIsLoading(true);

    const data = JSON.stringify({
      email: email,
      password: password,
      subscription: 1,
      registration_mode: 12,
      ipaddress: `${getIP}`,
      firstName: firstName,
      lastName: lastName,
      isMobile: 1,
    });

    console.log(data);

    axios
      .post(`${BASE_URL}/registration`, data)
      .then((res) => {
        let userInfo = res.data;
        setRegCre(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
        alert(userInfo.message);
        if (userInfo.message == "failure") {
          return false;
        } else {
          navigation.navigate("Presonal Details Screen");
          console.log(userInfo);
        }
        return true;
      })
      .catch((e) => {
        console.log(`register error ${e}`);
        setIsLoading(false);
        alert(e);
        return false;
      });
  };

  const login_via_google = (email, displayPicture, isverified, userName) => {
    setIsLoading(true);
    const data = JSON.stringify({
      email: email,
      displayPicture: displayPicture,
      isverified: isverified,
      registration_mode: 14,
      isMobile: 1,
      ipaddress: "122.160.80.18",
      userName: userName,
    });
    console.log(data);
    axios
      .post(`${BASE_URL}/googleapp`, data, {
        Headers: {
          "Content-Type": "application/json",
          "x-access-token": X_ACCESS_TOKEN,
        },
      })
      .then((res) => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };


  const login_to_update_profile_question = (email) => {
    setIsLoading(true);
    if(temp_password != null){
    const data = JSON.stringify({
      email: email,
      password: temp_password,
    });
    console.log(data);
    axios
      .post(`${BASE_URL}/login`, data, {
        Headers: {
          "Content-Type": "application/json",
          "x-access-token": X_ACCESS_TOKEN,
        },
      })
      .then((res) => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        console.log("Hey I am a new User and I am logged In");
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
    }
  };
  

  const login_after_update_profile = (email, password) => {
    setIsLoading(true);
    const data = JSON.stringify({
      email: email,
      password: password,
    });
    setTemp_password(password)
    console.log(data);
    axios
      .post(`${BASE_URL}/login`, data, {
        Headers: {
          "Content-Type": "application/json",
          "x-access-token": X_ACCESS_TOKEN,
        },
      })
      .then((res) => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        console.log("Hey I am a new User and I am logged In");
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const login = (email, password, navigation) => {
    setIsLoading(true);
    const data = JSON.stringify({
      email: email,
      password: password,
    });
    console.log(data);
    setTemp_password(password)
    axios
      .post(`${BASE_URL}/login`, data, {
        Headers: {
          "Content-Type": "application/json",
          "x-access-token": X_ACCESS_TOKEN,
        },
      })
      .then((res) => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        panelistBasicDetails_func(userInfo.Result.panelistID) // to update current profile percentage
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        if (userInfo.status != "failure") {
          navigation.navigate("Profile Survey");
        } else {
          alert("Wrong Credentials");
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`login error ${e}`);
        alert("Wrong Credentials");
        setIsLoading(false);
      });
  };

  const logout = (email, navigation) => {
    setIsLoading(true);
    const data = JSON.stringify({
      email: email,
    });
    axios
      .post(`${BASE_URL}/logout`, data, {
        Headers: {
          "Content-Type": "application/json",
          "x-access-token": X_ACCESS_TOKEN,
        },
      })
      .then((res) => {
        console.log(res.data);
        AsyncStorage.removeItem("userInfo");
        setUserInfo({});
        navigation.navigate("Sign In Screen");
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const forgotpassword = (email) => {
    setIsLoading(true);
    const data = JSON.stringify({
      email: email,
    });
    axios
      .post(`${BASE_URL}/forgotpassword`, data, {
        Headers: {
          "Content-Type": "application/json",
          "x-access-token": X_ACCESS_TOKEN,
        },
      })
      .then((res) => {
        console.log(res.data);
        AsyncStorage.removeItem("userInfo");
        setUserInfo({});
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUserInfo(userInfo);
        console.log(userInfo);
        panelistBasicDetails_func(userInfo.Result.panelistID);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  const panelistBasicDetails_func = (panelistID) => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/getBasicProfiling/${parseInt(panelistID)}`)
      .then((res) => {
        let details = res.data;
        console.log(details);
        setPanelist_basic_details(details);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
        forgotpassword,
        surveyQuestion,
        survey_question_func,
        survey_question_func,
        surveyQuestion,
        changePassword,
        emailUnsubscribe,
        trans_history,
        panelist_basic_details,
        panelistBasicDetails_func,
        update_profile,
        redeem_request,
        avatar_set,
        panelist_profiling_ans,
        login_via_google,
        is_subscribed,
        setIs_subscribed,
        emailSubscribe,
        panelist_basic_details,
        setTemp_password,
        regCre,
        login_to_update_profile_question,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
