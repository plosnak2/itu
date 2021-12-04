/**
 * Author: Jakub Zaukolec (xzauko00)
 * This is graphic component that displays login screen
 */
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, ImageBackground } from 'react-native'
import { auth } from '../firebase'
import { Dimensions } from 'react-native';
import Register from '../Components/Register'

const LoginScreen = ({email, password, login, register, setEmail, setPassword}) => {
  const navigation = useNavigation()
  return (
    <ImageBackground source={require('../assets/cook.png')} resizeMode="cover" style={styles.imagebg}>
    <ScrollView
      contentContainerStyle={styles.container}
    >
    
      
      <Image source={require('../assets/logo.png')} style={styles.image} />
      
      <Text style={styles.textLogin}>Prihláste sa do aplikácie</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Zadajte email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Zadajte heslo"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={login}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Register')
          }
        >
          <Text style={styles.textReg}>Nemáte ešte účet? Zaregistrujte sa tu!</Text>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
    </ImageBackground>
  )
  
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top:Dimensions.get('window').height / 10
  },
  image: {
    width: Dimensions.get('window').width / 2,
    height:Dimensions.get('window').width / 2
  },
  imagebg:{
    flex: 1
  },
  inputContainer: {
    width: '80%'
  },
  textLogo:{
    fontSize:30,
    marginTop:10,
    fontFamily: 'American Typewriter',
    fontWeight: 'bold'
  },
  textLogin:{
    fontSize:40,
    textAlign: 'center',
    marginTop:10,
    fontFamily: 'American Typewriter',
    fontWeight: 'bold',
    color:'#0782F9'
  },
  textReg:{
    fontSize:20,
    textAlign: 'center',
    marginTop:10,
    fontFamily: 'American Typewriter',
    fontWeight: 'bold',
    color:'#0782F9'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})