import { View, Text, ImageBackground, Dimensions } from 'react-native'
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../store/auth-context';
const height = Dimensions.get("screen").height;
const wid = Dimensions.get("screen").width;
const Welcome = () => {
    const [fetchedMessage, setFetchedMessage] = useState(' ');
    const authCtx = useContext(AuthContext);

    const token = authCtx.token;



    useEffect(() => {
        axios.get('https://auth2-a2175-default-rtdb.firebaseio.com/message.json?auth=' + token).then((response) => {
            setFetchedMessage(response.data)
        })
    }, [token])
    return (
        <ImageBackground source={require('../../assets/bg.jpg')} style={{ flex: 1 }} imageStyle={{ height: height, width: wid, position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }} >
            <View style={{ flex: 1 }}>
                <Text>Welcome</Text>
                <Text>{fetchedMessage}</Text>
            </View>
        </ImageBackground>
    )
}

export default Welcome