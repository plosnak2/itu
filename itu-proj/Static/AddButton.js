import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core'

const Add = () => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity>
            <View style={styles.navbar}>
                <Ionicons name="add-circle" size={100} color="#50BE25" />
            </View>
        </TouchableOpacity>
        
        
        
    )
}

export default Add

const styles = StyleSheet.create({
    navbar: {
        position: 'absolute',
        bottom: 120,
        right: 0,
        alignSelf: 'stretch',
        flex: 1,
        
    }
})
