import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ImageBackground, Dimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import { createUser } from '../../util/auth';
import { AuthContext } from '../../store/auth-context';


const height = Dimensions.get("screen").height;
const wid = Dimensions.get("screen").width;
const NewUser = () => {
    const authCtx = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');


    function checkFunction({ email, password, repassword }) {
        try {
            if (password === repassword) {

                const token = createUser(email, password);
                authCtx.authenticate(token);

            }
            else {
                Alert.alert("Authentication Failed", 'Could not create user, Please check you input and try again later');
            }
        } catch (error) {
            Alert.alert(error)
        }
        setEmail('');
        setRepassword('');
        setPassword('');
    }


    return (
        <ImageBackground source={require('../../assets/bg.jpg')} style={{ flex: 1 }} imageStyle={{ height: height, width: wid, position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }} >
            <View style={styles.container}>
                <Text style={{ fontWeight: "bold", fontSize: 26 }}>Register</Text>
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
                    <TextInput
                        style={styles.textInput}
                        placeholder='re-Password'
                        value={repassword}
                        onChangeText={(txt) => setRepassword(txt)}
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}


                    />
                </View>
                <View>
                    <TouchableOpacity onPress={() => {
                        checkFunction({ email, password, repassword });

                    }}>
                        <View style={{ height: 40, width: 300, backgroundColor: "black", justifyContent: "center", alignItems: "center", borderRadius: 7 }}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
                                Login
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

export default NewUser;
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