import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: (token) => { },
    logout: () => { },
});

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState();




    function authenticate(token) {
        const dat = String(token)
        setAuthToken(token);
        AsyncStorage.setItem('token', dat); //here the first argument is the key name that we have given to "token" and the secong argument is the value or the content that we have to save in you devise now this argument is always in the srting format if it is in the different format like number , boolean or anythjing else then first we need to convert it into string and then we have to pass it.....
    }

    function logout() {
        setAuthToken(null);
        AsyncStorage.removeItem('token');
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;