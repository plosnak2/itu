import React, { Component } from 'react'
import {Image, Text, View, StyleSheet, StatusBar, Platform, ScrollView, ImageBackground, TextInput } from 'react-native'
import Navbar from '../Static/Navbar';

class MakeListScreen extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <ImageBackground source={require('../assets/profilebg.png')} resizeMode="cover" style={styles.imagebg} imageStyle={{opacity: 0.1}}>
            <View style={{flex:1}}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.header}>Vytvoriť nákupný zoznam</Text>
                <Text style={styles.enterShop}>Zadajte názov obchodu</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                    placeholder="Zadajte obchod"
                    
                    onChangeText={text => this.props.setShop(text)}
                    style={styles.input}
                    />
                </View>
            </ScrollView>
            <Navbar />
            </View>
            </ImageBackground>
        )
    }
}
export default MakeListScreen

const styles = StyleSheet.create({
    content: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : Platform.OS === 'ios' ? 40 : 0,
        flex: 1,
        flexDirection:"column",
        alignItems: "center"
    },
    imagebg:{
        flex: 1,
        opacity:10
    },
    header:{
        fontSize:30,
        color: '#0782F9',
        fontWeight: "bold",
        marginTop:10
    },
    enterShop:{
        marginTop:20,
        fontSize:20,
        color: '#0782F9',
        fontWeight: "bold"
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 15,
        height:60
    }
})