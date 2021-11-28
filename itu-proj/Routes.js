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
import Cooking from './Components/Cooking.js'
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import NewRecipe from './Screens/NewRecipe.js';

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
                    <Stack.Screen name="Recipe" component={Recipe} options={({ navigation, route }) => ({ title: route.params.name , headerRight: () => <View style={{flexDirection: 'row', paddingRight: 20}}><Favourite id={route.params.id} /><Ionicons name='cart-outline' size={40} style={{marginLeft: 10}}
                        onPress={() => navigation.navigate("MakeList", { data: route.params.ingredient, filter: route.params.filter})
                    }/></View>})}/>
                    <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
                    <Stack.Screen name="Favourites" component={Favourites} options={{ headerShown: true, title: "Obľúbené" }}/>
                    <Stack.Screen name="Shopping" component={Shopping} options={{ headerShown: false }}/>
                    <Stack.Screen name="MakeList" component={MakeList} options={() => ({ title: "Vytvoriť zoznam"})}/>
                    <Stack.Screen name="NewRecipe" component={NewRecipe} options={{ headerShown: false }}/>
                    <Stack.Screen name="Cooking" component={Cooking} options={() => ({ title: "Varíme"})}/>

                </Stack.Navigator>
            </NavigationContainer>
        )
    
}
