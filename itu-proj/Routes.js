import React from 'react'
import {View} from 'react-native';
import Homepage from './Screens/homepage.js'
import Recipe_screen from './Screens/Recipe_screen.js';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

class Routes extends React.Component {
    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName={'Register'}>
                    <Stack.Screen
                        name="Homepage"
                        component={Homepage}
                        options={{header: () => null}}
                    />
                    <Stack.Screen name="Recipe_screen" component={Recipe_screen} options={({ route }) => ({ title: route.params.name })}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
 export default Routes