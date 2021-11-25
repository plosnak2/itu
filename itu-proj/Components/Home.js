import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, StatusBar, Platform, ActivityIndicator, ImageBackground } from 'react-native'
import HomeScreen from '../Screens/homepage';
import { RecipeRef } from '../firebaseConfig';
import Navbar from '../Static/Navbar';
import Dropdown from './Dropdown';
import { Switch } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Add from '../Static/AddButton';

class Home extends Component {
    state = {
        Recipe: [],
        subscribe: 'a',
        filter: '',
        isPopupTrue: false,
        checked: false,
        loading: true,
    }

    async get_data(filter) {
        RecipeRef.onSnapshot((QuerySnapshot) => {
            let recipes = [];
            this.setState({ Recipe: [] })
            QuerySnapshot.forEach((doc) => {
                if (filter != '') {
                    let reci = doc.data()
                    //let bool = true;
                    let bool_i = 0;
                    let add_flag = false;
                    let length = Object.keys(reci.ingredient).length;
                    filter.forEach((ingredient) => {
                        if (ingredient in reci.ingredient) {
                            add_flag = true;
                        }
                        else {
                            //bool=false;
                            bool_i++;
                        }
                    });
                    if ((filter.length - bool_i == length) && filter.length >= length && this.state.checked) {
                        recipes.push({ id: doc.id, data: doc.data() });
                    }
                    else if (this.state.checked == false && add_flag) {
                        recipes.push({ id: doc.id, data: doc.data() });
                    }
                }
                else if (filter == '') {
                    recipes.push({ id: doc.id, data: doc.data() });
                }
            });
            this.setState({ Recipe: recipes });
        });
    }

    componentDidMount() {
        this.get_data('');
        this.setState({ loading: false })
        /*let imageRef = firebase.storage().ref('/AjeuQGuaecKrhM4pUgb9.png');
        imageRef
        .getDownloadURL()
        .then((url) => {
            //from url you can fetched the uploaded image easily
            console.log(url);
        })*/
    }
    rate = (rate, rate_count) => {
        if (rate_count == 0) {
            return "Nehodnotené"
        }
        return (rate / rate_count)
    }

    filtered_ingredients = (filter) => {
        this.get_data(filter);
        this.render();
        this.setState({ filter: filter })
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0782F9" />
                </View>
            )
        }
        return (
            
            <ImageBackground source={require('../assets/profilebg.png')} resizeMode="cover" style={styles.imagebg} imageStyle={{ opacity: 0.1 }}>
            
                <View style={{ flex: 1 }}>
                    <View style={{ marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : Platform.OS === 'ios' ? 40 : 0, paddingHorizontal: 10, zIndex:100 }}>
                        <Dropdown set={this.filtered_ingredients} />
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ marginTop: 15 }}>Recepty iba s týmito surovinami, ktoré sú zadané</Text>
                            <Switch value={this.state.checked} color="orange" onValueChange={() => { this.setState({ checked: !this.state.checked }); this.filtered_ingredients(this.state.filter) }} />
                        </View>
                    </View>
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
                        
                    </ScrollView>
                    <Add />
                    <Navbar />
                   
                </View>
               
            </ImageBackground>
        );
    }
}
export default Home

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 10,
        //marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : Platform.OS === 'ios' ? 40 : 0,
        flex: 1,
    },
    container: {
        padding: 10,
        marginTop: 3,
        backgroundColor: 'orange',
        borderRadius: 10,
    },
    imagebg: {
        flex: 1,
        opacity: 10
    },
    add:{
        position:"absolute",
        zIndex:100,
        top:0
        
    }
})