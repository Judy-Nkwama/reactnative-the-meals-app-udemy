export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const FILTER_MEALS = "FILTER_MEALS";

export const createMakeFavAction = id => {
    return {
        type : TOGGLE_FAVORITE,
        payload : id
    }
}

export const createMealsFilterAction = filters => {
    return{
        type : FILTER_MEALS,
        payload : filters
    }
}