import React from 'react';

import { View, Platform } from 'react-native';
import WebView from 'react-native-webview';

export default function FAQs () {


    return (
      Platform.OS === "web" ? (
        <iframe src="https://surveyoptimus.com/faq" height={'100%'} width={'100%'} />
      ) : (
        <View style={{ flex: 1 }}>
          <WebView
            source={{ uri: "https://surveyoptimus.com/faq" }}
            style={{marginTop: 22, flex: 1}}
          />
        </View>
      )
    );
  }
