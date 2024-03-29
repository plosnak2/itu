/**
 * Author: Jozef Čásar (xcasar)
 * This is graphic component that displays actual recipe and user rating
 */
import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react'
import { Image, Text, View, StyleSheet, Dimensions, FlatList, KeyboardAvoidingView,TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import RecipeRating from '../Components/Rating';
import Navigation from '../Static/Navigate';
import Timer from '../Components/Cooking';

class RecipeScreen extends Component {
   constructor(props){
     super(props)
   }
    render() {
        const my_recipe = JSON.parse(this.props.recipe)
        if(my_recipe.ingredient == null){
          return(
            <KeyboardAvoidingView
              style={styles.container}
              behavior="padding"
            >
              <Text>LOADING</Text>
            </KeyboardAvoidingView>
          )
        }
        return (
          <FlatList
            ListHeaderComponent={
              <View>
                <Image style={{width: Dimensions.get("window").width, height: Dimensions.get("window").height / 4, resizeMode: "stretch", alignSelf: "center"}} source={{ uri: my_recipe.image }}/>
                <View style={styles.basic}>
                  <Text style={styles.text_title}>Tvoje hodnotenie:</Text>
                  <View style={{ paddingTop: 10, marginLeft: 10 }}>
                    <RecipeRating actualRating={this.props.rating} user={this.props.user} id={this.props.id} rate_count={my_recipe.rate_count} rate={my_recipe.rate}/>
                  </View>
                </View>
                <View style={styles.basic}>
                  <Text style={styles.text_title}>{my_recipe.name}</Text>
                </View>
                <View style={styles.basic}>
                  <Text style={styles.text_title}>Čas prípravy:</Text>
                  <Text style={styles.text}>{my_recipe.time}</Text>
                </View>
                <Text style={styles.text_title}>Ingrediencie:</Text>
              </View>
            }
            data={Object.entries(my_recipe.ingredient)}
            renderItem={({ item }) => (
              <Text style={styles.text_ingredient}>{item[1] + " " + item[0]}</Text>
            )}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={
              <View>
              <Text style={styles.text}>Postup: {my_recipe.instructions}</Text>
              <TouchableOpacity style={styles.wrapper} onPress={() => this.props.navigation.navigate("Cooking", { instructions: my_recipe.instructions, time: my_recipe.instructions_time})}>
                    <Text style={styles.wrapperedtext}>Začať variť</Text>
              </TouchableOpacity>              
              </View>
            }
          />
          
        );
    }
} export default RecipeScreen

const styles = StyleSheet.create({
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
        fontSize: 20,
        paddingVertical: 10,
        marginLeft: 10
    },
    text_ingredient: {
        fontSize: 20,
        marginLeft: 10,
    },
    text_title: {
        paddingVertical: 5,
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10
    },
    basic: {
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    wrapper:{
      backgroundColor:'#0782F9',
      marginTop:20,
      borderRadius:100,
      padding:20,
      justifyContent: 'center',
      flexDirection: 'row',
    },

    wrapperedtext:{
      color:'white',
      fontSize:25,
    },
})