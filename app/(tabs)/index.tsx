import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./welcome";
import Login from "./login";
import Home from "./home";
import Register from "./register";
import SplashScreen from "./splashscreen";
import SendSnap from "./sendsnap";
import ReceivedSnap from "./receivedsnap";
import Profile from "./profile";
import EditProfile from "./editprofile";

type RootStackParamList = {
  "tabs/splashscreen": undefined;
  "tabs/welcome": undefined;
  "tabs/login": { isAuthenticated: boolean } | undefined;
  "tabs/home": { isAuthenticated: boolean } | undefined;
  "tabs/register": undefined;
  "tabs/sendsnap": undefined;
  "tabs/receivedsnap": undefined;
  "tabs/profile": undefined;
  "tabs/editprofile": undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const App = () => {
  return (
    <Stack.Navigator initialRouteName="tabs/splashscreen">
      <Stack.Screen
        name="tabs/splashscreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="tabs/welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="tabs/login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="tabs/home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="tabs/register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="tabs/sendsnap"
        component={SendSnap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="tabs/receivedsnap"
        component={ReceivedSnap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="tabs/profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="tabs/editprofile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default App;
