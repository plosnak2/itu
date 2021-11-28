import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core'

const Navbar = () => {
    const navigation = useNavigation()
    return (
        <View>
        <View style={styles.navbar}>
            <TouchableOpacity onPress={() =>
                navigation.navigate('Home')
              }>
            <View style={styles.item1}>

                <Ionicons name="fast-food" size={45} color="white" />
            </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() =>
                navigation.navigate('Shopping')
              }>
            <View style={styles.item2}>
                <Ionicons name="cart-outline" size={45} color="white" />
                
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>
                navigation.navigate('Profile')
              }>
            <View style={styles.item3}>
                <Ionicons name="person" size={45} color="white" />
                
            </View>
            </TouchableOpacity>
            
        </View>
        
        </View>
        
    )
}

export default Navbar

const styles = StyleSheet.create({
    navbar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignSelf: 'stretch',
        flex: 1,
        backgroundColor: '#0782F9',
        height: 90,
        borderWidth: 1,
        borderRadius:20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft:50,
        paddingRight:50,
        width: "90%",
        marginLeft: "5%",
        marginBottom: 20,
        shadowColor: "black",
        shadowOffset: {
            width:0,
            height:10
        },
        shadowOpacity: 0.3,
        paddingTop:20,
      
    },
    item1:{
        
        
        alignItems: 'center'
    },
    item3:{
        
        
        alignItems: 'center'
    },
    item2:{
        
        alignItems: 'center',
        
    },
    text:{
        fontSize:15,
        fontWeight: 'bold',
        color: 'white'
    },
    add:{
        position:"absolute",
        bottom:80,
        left:(Dimensions.get('window').width / 2) - 50,
        shadowColor: "black",
        shadowOffset: {
            width:0,
            height:10
        },
        shadowOpacity: 0.2,
        paddingTop:20,
    }
})
