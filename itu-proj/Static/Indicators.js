/**
 * Author: Slavomir Svorada (xsvora02)
 * This file is for settings indicators for onboarding screen
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Indicators = ({indicatorCount, currentSlide}) => {
    if(!indicatorCount || typeof indicatorCount !== 'number') return null;

    let indicators = [];
    for (let i = 0; i < indicatorCount; i++) {
        indicators.push(i);
    }
    return indicators.map((indicator, index) => (
    // checking current slide and fill indicator
    <View key={indicator.toString()}
    style={[styles.indicator, index === currentSlide ? styles.selected : styles.unselected]}/>
    ));
}

// styles for indicators
const styles = StyleSheet.create({
    indicator: {
        width: 10,
        height: 10,
        backgroundColor: 'black',
        borderRadius: 5,
        marginHorizontal: 5
     },
     selected: {
         backgroundColor: 'black',
     },
     unselected: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'black',
    }
})

export default Indicators;