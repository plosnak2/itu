import React, { Component } from 'react'
import { ScrollView, Image, Text, View, TouchableOpacity, StyleSheet, StatusBar, Platform, ActivityIndicator, ImageBackground } from 'react-native'
import ShoppingScreen from '../Screens/ShoppingScreen';
import { RecipeRef } from '../firebaseConfig';
import Navbar from '../Static/Navbar';
import { UsersRef } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyShopping from '../Screens/EmptyShopping';

class Shopping extends Component {
    constructor(props) {
        super(props);
        this.deleteList = this.deleteList.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.state = {
            shopping: [],
            loaded: false
        }
    };
    
    
    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', async() => {
            const result = await AsyncStorage.getItem('email');
            const user =  await UsersRef.doc(result).get();
            
            this.setState({shopping: user.data().shopping})
            this.setState({loaded: true})
            console.log(this.state.shopping.length)
          });
        
    }

    componentWillUnmount () {
        this.unsubscribe()
    }

    async deleteList(index) {
        const reducedArr = [...this.state.shopping];
        reducedArr.splice(index, 1);
        this.setState({shopping: reducedArr})
        const result = await AsyncStorage.getItem('email');
        UsersRef.doc(result).update({shopping: this.state.shopping})
        .then(() => {
            console.log('User updated!');
        });
    }

    async deleteItem(index, key){
        const reducedArr = [...this.state.shopping];
        delete reducedArr[index].items[key];
        this.setState({shopping: reducedArr})
        const result = await AsyncStorage.getItem('email');
        UsersRef.doc(result).update({shopping: this.state.shopping})
        .then(() => {
            console.log('User updated!');
        });
    }
    
    render() {
        if(this.state.loaded == false){
            return(
                <View style={[styles.container2, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0782F9"/>
                </View>
            )
        } else {
            if(this.state.shopping.length == 0){
                return(
                    <EmptyShopping></EmptyShopping>
                )
            } else {
                return(
                    <ImageBackground source={require('../assets/profilebg.png')} resizeMode="cover" style={styles.imagebg} imageStyle={{opacity: 0.1}}>
                    <View style={{flex:1}}>
                        <ScrollView style={styles.content}>
                            {this.state.shopping.map((item, index, array) => (
                                
                                    <ShoppingScreen item={item} index={index} deleteList={this.deleteList} deleteItem={this.deleteItem}/>
                                
                            ))}
                        </ScrollView>
                        <View style={{marginTop:100}}></View>
                        <Navbar />
                        
                    </View>
                    </ImageBackground>
                )
            }
        }
    }
}
export default Shopping

const styles = StyleSheet.create({
    content: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : Platform.OS === 'ios' ? 40 : 0,
        flex: 1
    },
    imagebg:{
        flex: 1,
        opacity:10
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