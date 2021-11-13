import React, { Component } from 'react'
import { ScrollView, Image, Text, View, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native'
import { get_recipe } from '../API/recipe_api'

class Homepage extends Component {
   state = {
      names: [
         {
            id: 0,
            name: 'Bryndzové halušky',
            image: require('../assets/favicon.png'),
            rate: 4.0,
            time: '40',
         },
         {
            id: 1,
            name: 'Baraní guláš',
            image: require('../assets/favicon.png'),
            rate: 4.0,
            time: '40',
         },
         {
            id: 2,
            name: 'Vajíčko s cibulkou',
            image: require('../assets/favicon.png'),
            rate: 4.0,
            time: '40',
         },
         {
            id: 3,
            name: 'Palacinky',
            image: require('../assets/favicon.png'),
            rate: 4.0,
            time: '40',
         },
         {
            id: 4,
            name: 'Bryndzové halušky',
            image: require('../assets/favicon.png'),
            rate: 4.0,
            time: '40',
         },
         {
            id: 5,
            name: 'Baraní guláš',
            image: require('../assets/favicon.png'),
            rate: 4.0,
            time: '40',
         },
         {
            id: 6,
            name: 'Vajíčko s cibulkou',
            image: require('../assets/favicon.png'),
            rate: 4.0,
            time: '40',
         },
         {
            id: 7,
            name: 'Palacinky',
            image: require('../assets/favicon.png'),
            rate: 4.0,
            time: '40',
         },
         {
            id: 8,
            name: 'Vajíčko s cibulkou na paprike so dakfhdjlkafiulwafkhiu kjfgewuifkhawieuk',
            image: require('../assets/favicon.png'),
            rate: 4.0,
            time: '40',
         },
         {
            id: 9,
            name: 'Palacinky',
            image: require('../assets/favicon.png'),
            rate: 4.0,
            time: '40',
         }
      ]
   }
   alertItemName = (item) => {
      alert(item.name)
   }

   /* onFoodsReceived = (foodList) => {
        this.setState(prevState => ({
        foodList: prevState.foodList = foodList
        }));
    }

   componentDidMount() {
    get_recipe(this.onFoodsReceived);
  }*/
    
   render() {
      return (
         <ScrollView style = {styles.content}>
            {
               this.state.names.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     style = {styles.container}
                     onPress = {() => this.alertItemName(item)}>

                    <View style = {styles.column}>
                        <Image style={{width: 40, height: 40, left: 10}} source={item.image}/>

                        <View style = {styles.text}>
                            <Text style = {styles.text_name}>
                                {item.name}
                            </Text>

                            <View style = {styles.icons}>
                                <Image style = {{width: 20, height: 20, right: 20}} source={require('../assets/rate.png')} />
                                <Text style = {styles.rate}>
                                    {item.rate}
                                </Text>

                                <Image style = {{width: 20, height: 20, left: 10}} source={require('../assets/clock.png')} />
                                <Text style = {styles.time}>
                                    {item.time}
                                </Text>
                            </View>
                        </View>
                     </View>
                     
                  </TouchableOpacity>
                 
               ))
            }
         </ScrollView>
      )
   }
}
export default Homepage

const styles = StyleSheet.create ({
    column: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
      marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      flex: 1,
    },
   container: {
      padding: 10,
      marginTop: 3,
      backgroundColor: '#d9f9b1',
   },
    icons: {
        flex:1,
        flexDirection: 'row',
        alignSelf: 'center',
        padding: 10,
    },
    text: {
        flex: 1,
        paddingLeft: 10,
    },
    time: {
        left: 20,
    },
    rate: {
        right: 10,
    },
    text_name: {
        textAlign: 'center',
        alignSelf: 'center',
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
})