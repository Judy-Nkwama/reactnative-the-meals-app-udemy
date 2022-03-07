import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import React from "react";
import MealsList from "../components/MealsList";

const FavoritesMealsScreen = props => {
    const favMeals = useSelector( state => state.meals.favoritesMeals);
    return <MealsList 
        data={favMeals}
        navigation={props.navigation}
    />
}

const styles = StyleSheet.create({

});

export default FavoritesMealsScreen;