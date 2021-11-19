import React, { Component } from 'react'
import { ScrollView, Image, Text, View, TouchableOpacity, StyleSheet, StatusBar, Platform, ActivityIndicator } from 'react-native'
import HomeScreen from '../Screens/homepage';
import { RecipeRef } from '../firebaseConfig';
import Navbar from '../Static/Navbar';
import { UsersRef } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyFavourites from '../Screens/EmptyFavourites';

class Favourites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Recipe: [],
            loaded: false,
            numOfFavs: 0
        }
    };
    
    
    async componentDidMount() {
        const result = await AsyncStorage.getItem('email');
        const user =  await UsersRef.doc(result).get();
        this.setState({numOfFavs: user.data().favourites.length})
        await RecipeRef.onSnapshot((QuerySnapshot) => {
            let recipes = [];
            QuerySnapshot.forEach((doc) => {
                if(user.data().favourites.includes(doc.id)){
                    recipes.push({ id: doc.id, data: doc.data() });
                }
                
            });
            this.setState({ Recipe: recipes });
        });
        
        this.setState({loaded:true})
    }

    render() {
        if(this.state.loaded == false){
            return(
                <View style={[styles.container2, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0782F9"/>
                </View>
            )
        } else {
            if(this.state.numOfFavs != 0){
                return (
                    <View style={{flex:1}}>
                    <ScrollView style={styles.content}>
                        {
                            this.state.Recipe.map((item, index) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.container}
                                    onPress={() => {
                                        this.props.navigation.navigate('Recipe', { name: item.data.name, id: item.id })
                                    }
                                    }>
                                    <HomeScreen item={item} />
                                </TouchableOpacity>
    
                            ))
                        }
                    </ScrollView>
                    <Navbar />
                    </View>
                )
            } else {
                return(
                    <EmptyFavourites />
                )
            }
        }
    }
}
export default Favourites

const styles = StyleSheet.create({
    content: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
    },
    container: {
        padding: 10,
        marginTop: 3,
        backgroundColor: '#d9f9b1',
    },
    container2: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})