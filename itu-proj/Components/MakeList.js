/**
 * Author: Jakub Zaukolec (xzauko00)
 * This is logical component for making shopping list -> redirected from Recipe.js
 */
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UsersRef } from '../firebaseConfig';
import firebase from "firebase";
import MakeListScreen from '../Screens/MakeListScreen';
import {Platform, Alert, View, ActivityIndicator, StyleSheet} from 'react-native'

class MakeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: this.props.route.params['data'],
            filter: this.props.route.params['filter'],
            shop: '',
            date: new Date(),
            mode: 'date',
            show: false,
            itemName: '',
            itemQuantity: '',
            shopping: [],
            loaded: false
        }
        this.setShop = this.setShop.bind(this);
        this.showDatepicker = this.showDatepicker.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeItemName = this.onChangeItemName.bind(this);
        this.onChangeItemQuantity = this.onChangeItemQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    // if user used filter in home screen i need to filter out and delete ingredients from list that are contained in recipe from which he want to make list
    async componentDidMount(){
        const result = await AsyncStorage.getItem('email');
        const user =  await UsersRef.doc(result).get();
        
        Object.entries(this.props.route.params['data']).map(([key, value]) => { 
            this.state.filter.forEach(element => {
                if(element == key){
                    delete this.state.ingredients[key]
                } 
            });
        })
        
        this.setState({shopping: user.data().shopping})
        this.setState({loaded: true})
    }

    // function for imported DateTimePicker component
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date;
        this.setState({show: Platform.OS === 'ios'})
        this.setState({date: currentDate})
    };

    // function for imported DateTimePicker component
    showMode = (currentMode) => {
        this.setState({show: true})
        this.setState({mode: currentMode})
    };
    
    // function for imported DateTimePicker component
    showDatepicker = () => {
        this.showMode('date');
    };

    // function that sets state of name of shop
    setShop(text){
        this.setState({shop: text})
    }

    // function that sets state of name of ingredient
    onChangeItemName(text){
        this.setState({itemName: text})
    }

    // function that sets state of quantity of ingredient
    onChangeItemQuantity(text){
        this.setState({itemQuantity: text})
    }

    // function that add new ingredient into the shopping list (into the map of ingredients)
    onSubmit(){
        if(this.state.itemName == '' || this.state.itemQuantity == ''){
            Alert.alert("Pre pridanie suroviny musíte zadať aj druh aj množstvo")
        } else {
            const reducedArr = this.state.ingredients;
            reducedArr[this.state.itemName] = this.state.itemQuantity
            this.setState({ingredients: reducedArr})
            this.setState({itemName: ''})
            this.setState({itemQuantity: ''})
        }
    }

    // function that creates new shopping list and send information onto the firebase 
    async onCreate(){
        if(this.state.shop == ''){
            Alert.alert("Zadajte názov obchodu")
        } else {
            const list= {
                shop: this.state.shop,
                date: this.state.date,
                items: this.state.ingredients
            }
            await this.setState({ 
                shopping: [...this.state.shopping, list] 
           })
           const result = await AsyncStorage.getItem('email');
           UsersRef.doc(result).update({shopping: this.state.shopping})
           .then(() => {
                this.props.navigation.navigate('Shopping')
            });
        } 
    }

    render() {
        if(this.state.loaded == false){
            return(
                <View style={[styles.container2, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0782F9"/>
                </View>
            )
        }
        return (
            <MakeListScreen  setShop={this.setShop} showDatepicker={this.showDatepicker} date={this.state.date} mode={this.state.mode} onChange={this.onChange} show={this.state.show} ingredients={this.state.ingredients} onChangeItemName={this.onChangeItemName} onChangeItemQuantity={this.onChangeItemQuantity} onSubmit={this.onSubmit} itemName={this.state.itemName} itemQuantity={this.state.itemQuantity} onCreate={this.onCreate}/>
        )
    }
} export default MakeList

const styles = StyleSheet.create({
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