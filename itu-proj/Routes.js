import React from 'react'
import Home from './Components/Home.js'
import Recipe from './Components/Recipe.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Components/Login'
import Register from './Components/Register'

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
                </Stack.Navigator>
            </NavigationContainer>
        )
    
}