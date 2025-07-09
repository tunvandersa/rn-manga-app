import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/fontawesome'
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import ReadScreen from "../screens/ReadScreen";
import SearchScreen from "../screens/SearchScreen";

const FavoriteScreen = () => (
  <View>
    <Text>Favorite Screen</Text>
  </View>
);


 function bottomTabIcon(route, focused, size) {
  let iconName;

  if (route.name === 'Home') {
    iconName = 'home';
  } else if (route.name === 'Search') {
    iconName = 'search';
  } else if (route.name === 'My Manga') {
    iconName = 'tag';
  } else if (route.name === 'User') {
    iconName = 'user-o';
  }

  return (
    <View>
      <Icon name={iconName} size={size} color={focused ? '#4A80F0' : '#999'} />
    </View>
  );
}


const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => bottomTabIcon(route, focused, size),
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#2c2c2c',    
          borderTopWidth: 0, 
          height: 50,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My Manga" component={FavoriteScreen} />
      <Tab.Screen name = "Search" component={SearchScreen} />
    </Tab.Navigator>
  );
}

const MainStack = createNativeStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
      <MainStack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false}} />
      <MainStack.Screen name="Read" component={ReadScreen} options={{ headerShown: true}} />
    </MainStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MainStackScreen />
    </NavigationContainer>
  );
}
