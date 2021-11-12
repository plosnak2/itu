import React, {useContext, useState} from 'react';
import { Text, View, Image, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert  } from 'react-native';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        Alert.alert('mail: ' + email)
    }
    return (
      <ScrollView contentContainerStyle={styles.screen}>
        <Text style={styles.logo_name}>Aplikácia pre uľahčenie hľadania receptov</Text>
        <Image source={require('../assets/logo.png')} style={styles.logo}/>
        <Text style={styles.logo_name}>Prihlásiť sa</Text>
        
        <View style={styles.inputBox}>
            <TextInput 
                value={email}
                numberOfLines={1}
                placeholder={"Mail"}
                style={styles.input}
                onChangeText={(useremail) => setEmail(useremail)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
        </View>
        <View style={styles.inputBox}>
            <TextInput 
                value={password}
                numberOfLines={1}
                placeholder={"Heslo"}
                style={styles.input}
                onChangeText={(userPassword) => setPassword(userPassword)}
                secureTextEntry={true}
            />
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={login}>
            <Text style={styles.buttonText}>Prihlásiť</Text>
        </TouchableOpacity>
        <Text>Mail: {email}</Text>
        <Text>Heslo: {password}</Text>
      </ScrollView>
    );
  }
  
  export default Login;

  const styles = StyleSheet.create({ 
      screen: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'white',
        padding:30
      },
      logo: {
        width:Dimensions.get('window').width / 2,
        height:Dimensions.get('window').width / 2
      },

      logo_name: {
        marginTop:20,
        fontSize:30,
        fontFamily: 'MarkerFelt-Thin',
        textAlign:'center',
      },
      
      inputBox: {
        marginTop: 5,
        marginBottom: 10,
        width: '100%',
        height: Dimensions.get('window').height / 15,
        borderColor: '#ccc',
        borderRadius: 3,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
      },

      input: {
        padding: 10,
        fontSize: 16,
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        width:"100%"
      },

      inputField: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: "100%",
        height: 100,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1,
      },

      buttonContainer: {
        marginTop: 10,
        width: '100%',
        height:Dimensions.get('window').height / 15,
        backgroundColor: '#2e64e5',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
      },

      buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'Lato-Regular',
      },
  })