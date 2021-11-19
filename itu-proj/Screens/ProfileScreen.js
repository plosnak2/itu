import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View, Dimensions, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { RecipeRef } from '../firebaseConfig'
import Navbar from '../Static/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

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
                  <TouchableOpacity style={styles.wrapper} onPress={this.props.navigateToFavourites}>
                    <Text style={styles.favourites}>Obľúbené recepty: {this.props.favourites}</Text>
                    <Ionicons name="star" size={30} color="gold" />
                  </TouchableOpacity> 
                  <TouchableOpacity style={styles.wrapper} onPress={this.props.handleSignOut}>
                    <Text style={styles.wrapperedtext}>Odhlásiť</Text>
                  </TouchableOpacity>
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
      padding:20,
      justifyContent: 'center',
      flexDirection: 'row',
    },

    wrapperedtext:{
      color:'white',
      fontSize:25,
    },

    favourites:{
      color:'white',
      fontSize:25,
      marginRight:10
    }
  })