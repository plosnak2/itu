import React, { Component } from 'react'
import { ScrollView, Image, Text, View, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native'
import HomeScreen from '../Screens/homepage';
import { RecipeRef } from '../firebaseConfig';
import Navbar from '../Static/Navbar';
import Dropdown from './Dropdown';

class Home extends Component {
    state = {
        Recipe: [],
        subscribe: 'a',
        filter: '',
    }

    async get_data(filter){
        RecipeRef.onSnapshot((QuerySnapshot) => {
            let recipes = [];
            this.setState({Recipe: []})
            QuerySnapshot.forEach((doc) => {
                if(filter != ''){
                    let reci = doc.data()
                    console.log("Som tu ")
                    
                          filter.forEach((ingredient) => {if(ingredient in reci.ingredient){recipes.push({ id: doc.id, data: doc.data() });}})
                    ;
                }
                else if(filter == ''){
                    console.log("tu nechcem byt")
                recipes.push({ id: doc.id, data: doc.data() });
                }
            });
            console.log(recipes)
            this.setState({ Recipe: recipes });
        });
    }

    componentDidMount() {
        this.get_data('');
            /*let imageRef = firebase.storage().ref('/AjeuQGuaecKrhM4pUgb9.png');
            imageRef
            .getDownloadURL()
            .then((url) => {
                //from url you can fetched the uploaded image easily
                console.log(url);
            })*/
    }
    rate = (rate, rate_count) => {
        if(rate_count == 0){
            return "Nehodnotené"
        }
        return (rate/rate_count)
    }

    filtered_ingredients = (filter) => {
        console.log(filter)
        this.get_data(filter);
        console.log(this.state.Recipe)
        this.render();
        this.setState({filter: filter})
          /*let recipe_ingredient = [];
          if(filter != ''){
          this.state.Recipe.map((item, index) => (
                filter.forEach((ingredient) => {if(ingredient in item.data.ingredient){console.log(this.state.filter);console.log(item.data.name); this.componentDidMount()}})
          ));
          }*/
          //this.componentDidMount
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={{marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : Platform.OS === 'ios' ? 40 : 0,}}>
                    <Dropdown set={this.filtered_ingredients}/>
                </View>
                
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
                            <HomeScreen item={item} rate={this.rate(item.data.rate, item.data.rate_count)}/>
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
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : Platform.OS === 'ios' ? 40 : 0,
        flex: 1,
    },
    container: {
        padding: 10,
        marginTop: 3,
        backgroundColor: '#d9f9b1',
    },
})