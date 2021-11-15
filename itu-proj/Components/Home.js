import React, { Component } from 'react'
import { ScrollView, Image, Text, View, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native'
import HomeScreen from '../Screens/Homepage';
import { RecipeRef } from '../firebaseConfig';
import Navbar from '../Static/Navbar';

class Home extends Component {
    state = {
        Recipe: [],
    }
    
    componentDidMount() {
        RecipeRef.onSnapshot((QuerySnapshot) => {
            let recipes = [];
            QuerySnapshot.forEach((doc) => {
                recipes.push({ id: doc.id, data: doc.data() });
            });
            this.setState({ Recipe: recipes });
        });
            /*let imageRef = firebase.storage().ref('/AjeuQGuaecKrhM4pUgb9.png');
            imageRef
            .getDownloadURL()
            .then((url) => {
                //from url you can fetched the uploaded image easily
                console.log(url);
            })*/
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
    }
}
export default Home

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
})