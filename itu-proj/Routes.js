import React from 'react'
import {View} from 'react-native';
import Login from './Screens/login.js'
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();


class Routes extends React.Component {
    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName={'Register'}>
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{header: () => null}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
 export default Routes