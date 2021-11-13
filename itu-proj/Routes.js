import React from 'react'
import {View} from 'react-native';
import Homepage from './Screens/homepage.js'
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
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
 export default Routes