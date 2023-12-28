import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Login from "./app/screens/Login";
import NewUser from "./app/screens/NewUser";
import Welcome from "./app/screens/Welcome";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext, useEffect, } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { ImageBackground, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import AppLoading from "expo-app-loading";





const Stack = createStackNavigator();


function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: "cyan" },
      headerTintColor: "white",

    }}>
      <Stack.Screen name="welcome" component={Welcome} options={{
        headerRight: () =>
          <TouchableOpacity onPress={() => {
            authCtx.logout()
          }}>

            <MaterialIcons name="logout" size={24} color="black" style={{ marginRight: 20 }} />
          </TouchableOpacity>
      }} />
    </Stack.Navigator>
  )
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="createuser" component={NewUser} options={{ headerShown: false }} />

    </Stack.Navigator>
  )
}

function Navigation() {
  const authCtx = useContext(AuthContext)
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  )
}

function Root() {
  // const [isTrying, setIsTrying] = useState(true)
  const authCtx = useContext(AuthContext)
  useEffect(() => {

    async function fetchToken() {

      const storeToken = await AsyncStorage.getItem('token'); //Note that this value should be equal to the the value that we have pass as the first argument. And this will retuen the promise so to get this we need to use async and await



      if (storeToken) {
        authCtx.authenticate(storeToken);
      }
      // setIsTrying(false);
    }
    fetchToken();
  }, [])
  // if (isTrying) {
  //   return <AppLoading />
  // }

  return <Navigation />
}




const App = () => {

  return (

    <AuthContextProvider>
      <Root />
    </AuthContextProvider>

  )
}

export default App

