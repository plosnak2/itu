/**
 * Author: Jakub Zaukolec (xzauko00)
 * This is logical component for displaying user´s Profile
 */
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import Navbar from '../Static/Navbar';
import ProfileScreen from '../Screens/ProfileScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UsersRef } from '../firebaseConfig';
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'

if (Platform.OS === 'android') {  
   if (!ActivityIndicator.defaultProps) ActivityIndicator.defaultProps = {};
   ActivityIndicator.defaultProps.color =  'gray';
 }

const Profile = () => {
   const [email, setEmail] = useState('')
   const [loading, setLoading] = useState(true)
   const [favourites, setFavourites] = useState(0)
   const navigation = useNavigation()
   let unsubscribe = null
   
   // in this component i need to know which user is logged in (this information i take from AsyncStorage where is stored mail of user)
   // and i need to know how many favourite recipes he has
   useEffect(() => {
      unsubscribe = navigation.addListener('focus', async() => {
         const result = await AsyncStorage.getItem('email');
         const user = await UsersRef.doc(result).get();
         const number = user.data().favourites.length;
         setFavourites(number);
         setEmail(result);
         setLoading(false);
      });

      return() => {
         unsubscribe()
      }
   }, [])

   // function that handles signing out of application and redirection onto the login/register screen
   const handleSignOut= () =>{
      auth
        .signOut()
        .then(() => {
            AsyncStorage.removeItem('email');
            
        })
        .then(() => {
            navigation.navigate('Login')
         
         })
        .catch(error => alert(error.message))
    }

    // function that provides navigation onto the favourites screen
    const navigateToFavourites = () => {
      navigation.navigate('Favourites')
    }
   
  
   if(loading){
      return(
         <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0782F9"/>
         </View>
         )
   }
   return (
      <ProfileScreen  email={email} favourites={favourites} handleSignOut={handleSignOut} navigateToFavourites={navigateToFavourites}/>
   )
   
}
export default Profile

const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: "center"
   },
   horizontal: {
     flexDirection: "row",
     justifyContent: "space-around",
     padding: 10
   }
 });