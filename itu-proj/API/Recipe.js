import React, { Component } from 'react'
import { Image, Text, View, StyleSheet, Dimensions } from 'react-native'

class Recipe extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        const my_recipe = JSON.parse(this.props.recipe)
        return (
            <View>
                <Image style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height / 4, resizeMode: 'stretch', alignSelf: 'center' }} source={{ uri: my_recipe.image }} />
                <Text style={styles.text}>
                    Hodnotenie: {my_recipe.rate}
                </Text>

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
} export default Recipe

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