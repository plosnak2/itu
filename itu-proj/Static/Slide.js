import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image, Number } from 'react-native';


const Slide = ({ item }) => {
    const {title, desc, backgroundColor, image, key} = item;
  
    // putting information on page
    return (
        <View
            style={[styles.slide, { backgroundColor }]}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.text2}>{desc}</Text>
            <Image source={image} style={styles.images}/>
        </View>
    );
};

const { width, height } = Dimensions.get('screen')
// styles for slides, texts and images
const styles = StyleSheet.create({
    slide: {
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
        //marginVertical: -50,
    },
    text: {
        justifyContent: 'flex-end',
        color: '#000',
        fontSize: 55,
        fontFamily: "Optima",
        fontWeight: "bold",
        //marginVertical: 20,
    },
    text2: {
        justifyContent: 'flex-end',
        color: '#000',
        fontSize: 20,
        fontFamily: "Optima",
        fontWeight: "bold",
        //marginTop: 50,
        margin: 50
    },
    images: {
        width,
        height: 280,
        bottom: 20
    }
});

export default Slide;