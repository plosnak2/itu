import React, { useState } from "react";
import { View, Button} from "react-native";
import { AirbnbRating } from 'react-native-ratings';

const RecipeRating = (actualRating) => {
    let defaultRating = actualRating['actualRating'];

    const reset = () => {
        defaultRating = 0;
    }
    const ratingCompleted = (rating) => {
        defaultRating = rating;
      }
    return (
        <View style={{alignSelf: 'stretch'}}>
        <AirbnbRating size={20} defaultRating={defaultRating} onFinishRating={ratingCompleted} showRating={false}/>
        <Button onPress={reset} title="Reset rating" color="#841584"/>
        </View>
    )
    
} 
export default RecipeRating