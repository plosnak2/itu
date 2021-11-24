import React from 'react'
import Home from './Components/Home.js'
import Recipe from './Components/Recipe.js';
import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Components/Login'
import Register from './Components/Register'
import Profile from './Components/Profile'
import Favourite from './Components/Favorite.js';
import Favourites from './Components/Favourites.js';
import Shopping from './Components/Shopping.js';
import MakeList from './Components/MakeList.js';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName={'Login'}
                screenOptions={({ route, navigation }) => ({
                    ...TransitionPresets.ScaleFromCenterAndroid   
                })}>
                    <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{header: () => null}}
                    />
                    <Stack.Screen name="Recipe" component={Recipe} options={({ route }) => ({ title: route.params.name , headerRight: () => <Favourite id={route.params.id} />})}/>
                    <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
                    <Stack.Screen name="Favourites" component={Favourites} options={{ headerShown: true, title: "Obľúbené" }}/>
                    <Stack.Screen name="Shopping" component={Shopping} options={{ headerShown: false }}/>
                    <Stack.Screen name="MakeList" component={MakeList} options={() => ({ title: "Vytvoriť zoznam"})}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    
}