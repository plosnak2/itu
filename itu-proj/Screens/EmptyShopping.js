/**
 * Author: Jakub Zaukolec (xzauko00)
 * This is graphic component that displays screen, when user doesn´t have any shopping list created
 */
import React, { Component } from 'react'
import {Image, Text, View, StyleSheet, StatusBar, Platform, Dimensions, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import Navbar from '../Static/Navbar'
import { useNavigation } from '@react-navigation/core'

const EmptyShopping = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../assets/profilebg.png')} resizeMode="cover" style={styles.imagebg} imageStyle={{opacity: 0.1}}>
            <View style={{flex:1}}>
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={require('../assets/sad.png')} style={styles.image}/>
                <Text style={styles.text}>Aktuálne nemáte žiadne nákupné zoznamy</Text>
                
                
                </ScrollView>
                <Navbar />
            </View>
        </ImageBackground>
    )
    
}
export default EmptyShopping

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
    imagebg:{
        flex: 1,
        opacity:10
    },
    image:{
        width:200,
        height:200
    },
    text:{
        marginTop:20,
        fontSize:25,
        fontWeight: 'bold',
        color:'#0782F9',
        textAlign:"center"
    },
    wrapper:{
        backgroundColor:'#0782F9',
        marginTop:20,
        borderRadius:100,
        padding:20,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    favourites:{
        color:'white',
        fontSize:25,
        marginRight:10
    }
})