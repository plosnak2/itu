import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View, Dimensions, Image, ImageBackground } from 'react-native'
import { RecipeRef } from '../firebaseConfig'
import Navbar from '../Static/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
    };
    
    render() {
        return (
          <ImageBackground source={require('../assets/profilebg.png')} resizeMode="cover" style={styles.imagebg} imageStyle={{opacity: 0.1}}>
          <View style={{flex:1}}>
              <ScrollView contentContainerStyle={styles.container}>
                  <Image source={require('../assets/profilepic.png')} style={styles.image}/>
                  <Text style={styles.text}>Uživateľský mail</Text>
                  <View style={styles.wrapper}>
                    <Text style={styles.wrapperedtext}>{this.props.email}</Text>
                  </View>
              </ScrollView>
              <Navbar />
          </View>
          </ImageBackground>
        )
    }
}
export default ProfileScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      top:Dimensions.get('window').height / 10
    },

    image:{
      width: Dimensions.get('window').width / 2,
      height: Dimensions.get('window').width / 2
    },

    imagebg:{
      flex: 1,
      opacity:10
    },

    text:{
      marginTop:20,
      fontSize:25,
      fontWeight: 'bold',
      color:'#0782F9'
    },

    wrapper:{
      backgroundColor:'#0782F9',
      marginTop:20,
      borderRadius:100,
      padding:20
    },

    wrapperedtext:{
      color:'white',
      fontSize:25,
    }
  })