import React, { Component } from 'react'
import { ScrollView, Image, Text, View, TouchableOpacity, StyleSheet, StatusBar, Platform, Dimensions } from 'react-native'
import { get_recipe } from '../API/recipe_api'
import { RecipeRef } from '../firebaseConfig'

class Recipe_screen extends Component {
   state = {
      id: this.props.route.params['id'],
      recipe: [],
   }
   
   componentDidMount() {
      RecipeRef.doc(this.state.id).get().then((documentSnapshot) => {
         if (documentSnapshot.exists) {
            this.setState({recipe: documentSnapshot.data()});
            //console.log('User data: ', this.state.recipe);
         }
      });
   }

   render() {
      return (
         <ScrollView style = {styles.content}>
            <Image style = {{width: Dimensions.get("window").width, height: Dimensions.get("window").height/4, resizeMode: 'stretch', alignSelf: 'center'}} source={{uri: this.state.recipe.image}}/>                     
            <Text>
               Hodnotenie: {this.state.recipe.rate}
            </Text>

            <Text>
               Čas prípravy: {this.state.recipe.time}
            </Text>

            <Text>
               Postup: {this.state.recipe.instructions}
            </Text>
         </ScrollView>
      )
   }
}
export default Recipe_screen

const styles = StyleSheet.create ({
   content: {
      backgroundColor: 'whitesmoke',
    },
   container: {
      padding: 10,
      marginTop: 3,
      backgroundColor: 'grey',
      alignItems: 'center',
   },
   text: {
      color: '#4f603c'
   }
})