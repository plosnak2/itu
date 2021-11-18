import React, { Component, useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import Recipe from '../Screens/RecipeScreen';
import { RecipeRef, UsersRef } from '../firebaseConfig'
import { LogBox, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreLogs(['Setting a timer']);
class Recipe_screen extends Component {
   constructor(props) {
      super(props);
      // Don't call this.setState() here!
      this.state = {
         id: this.props.route.params['id'],
         recipe: [],
         rating: 0,
         user: '',
      };
   }

   async getUser() {
         const user = await AsyncStorage.getItem('email');
         this.setState({user: user})
         UsersRef.doc(user).get().then((documentSnapshot) => {
            if (documentSnapshot.exists) {
               let array = [];
               array.push(documentSnapshot.data())
               array.map((item) => (item.rating[this.state.id] != null ? this.setState({rating: item.rating[this.state.id]}) : 0));
            }
         });
   }

   componentDidMount() {
      RecipeRef.doc(this.state.id).get().then((documentSnapshot) => {
         if (documentSnapshot.exists) {
            this.setState({ recipe: documentSnapshot.data() });
         }
      });
      this.getUser();      
   }

   render() {
      return (         
            <Recipe recipe={JSON.stringify(this.state.recipe)} rating={this.state.rating} user={this.state.user} id={this.state.id}/>        
      )
   }
}
export default Recipe_screen

const styles = StyleSheet.create({
   content: {
      backgroundColor: 'whitesmoke',
   },
})