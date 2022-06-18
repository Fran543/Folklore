import { StyleSheet, StatusBar } from "react-native";
import { useState, useEffect } from "react";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PostFullScreen from "./screens/PostFullScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import PostCreatorScreen from "./screens/PostCreatorScreen";
import StoryCreatorScreen from "./screens/StoryCreatorScreen";
import BlogCreatorScreen from "./screens/BlogCreatorScreen";
import LoginScreen from "./screens/LoginScreen";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LibraryScreen from "./screens/LibraryScreen";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    console.log("setIsLoggedIn")
  }, [isLoggedIn]);

  function logOutUser() {
    setIsLoggedIn(false)
  }
  function logInUser() {
    setIsLoggedIn(true)
  }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="history"
      shifting={true}
      activeColor="white"
      inactiveColor="#cccccc">

      <Tab.Screen name="Home" component={HomeScreen}
        options={{
          tabBarColor: '#C2A695',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          )
        }} />

      {isLoggedIn === "true" &&
        <>
          <Tab.Screen name="My Profile" children={() => <UserProfileScreen logOutUser={logOutUser} />}
            options={{
              tabBarColor: '#6E6A91',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
              )
            }} />
          <Tab.Screen name="Create Post" component={PostCreatorScreen}
            options={{
              tabBarColor: '#B88FAE',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="plus" color={color} size={26} />
              )
            }} />
          <Tab.Screen name="Library" component={LibraryScreen}
            options={{
              tabBarColor: '#3d6082',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="book" color={color} size={26} />
              )
            }} />
        </>
      }
      <Tab.Screen name="Login" children={() => <LoginScreen logInUser={logInUser} />}
        options={{
          tabBarColor: '#610440',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="login" color={color} size={26} />
          )
        }} />
    </Tab.Navigator>
  );
}


export default function App() {

  return (
    <>
      <StatusBar style='light' />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: '#C2A695' },
          headerTintColor: "white",
          headerTitleAlign: "center",
          contentStyle: { backgroundColor: 'black' },
        }}>
          <Stack.Screen name="HomeScreen" component={Home}
            options={{
              headerShown: false
            }} />
          <Stack.Screen name="PostFullScreen" component={PostFullScreen} />
          <Stack.Screen name="BlogCreatorScreen" component={BlogCreatorScreen}
            options={{
              headerShown: false
            }} />
          <Stack.Screen name="StoryCreatorScreen" component={StoryCreatorScreen}
            options={{
              headerShown: false
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}