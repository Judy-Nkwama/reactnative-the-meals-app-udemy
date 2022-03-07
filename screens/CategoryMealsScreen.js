import {CATEGORIES} from "../data/dummy-data";
import { useSelector } from "react-redux";
import React from "react";
import MealsList from "../components/MealsList";

const CategoryMealsScreen = props => {
    const availableMeals = useSelector( state => state.meals.filteredMeals);
    const CategyMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(props.navigation.getParam("categoryId")) >= 0);
    return <MealsList data={CategyMeals} navigation={props.navigation}/>
} 

CategoryMealsScreen.navigationOptions = navigationData => {
    const category = CATEGORIES.find( items => items.id === navigationData.navigation.getParam("categoryId"));
    return { 
        headerTitle : category.title,
    };
}

export default CategoryMealsScreen;