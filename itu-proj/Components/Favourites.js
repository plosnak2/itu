/**
 * Author: Jakub Zaukolec (xzauko00)
 * HomeScreen GUI component is taken from Jozef Čásar
 * This component filters out only recipes, that logged user marked as his favourites
 */
import React, { Component } from 'react'
import { ScrollView, Image, Text, View, TouchableOpacity, StyleSheet, StatusBar, Platform, ActivityIndicator, ImageBackground } from 'react-native'
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
    
    // on mounting component i filter out current user´s favourite recipes from database and store them into state
    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', async() => {
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
          });
        
    }

    componentWillUnmount () {
        this.unsubscribe()
    }

    // function used for rating (made by Jozef Čásar)
    rate = (rate, rate_count) => {
        if(rate_count == 0){
            return "Nehodnotené"
        }
        return (rate/rate_count)
    }

    render() {
        // loading screen is present when i dont have loaded my recipes from db yet
        if(this.state.loaded == false){
            return(
                <View style={[styles.container2, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0782F9"/>
                </View>
            )
        } else {
            if(this.state.numOfFavs != 0){
                return (
                    <ImageBackground source={require('../assets/profilebg.png')} resizeMode="cover" style={styles.imagebg} imageStyle={{ opacity: 0.1 }}>
            
                <View style={{ flex: 1 }}>
                    
                    <ScrollView style={styles.content}>
                        {this.state.Recipe.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.container}
                                onPress={() => {
                                    this.props.navigation.navigate("Recipe", {
                                        name: item.data.name,
                                        id: item.id,
                                    });
                                }}
                            >
                                <HomeScreen
                                    item={item}
                                    rate={this.rate(item.data.rate, item.data.rate_count)}
                                />
                            </TouchableOpacity>
                        ))}
                        <View style={{marginTop:150}}></View>
                    </ScrollView>
                    
                    <Navbar />
                   
                </View>
               
            </ImageBackground>
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
        paddingHorizontal: 10,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : Platform.OS === 'ios' ? 40 : 0,
        flex: 1,
    },
    container: {
        padding: 10,
        marginTop: 3,
        backgroundColor: 'orange',
        borderRadius: 10,
    },
    container2: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    imagebg: {
        flex: 1,
        opacity: 10
    }
})