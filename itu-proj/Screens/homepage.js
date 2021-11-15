import React, { Component } from 'react'
import { ScrollView, Image, Text, View, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native'
import Recipes_page from '../API/Homepage';
import { RecipeRef } from '../firebaseConfig'
import Navbar from '../Components/Navbar';
import { Dimensions } from 'react-native';

class Homepage extends Component {
    state = {
        Recipe: [],
        id: '',
    }
    

    componentDidMount() {
        RecipeRef.onSnapshot((QuerySnapshot) => {
            let recipes = [];
            QuerySnapshot.forEach((doc) => {
                recipes.push({ id: doc.id, data: doc.data() });
                this.setState({ id: doc.id })
                console.log(recipes);
            });
            this.setState({ Recipe: recipes });
        });
      }


    render() {
        return (
            <View style={{flex:1}}>
            <ScrollView style={styles.content}>
                {
                    this.state.Recipe.map((item, index) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.container}
                            onPress={() => {
                                this.props.navigation.navigate('Recipe_screen', { name: item.data.name, id: item.id })
                            }
                            }>
                            <Recipes_page item={item} />
                        </TouchableOpacity>

                    ))
                }
            </ScrollView>
            <Navbar />
            </View>
        )
    }
}
export default Homepage

const styles = StyleSheet.create({
    content: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        minHeight: Dimensions.get('window').height
    },
    container: {
        padding: 10,
        marginTop: 3,
        backgroundColor: '#d9f9b1',
    },
})