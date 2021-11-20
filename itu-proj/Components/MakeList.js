import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UsersRef } from '../firebaseConfig';
import firebase from "firebase";
import MakeListScreen from '../Screens/MakeListScreen';

class MakeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: this.props.route.params['data'],
            shop: ''
        }
        this.setShop = this.setShop.bind(this);
    }

    componentDidMount(){
        console.log(this.state.ingredients)
    }

    setShop(text){
        this.setState({shop: text})
    }

    render() {
        return (
            <MakeListScreen  setShop={this.setShop} />
        )
    }
} export default MakeList