import { StyleSheet, StatusBar } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PostFullScreen from "./screens/PostFullScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import PostCreatorScreen from "./screens/PostCreatorScreen";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="history"
      shifting={true}
      activeColor="white"
      inactiveColor="#cccccc">
      <Tab.Screen name="My Profile" component={UserProfileScreen}
        options={{
          tabBarColor: '#6E6A91',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          )
        }} />
      <Tab.Screen name="Home" component={HomeScreen}
        options={{
          tabBarColor: '#C2A695',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          )
        }} />

      <Tab.Screen name="Create Post" component={PostCreatorScreen}
        options={{
          tabBarColor: '#B88FAE',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus" color={color} size={26} />
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
})