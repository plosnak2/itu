import React from 'react'
import Homepage from './Screens/homepage.js'
import Recipe_screen from './Screens/Recipe_screen.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import Login from './Components/Login'
import Register from './Components/Register'
import NewRecipe from './Screens/NewRecipe.js';

const Stack = createNativeStackNavigator();

export default function App() {
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName={'Login'}>
                    <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
                    <Stack.Screen
                        name="Homepage"
                        component={Homepage}
                        options={{header: () => null}}
                    />
                    <Stack.Screen name="Recipe_screen" component={Recipe_screen} options={({ route }) => ({ title: route.params.name })}/>
                    <Stack.Screen name="NewRecipe" component={NewRecipe} options={{ headerShown: false }}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    
}