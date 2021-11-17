import React from 'react'
import Home from './Components/Home.js'
import Recipe from './Components/Recipe.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Components/Login'
import Register from './Components/Register'
import Profile from './Components/Profile'
import Favourites from './Components/Favourites.js';

const Stack = createNativeStackNavigator();

export default function App() {
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName={'Login'}>
                    <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{header: () => null}}
                    />
                    <Stack.Screen name="Recipe" component={Recipe} options={({ route }) => ({ title: route.params.name })}/>
                    <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
                    <Stack.Screen name="Favourites" component={Favourites} options={{ headerShown: false }}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    
}