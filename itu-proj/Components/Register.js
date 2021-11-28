import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import { auth } from '../firebase'
import RegisterScreen from '../Screens/RegisterScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UsersRef } from '../firebaseConfig';



const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatpass, setRepeatpass] = useState('')

  const navigation = useNavigation()

  const handleSignUp = () => {
    if(password != repeatpass)
    {
      Alert.alert('Heslá sa nezhodujú!')
    } else {
      auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
        AsyncStorage.setItem('email', email)
      })
      .then(() => {
        console.log("here")
        UsersRef.doc(email).set({
          favourites: [],
          rating: {},
          shopping: []
        })
        setEmail('')
        setPassword('')
        navigation.navigate('Home')
      })
      .catch(error => alert(error.message))
    }
    
  }


  return (
   <RegisterScreen email={email} password={password} register={handleSignUp} setEmail={setEmail} setPassword={setPassword} repeatpass={repeatpass} setRepeatpass={setRepeatpass}/>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})