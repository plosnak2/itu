/**
 * Author: Slavomir Svorada (xsvora02)
 * This file is for onboarding screens
 */
import React, { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Text, Dimensions } from 'react-native';
import Indicators from '../Static/Indicators';
import Slide from '../Static/Slide';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Welcome = ({ slides = [], weDone }) => {
    if (!slides || !slides.length) return null;

    const [currentSlide, setCurrentSlide] = useState(1);
    const flatListRef = useRef();
    // get actual page index
    const onViewableItemsChanged = useRef((item) =>{
        const index = item.viewableItems[0].index;
        setCurrentSlide(index);
    });

    // setting the "Preskočiť" button
    const buttonSkip = () => {
        flatListRef.current.scrollToEnd({animated: true});
    };

    // setting the "Ďalšie" button 
    const buttonNext = () => {
        if(currentSlide >= slides.length - 1) return;
        flatListRef.current.scrollToIndex({index: currentSlide + 1});
    }


    return (
        <>
            <FlatList
            ref={flatListRef}
                horizontal
                pagingEnabled
                data={slides}
                keyExtractor={item => item.key.toString()}
                renderItem={({ item }) => <Slide item={item} />}
                onViewableItemsChanged = {onViewableItemsChanged.current}
            />
            <View style={styles.indicatorStyle}>
               <Indicators currentSlide={currentSlide} indicatorCount={slides.length}/>
            </View>
            {currentSlide < slides.length - 1 && (
                <Text onPress={buttonSkip} style={styles.skip}>
                    Preskočiť
                </Text>)}
            {currentSlide < slides.length - 1 ? (
                <Text onPress={buttonNext} style={styles.next}>
                    Ďalšie
                </Text> ) : (
                <Text onPress={weDone} style={styles.done}>
                    Hotovo
                </Text>)}   
        </>
    );
};

// screen width
const {width} = Dimensions.get('screen');

// styles for indicators and buttons
const styles = StyleSheet.create({
    indicatorStyle: {
        position: 'absolute',
        width,
        bottom: 25,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    skip: {
        fontSize: 18,
        color: 'black',
        left: 27,
        bottom: 60,
        letterSpacing: 2,
        position: 'absolute'
    },
    next: {
        fontSize: 18,
        color: 'black',
        right: 27,
        bottom: 60,
        letterSpacing: 2,
        position: 'absolute',
    },
    done: {
        fontSize: 20,
        color: 'black',
        right: 27,
        bottom: 60,
        letterSpacing: 2,
        position: 'absolute',
        borderRadius: 24,
        elevation: 23,
        borderWidth: 1,
        borderRadius: 7,
        backgroundColor: 'lightyellow',
        borderColor: 'black',
        overflow: 'hidden',
        width: 90,
        textAlign: 'center',
    }
    
});
export default Welcome;
