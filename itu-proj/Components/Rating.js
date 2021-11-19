import React, { useState } from "react";
import { View, Button} from "react-native";
import { AirbnbRating } from 'react-native-ratings';
import { UsersRef, RecipeRef } from "../firebaseConfig";

const RecipeRating = ({actualRating, user, id, rate_count, rate}) => {
    let default_rating = actualRating;

    /*const reset = () => {
        defaultRating = 0;
    }*/

    const ratingCompleted = (rating) => {
        if(default_rating == 0){
            rate_count++; 
        }
        rate = rate + (rating - default_rating)
        default_rating = rating;
        RecipeRef.doc(id).update({"rate": rate})
        RecipeRef.doc(id).update({"rate_count": rate_count})
        UsersRef.doc(user).update({["rating."+id]:rating})
      }
    return (
        <View style={{alignSelf: 'stretch'}}>
        <AirbnbRating size={20} defaultRating={default_rating} onFinishRating={ratingCompleted} showRating={false}/>
        {/*<Button onPress={reset} title="Reset rating" color="#841584"/>*/}
        </View>
    )
    
} 
export default RecipeRating