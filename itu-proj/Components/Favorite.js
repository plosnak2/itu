/**
 * Author: Jozef Čásar (xcasar)
 * This is logical and graphic component that displays if this is users favorite recipe
 */
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UsersRef } from '../firebaseConfig';
import firebase from "firebase";

class Favourite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            user: ''
        }
    }

    //check if user has this recipe in favorite recipes
    async getUser() {
        const user = await AsyncStorage.getItem('email');
        this.setState({user: user})
        UsersRef.doc(this.state.user).get().then((doc) => {
            if (doc.exists){
                this.setState({flag: doc.data().favourites.includes(this.props.id)})
            }        
        });
    }
    componentDidMount(){
        this.getUser();
    }

    //when user press the heart, database is updated
    make_favourite = () => {
        if(this.state.flag == false){
            UsersRef.doc(this.state.user).update({favourites: firebase.firestore.FieldValue.arrayUnion(this.props.id)})
        }
        else if(this.state.flag == true){
            UsersRef.doc(this.state.user).update({favourites: firebase.firestore.FieldValue.arrayRemove(this.props.id)})
        }
        this.setState({flag: !this.state.flag})
    }
    //displaying fill or out-line heart, changed when user press heart
    render() {
        return (
            <TouchableOpacity onPress={() => this.make_favourite()}>

                {this.state.flag == false ? <Ionicons name="heart-outline" size={40} color="black" /> : <Ionicons name="heart" size={40} color="black" />}
            </TouchableOpacity>
        );
    }
} export default Favourite