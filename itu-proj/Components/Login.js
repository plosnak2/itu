import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'
import LoginScreen from '../Screens/LoginScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation()

  useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        navigation.replace("Home")
      } else {
        setLoading(false)
      }
    })
    
    
    return unsubscribe
  }, [])

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        AsyncStorage.setItem('email', email)
      })
      .then(() => {
        setEmail('')
        setPassword('')
        navigation.navigate('Home') 
      })
      .catch(error => alert(error.message))
  }

  if(loading){
    return(
      <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
    <Text>LOADING</Text>
    </KeyboardAvoidingView>
    )
  } else {
  return (
   <LoginScreen email={email} password={password} login={handleLogin} setEmail={setEmail} setPassword={setPassword}/>
  )
  }
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})