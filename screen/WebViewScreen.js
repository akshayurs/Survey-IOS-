import React from 'react'
import {Platform, View} from 'react-native'
import { WebView } from 'react-native-webview';

function WebViewScreen({ route, navigation }) {
    const { link } = route.params;
    let uri = JSON.stringify(link);
    console.log(uri)
    console.log(navigation)
    console.log(uri)
    console.log(link)
        return (
        Platform.OS === "web" ? (
        <iframe src={link} height={'100%'} width={'100%'} />
        ) : (
        <View style={{ flex: 1 }}>
            <WebView
            source={{ uri: `${link}` }}
            style={{marginTop: 22, flex: 1}}
            />
        </View>
        )
    );
}

export default WebViewScreen