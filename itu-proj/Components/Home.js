import React, { Component } from 'react'
import { ScrollView, Image, Text, View, TouchableOpacity, StyleSheet, StatusBar, Platform, Button, Dimensions } from 'react-native'
import HomeScreen from '../Screens/homepage';
import { RecipeRef } from '../firebaseConfig';
import Navbar from '../Static/Navbar';
import Dropdown from './Dropdown';
import { Switch } from 'react-native-elements';

class Home extends Component {
    state = {
        Recipe: [],
        subscribe: 'a',
        filter: '',
        isPopupTrue: false,
        checked: false,
    }

    async get_data(filter){
        RecipeRef.onSnapshot((QuerySnapshot) => {
            let recipes = [];
            this.setState({Recipe: []})
            QuerySnapshot.forEach((doc) => {
                if(filter != ''){
                    let reci = doc.data()
                    let bool = true;
                    let add_flag = false;
                    let length = Object.keys(reci.ingredient).length;                    
                          filter.forEach((ingredient) => {
                              if(ingredient in reci.ingredient){
                                    add_flag = true;
                                }
                                else{
                                    bool=false;
                                }
                            });
                            if(bool && filter.length == length && this.state.checked){
                                recipes.push({ id: doc.id, data: doc.data() });
                            }
                            else if(this.state.checked == false && add_flag){
                                recipes.push({ id: doc.id, data: doc.data() });
                            }
                }
                else if(filter == ''){
                    recipes.push({ id: doc.id, data: doc.data() });
                }
            });
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
        this.get_data(filter);
        this.render();
        this.setState({filter: filter})
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : Platform.OS === 'ios' ? 40 : 0, paddingHorizontal: 10 }}>
                    <Dropdown set={this.filtered_ingredients} />
                    <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{ marginTop: 15 }}>Recepty iba s týmito surovinami, ktoré sú zadané</Text>
                        <Switch value={this.state.checked} color="orange" onValueChange={() => this.setState({checked: !this.state.checked})}/>
                    </View>
                </View>
                <ScrollView style={styles.content}>
                    {/*<Button
                title="Nastaviť filter"
                color="#0782F9"
                onPress={() => this.setState({ isPopupTrue: true })}
              />*/}
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
                {/*this.state.isPopupTrue && (
              <View style={styles.overlay}>
                <View style={(styles.popup, { marginTop: 50 })}>
                  <Dropdown set={this.filtered_ingredients} />
                  <View style={{flexDirection: 'row'}}>
                      <Text style={{marginTop: 15}}>Recepty iba s týmito surovinami</Text>
                        <Switch value={false} color="orange" />
                  </View>
                  <View style={{ backgroundColor: "blue" }}>
                    <Button
                      title="Filtrovať recepty, ktoré je možné pripraviť"
                      color="white"
                      onPress={() => this.setState({ isPopupTrue: false })}
                    />
                  </View>
                  <View style={{ backgroundColor: "blue", marginTop: 50 }}>
                    <Button
                      title="Filtrovať recepty, ktoré je možné pripraviť"
                      color="white"
                      onPress={() => this.setState({ isPopupTrue: false })}
                    />
                  </View>
                </View>
              </View>
            )*/}
                <Navbar />
            </View>
        );
    }
}
export default Home

const styles = StyleSheet.create({
    content: {
        //marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : Platform.OS === 'ios' ? 40 : 0,
        flex: 1,
    },
    container: {
        padding: 10,
        marginTop: 3,
        backgroundColor: '#d9f9b1',
    },
    overlay: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "lightblue",
        opacity: 0.9,
        width: "100%",
        height: Dimensions.get('window').height
      },
      text: {
        width: "20%",
        fontSize: 15,
        color: "black",
        fontWeight: "bold",
        marginTop: 50
      },
})