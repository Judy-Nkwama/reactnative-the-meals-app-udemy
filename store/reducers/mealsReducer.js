import {MEALS} from "../../data/dummy-data";
import { TOGGLE_FAVORITE, FILTER_MEALS} from "../actions/mealsActions"; 

const initialState = {
    meals : MEALS,
    favoritesMeals : [],
    filteredMeals : MEALS, 
}

const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existingMealId = state.favoritesMeals.findIndex( meal => meal.id === action.payload );
            if(existingMealId >= 0){
                return { ...state, favoritesMeals : state.favoritesMeals.filter( meal => meal.id !== action.payload) }
            }else{
                const copyOfFavMeals = [...state.favoritesMeals];
                return {...state, favoritesMeals : copyOfFavMeals.concat(state.meals.find(meal => meal.id === action.payload ))}
            }
        case FILTER_MEALS:

            const filterCriterias = action.payload;
            const updatedFilteredMeals = state.meals.filter( meal => {
                if(filterCriterias.glutenFree && !meal.isGlutenFree){ return false; }
                if(filterCriterias.lactoseFree && !meal.isLactoseFree){ return false; }
                if(filterCriterias.vegan && !meal.isVegan){ return false; }
                if(filterCriterias.vegeterian && !meal.isVegetaria){ return false; }
                return true;
            });
            return {...state, filteredMeals : updatedFilteredMeals };
        default:
            return state;
    }
};

export default mealsReducer; 