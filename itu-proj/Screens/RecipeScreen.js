import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react'
import { Image, Text, View, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import RecipeRating from '../Components/Rating';

class RecipeScreen extends Component {
    /*toogle = (open) => {
        console.log("somtu")
        this.setState({open: !open})
        console.log(this.state.open)
        //this.render();
    }*/
    /*
    let image = this.state.open ? require('../assets/rate.png') : require('../assets/unrate.png')
    <TouchableOpacity onPress={() => (this.toogle())}>
                    {this.state.open ? <Ionicons name="star" size={30}/> : <Ionicons name="star-outline" size={30}/>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => (this.toogle(this.state.open))}>
                    {this.state.open ? <Ionicons name="star" size={30}/> : <Ionicons name="star-outline" size={30}/>}
                </TouchableOpacity>
                <Text>{this.state.open}</Text>
    */
   

    render() {
        const my_recipe = JSON.parse(this.props.recipe)
        return (
          <FlatList
            ListHeaderComponent={
              <View>
                <Image style={{width: Dimensions.get("window").width, height: Dimensions.get("window").height / 4, resizeMode: "stretch", alignSelf: "center"}} source={{ uri: my_recipe.image }}/>
                <View style={styles.basic}>
                  <Text style={styles.text_title}>Tvoje hodnotenie:</Text>
                  <View style={{ paddingTop: 10, marginLeft: 10 }}>
                    <RecipeRating actualRating={this.props.rating}/>
                  </View>
                </View>
                <View style={styles.basic}>
                  <Text style={styles.text_title}>Čas prípravy:</Text>
                  <Text style={styles.text}>{my_recipe.time}</Text>
                </View>
                <Text style={styles.text_title}>Ingrediencie:</Text>
              </View>
            }
            data={my_recipe.ingredient}
            renderItem={({ item }) => (
              <Text style={styles.text_ingredient}>{item}</Text>
            )}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={
              <Text style={styles.text}>Postup: {my_recipe.instructions}</Text>
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
    }
})