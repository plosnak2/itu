import React, { Component } from 'react'
import { ScrollView, Image, Text, View, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native'
//import { get_recipe } from '../API/recipe_api'
import { RecipeRef } from '../firebaseConfig'

class Homepage extends Component {
   state = {
       Recipe: [],
       id: '',
   }

   componentDidMount() {
       let recipes= [];
       RecipeRef.onSnapshot((QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
                recipes.push({id: doc.id, data: doc.data()});
                this.setState({id: doc.id})
                console.log(recipes);
            });
            this.setState({Recipe: recipes});
       });
   }
    
   render() {
      return (
         <ScrollView style = {styles.content}>
            {
               this.state.Recipe.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     style = {styles.container}
                     onPress = {() => {
                        this.props.navigation.navigate('Recipe_screen', {name: item.data.name, id: item.id})
                     }
                    }>

                    <View style = {styles.column}>
                        <Image style={{width: 40, height: 40, left: 10}} source={{uri: item.data.image}}/>

                        <View style = {styles.text}>
                            <Text style = {styles.text_name}>
                                {item.data.name}
                            </Text>

                            <View style = {styles.icons}>
                                <Image style = {{width: 20, height: 20, right: 20}} source={require('../assets/rate.png')} />
                                <Text style = {styles.rate}>
                                    {item.data.rate}
                                </Text>

                                <Image style = {{width: 20, height: 20, left: 10}} source={require('../assets/clock.png')} />
                                <Text style = {styles.time}>
                                    {item.data.time}
                                </Text>
                            </View>
                        </View>
                     </View>
                     
                  </TouchableOpacity>
                 
               ))
            }
         </ScrollView>
      )
   }
}
export default Homepage

const styles = StyleSheet.create ({
    column: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
      marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      flex: 1,
    },
   container: {
      padding: 10,
      marginTop: 3,
      backgroundColor: '#d9f9b1',
   },
    icons: {
        flex:1,
        flexDirection: 'row',
        alignSelf: 'center',
        padding: 10,
    },
    text: {
        flex: 1,
        paddingLeft: 10,
    },
    time: {
        left: 20,
    },
    rate: {
        right: 10,
    },
    text_name: {
        textAlign: 'center',
        alignSelf: 'center',
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
})