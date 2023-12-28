import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, ImageBackground, Dimensions } from 'react-native'
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../store/auth-context';
import { login } from '../../util/auth';

const height = Dimensions.get("screen").height;
const wid = Dimensions.get("screen").width;


const Login = () => {
    const authCtx = useContext(AuthContext);
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function Running({ email, password }) {
        try {
            const token = await login(email, password);
            authCtx.authenticate(token);
        }
        catch (error) {
            Alert.alert("Authentication Failed", 'Could not log you in.Please check your credentials or try again later')
        }
        setEmail('');
        setPassword('');
    }



    return (

        <ImageBackground source={require('../../assets/bg.jpg')} style={{ flex: 1 }} imageStyle={{ height: height, width: wid, position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }} >

            <View style={styles.container}>
                <Text style={{ fontWeight: "bold", fontSize: 26 }}>Login</Text>
                <View style={{ marginTop: 40, margin: 40 }}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Enter Email'
                        value={email}
                        onChangeText={(txt) => setEmail(txt)}
                        autoCapitalize='none'
                        autoCorrect={false}



                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Password'
                        value={password}
                        onChangeText={(txt) => setPassword(txt)}
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}


                    />
                </View>
                <View>
                    <TouchableOpacity onPress={() => Running({ email, password })} >
                        <View style={{ height: 40, width: 300, backgroundColor: "black", justifyContent: "center", alignItems: "center", borderRadius: 7 }}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
                                SignIn
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('createuser')} style={{ marginTop: 20 }}>
                        <View style={{ height: 40, width: 300, backgroundColor: "black", justifyContent: "center", alignItems: "center", borderRadius: 7 }}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
                                New User
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>

    )
}

export default Login;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        height: 50,
        width: 300,
        margin: 10,
        borderColor: "black",
        borderWidth: 1,
        textAlign: "center"
    }
})




























































{/*

const createUser = () => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                Alert.alert('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    Alert.alert('That email address is invalid!');
                }

                Alert.alert(error);
            });
    }


*/}