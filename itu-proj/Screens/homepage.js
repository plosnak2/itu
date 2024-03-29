/**
 * Author: Jozef Čásar (xcasar)
 * This is graphic component that displays user all recipes from database
 */
import React, { Component } from 'react'
import {Image, Text, View, StyleSheet, StatusBar, Platform, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <View style={styles.column}>
                <Image style={{ width: 60, height: 60, left: 10 }} source={{ uri: this.props.item.data.image }} />

                <View style={styles.text}>
                    <Text style={styles.text_name}>
                        {this.props.item.data.name}
                    </Text>

                    <View style={styles.icons}>
                        <Image style={{ width: 20, height: 20, right: 20 }} source={require('../assets/rate.png')} />
                        <Text style={styles.rate}>
                            {this.props.rate}
                        </Text>

                        <Ionicons name="alarm" size={20} style={{left: 10}} color="black" />
                        {/*<Image style={{ width: 20, height: 20, left: 10 }} source={require('../assets/clock.png')} />*/}
                        <Text style={styles.time}>
                            {this.props.item.data.time}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}
export default HomeScreen

const styles = StyleSheet.create({
    column: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        minHeight: Dimensions.get('window').height
    },
    container: {
        padding: 10,
        marginTop: 3,
        backgroundColor: '#d9f9b1',
    },
    icons: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        padding: 10,
    },
    text: {
        flex: 1,
        paddingLeft: 10,
    },
    time: {
        left: 20,
    },
    rate: {
        right: 10,
    },
    text_name: {
        textAlign: 'center',
        alignSelf: 'center',
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
})