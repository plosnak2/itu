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
   
   

   useEffect(() => {
      (async () => {
         const result = await AsyncStorage.getItem('email');
         const user = await UsersRef.doc(result).get();
         const number = user.data().favourites.length;
         setFavourites(number);
         setEmail(result);
         setLoading(false);
      })();
   }, [])

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