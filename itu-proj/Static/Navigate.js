import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core'

const Navigation = ({place, optional}) => {
    const navigation = useNavigation()
    return(
        <TouchableOpacity onPress={() =>
            navigation.navigate(place, { data: optional})
          }>
            <Text style={{marginLeft:30}}>KUPIT</Text>
        </TouchableOpacity>
    )
}

export default Navigation