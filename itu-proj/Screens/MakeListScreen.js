import React, { Component } from 'react'
import {Image, Text, View, StyleSheet, StatusBar, Platform, ScrollView, ImageBackground, TextInput, Button, TouchableOpacity, Dimensions, KeyboardAvoidingView } from 'react-native'
import Navbar from '../Static/Navbar';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

class MakeListScreen extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        const screenHeight = Dimensions.get('window').height
        return (
            
            <ImageBackground source={require('../assets/profilebg.png')} resizeMode="cover" style={styles.imagebg} imageStyle={{opacity: 0.1, resizeMode:'repeat'}}>
            <View style={{flex:1}}>
            <ScrollView style={styles.content}>
            <View style={styles.test}>
                <Text style={styles.header}>Vytvoriť nákupný zoznam</Text>
                <View style={styles.wrapper}>
                    <Text style={styles.date}>Zadajte názov obchodu</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                    placeholder="Zadajte obchod"
                    
                    onChangeText={text => this.props.setShop(text)}
                    style={styles.input}
                    />
                </View>
                <TouchableOpacity onPress={this.props.showDatepicker} style={styles.wrapper}>
                    <Text style={styles.date}>Kliknite pre výber dátumu</Text>
                </TouchableOpacity>
                
                {this.props.show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={this.props.date}
                      mode={this.props.mode}
                      is24Hour={true}
                      display="default"
                      onChange={this.props.onChange}
                      style={{width: 100}}
                    />
                  )}
                <Text style={styles.showdate}>{
                    Platform.OS !== "ios" && 
                    (Moment(this.props.date).format('DD.MM.YYYY'))
                    
                }</Text>
                <View style={styles.wrapper}>
                    <Text style={styles.date}>Položky v zozname</Text>
                </View>
                <View style={styles.itemsview}>
                    <View style={styles.item}><Text style={styles.ingredient}>Druh</Text></View>
                    <View style={styles.item}><Text style={styles.ingredient}>Množstvo</Text></View>
                <View style={styles.item}><Text style={styles.date}></Text></View>
                </View>
                    
                {
                    Object.entries(this.props.ingredients).map(([key, value]) => {
                        return(
                            <View style={styles.itemsview}>
                            <View style={styles.item}><Text style={styles.ingredient}>{key}</Text></View>
                            <View style={styles.item}><Text style={styles.ingredient}>{value}</Text></View>
                            </View>
                            )
                    })
                    
                }
                <View style={{marginTop:20}}></View>
                <View style={styles.inputContainer}>
                    <TextInput
                    placeholder="Zadajte druh suroviny"
                    value={this.props.itemName}
                    onChangeText={text => this.props.onChangeItemName(text)}
                    style={styles.input}
                    />
                </View>
                <View style={{marginTop:20}}></View>
                <View style={styles.inputContainer}>
                    <TextInput
                    placeholder="Zadajte množstvo + MJ"
                    value={this.props.itemQuantity}
                    onChangeText={text => this.props.onChangeItemQuantity(text)}
                    style={styles.input}
                    />
                </View>

                <TouchableOpacity onPress={this.props.onSubmit}>
                    <Ionicons name="add-circle" size={100} color="#0782F9"/>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={this.props.onCreate}>
                    <View style={styles.wrapper}>
                        <Text style={styles.date}>VYTVORIŤ ZOZNAM</Text>
                    </View>
                </TouchableOpacity>

                <View style={{marginTop:20}}></View>
            </View>
            </ScrollView>
            </View>
            </ImageBackground>
        )
    }
}
export default MakeListScreen

const styles = StyleSheet.create({
    content: {
        flex:1,
    },
    test:{
        flexDirection:"column",
        alignItems: "center"
    },
    imagebg:{
        flex: 1,
        opacity:10,
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
        height:60
    },
    date:{
        fontSize:20,
        color: '#0782F9',
        fontWeight: "bold",
        color: "white"
    },
    wrapper:{
        backgroundColor:'#0782F9',
        marginTop:20,
        borderRadius:100,
        padding:20,
        marginBottom:20
    },
    showdate:{
        color:"#0782F9",
        fontSize: 30
    },
    itemsview:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginTop:10
    },
    item:{
        width:"50%",
        alignItems: "center"
    },
    ingredient:{
        color:"red",
        fontSize:20
    }
})