import React, { Component } from 'react'
import {Image, Text, View, StyleSheet, StatusBar, Platform, Dimensions, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Moment from 'moment';

class ShoppingScreen extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <View style={styles.column}>
                <View style={styles.topview}>
                    <Text style={styles.shop}>{this.props.item.shop}</Text>
                    <TouchableOpacity style={styles.icon} onPress={() =>
                        this.props.deleteList(this.props.index)
                      }>
                        <Ionicons name="trash-outline" size={40} color="black"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomview}>
                    <Text style={styles.date}>Nákup naplánovaný na: {
                        Moment(new Date(this.props.item.date.toDate())).format('DD.MM.YYYY')
                        
                    }</Text>
                    <Text style={styles.items}>Položky:</Text>
                </View>
                <View style={styles.itemsview}>
                    <View style={styles.item}><Text style={styles.date}>Druh</Text></View>
                    <View style={styles.item}><Text style={styles.date}>Množstvo</Text></View>
                    <View style={styles.item}><Text style={styles.date}></Text></View>
                </View>
                    {
                        Object.entries(this.props.item.items).map(([key, value]) => {
                            return(
                                <View style={styles.itemsview}>
                                <View style={styles.item}><Text style={styles.ingredient}>{key}</Text></View>
                                <View style={styles.item}><Text style={styles.ingredient}>{value}</Text></View>
                                <TouchableOpacity style={styles.item} onPress={() =>
                                    this.props.deleteItem(this.props.index, key)
                                  }>
                                <Text style={styles.date}><Ionicons name="checkmark-outline" size={30} color="black"/></Text>
                                </TouchableOpacity>
                                </View>
                                )
                        })
                        
                    }
                
            </View>
        )
    }
}
export default ShoppingScreen

const styles = StyleSheet.create({
    column: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "#f6c445",
        borderWidth: 1,
        borderRadius:20,
        marginTop:20,
        marginRight:10,
        marginLeft:10,
        paddingBottom:20,
        paddingTop:10
    },
    icon:{
        position: "absolute",
        top:0,
        right:30
    },
    topview:{
        borderRadius:20,
        borderBottomWidth:2,
        width:"100%",
        height:50,
        flexDirection: 'column',
        alignItems: 'center'
    },
    bottomview:{
        width:"100%",
        flexDirection: 'column',
        alignItems: "center",
        
        marginTop: 20
    },
    shop:{
        fontSize:25,
        fontWeight: "bold",
        color: "#0782F9"
    },
    date:{
        fontSize:20,
        fontWeight: "bold",
        color: "#0782F9"
    },
    items:{
        marginTop:10,
        fontSize:20,
        fontWeight: "bold",
        color: "#0782F9",
        
    },
    itemsview:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginTop:10
    },
    item:{
        width:"33%",
        alignItems: "center"
    },
    ingredient:{
        color:"red",
        fontSize:20
    }
})