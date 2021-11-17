import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react'
import { Image, Text, View, StyleSheet, Dimensions, Button, TouchableOpacity } from 'react-native'
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
            <View>
                <Image style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height / 4, resizeMode: 'stretch', alignSelf: 'center' }} source={{ uri: my_recipe.image }} />
                <Text style={styles.text}>
                    Hodnotenie: {my_recipe.rate}
                </Text>
                <RecipeRating actualRating={this.props.rating}/>
                <Text style={styles.text}>
                    Čas prípravy: {my_recipe.time}
                </Text>

                <Text style={styles.text}>
                    Ingrediencie: {my_recipe.ingredient}
                </Text>

                <Text style={styles.text}>
                    Postup: {my_recipe.instructions}
                </Text>
            </View>
        )
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
        fontSize: 20
    }
})