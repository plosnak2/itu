import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import Navbar from '../Static/Navbar';
import ProfileScreen from '../Screens/ProfileScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';

if (Platform.OS === 'android') {  
   if (!ActivityIndicator.defaultProps) ActivityIndicator.defaultProps = {};
   ActivityIndicator.defaultProps.color =  'gray';
 }

class Profile extends Component {
   constructor(props) {
      super(props);
      // Don't call this.setState() here!
      this.state = {
         email: '',
         loading: true
      };
   }

   async componentDidMount(){
      const result =  await AsyncStorage.getItem('email');
         
      this.setState({email: result});
      this.setState({loading: false})
    }
   
   render() {
      if(this.state.loading){
         return(
            <View style={[styles.container, styles.horizontal]}>
               <ActivityIndicator size="large" color="#0782F9"/>
            </View>
            )
      }
      return (
        <ProfileScreen  email={this.state.email}/>
      )
   }
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