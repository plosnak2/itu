import React, { Component } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import Recipe from '../API/Recipe';
import { RecipeRef } from '../firebaseConfig'

class Recipe_screen extends Component {
   constructor(props) {
      super(props);
      // Don't call this.setState() here!
      this.state = {
         id: this.props.route.params['id'],
         recipe: [],
      };
   }

   componentDidMount() {
      RecipeRef.doc(this.state.id).get().then((documentSnapshot) => {
         if (documentSnapshot.exists) {
            this.setState({ recipe: documentSnapshot.data() });
            //console.log('User data: ', this.state.recipe);
         }
      });
   }

   render() {
      return (
         <ScrollView style={styles.content}>
            <Recipe recipe={JSON.stringify(this.state.recipe)} />
         </ScrollView>
      )
   }
}
export default Recipe_screen

const styles = StyleSheet.create({
   content: {
      backgroundColor: 'whitesmoke',
   },
})