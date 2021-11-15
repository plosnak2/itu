import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core'

const Navbar = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.navbar}>
            <TouchableOpacity onPress={() =>
                navigation.navigate('Home')
              }>
            <View style={styles.item1}>
                <Ionicons name="fast-food" size={40} color="white" />
                <Text style={styles.text}>Recepty</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={styles.item2}>
                <Ionicons name="add-circle" size={40} color="white" />
                <Text style={styles.text}>Pridať recept</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={styles.item3}>
                <Ionicons name="person" size={40} color="white" />
                <Text style={styles.text}>Profil</Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}

export default Navbar

const styles = StyleSheet.create({
    navbar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignSelf: 'stretch',
        flex: 1,
        width: "100%",
        backgroundColor: '#0782F9',
        height: 90,
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item1:{
        marginLeft:50,
        padding:10,
        alignItems: 'center'
    },
    item3:{
        marginRight:50,
        padding:10,
        alignItems: 'center'
    },
    item2:{
        padding:10,
        alignItems: 'center'
    },
    text:{
        fontSize:15,
        fontWeight: 'bold',
        color: 'white'
    }
})
