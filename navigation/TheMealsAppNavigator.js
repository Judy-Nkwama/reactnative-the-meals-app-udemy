import React from "react";
import { Platform} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import FavoritesMealsScreen from "../screens/FavoritesMealsScren";
import FiltersScreen from "../screens/FiltersScreen";

import Colors from "../constants/Colors";

const defaultStyleHelper = Platform.OS === "ios" ? {
    backgroundColor : "",
    borderBottomWidth : 2,
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 5},
    shadowRadius : 10,
    shadowOpacity: 0.3,
} : 
{ 
    backgroundColor : Colors.primary,
};
const defaultTitleStyle = {
    fontFamily : "myfont-bold",
};

const backTitleStyle = {
    fontFamily : "myfont-regular",
}

const MealsStackNavigator = createStackNavigator(
    {
        Categories : {
            screen : CategoriesScreen,
            navigationOptions : {
                headerStyle : defaultStyleHelper,
                headerTitleStyle : defaultTitleStyle,
                headerTruncatedBackTitle : "Retour",
                headerBackTitleStyle : backTitleStyle,
            },
        },
        CategoryMeals : {
            screen : CategoryMealsScreen,
            navigationOptions : {
                headerStyle : defaultStyleHelper,
                headerTitleStyle : defaultTitleStyle,
                headerTruncatedBackTitle : "Retour",
                headerBackTitleStyle : backTitleStyle,
            },
        },
        MealDetails : {
            screen : MealDetailsScreen,
            navigationOptions : {
                headerStyle : defaultStyleHelper,
                headerTitleStyle : defaultTitleStyle,
                headerTruncatedBackTitle : "Retour",
                headerBackTitleStyle : backTitleStyle,
                headerBackTitleVisible : false,
            },
        }
    },{
        //initialRouteName : "Categories",
        defaultNavigationOptions : {
            headerStyle : defaultStyleHelper,
            headerTitleStyle : defaultTitleStyle,
            headerTruncatedBackTitle : "Retour",
            headerBackTitleStyle : backTitleStyle,
            headerTintColor : Platform.OS === "android" ? "white" : Colors.primary,
        },
    }
);

const FavoritesMealsStack = createStackNavigator({
    Favorites : {
        screen : FavoritesMealsScreen,
    },
    Detaites : MealDetailsScreen,
},
{
    defaultNavigationOptions : {
        headerTitle : "Favorites Meals",
        headerStyle : defaultStyleHelper,
        headerTitleStyle : defaultTitleStyle,
        headerTruncatedBackTitle : "Retour",
        headerBackTitleStyle : backTitleStyle,
        headerTintColor : Platform.OS === "android" ? "white" : Colors.primary,
    }, 
});

const creens = {
    Meals : {
        screen : MealsStackNavigator,
        navigationOptions : {
            tabBarLabel : "Meals",
            tabBarIcon : (tabData) => {
                return <Ionicons size={23} color={tabData.tintColor} name="restaurant" />; 
            },
            tabBarColor : Colors.primary,
        }
    },
    Favorites : {
        screen : FavoritesMealsStack,
        navigationOptions : {
            tabBarLabel : "My Favorites!",
            tabBarIcon : (tabData) => {
                return <Ionicons size={23} color={tabData.tintColor} name="star"/>;
            },
            tabBarColor : Colors.accent,
        },
    }
};

const MealsTabNavigator = Platform.OS === "ios" ? 
createBottomTabNavigator(
    creens,
    {
        tabBarOptions : {
            labelStyle : {
                fontFamily : "myfont-bold",
            },
            activeTintColor : Colors.accent
        }
    }
) : createMaterialBottomTabNavigator(
    creens,
    {
        activeColor : "white",
        shifting : true
    }
);

const FilterStack = createStackNavigator({
    Filters : {
        screen : FiltersScreen,
        navigationOptions : {
            headerTitle : "Meals Filter",
            headerStyle : defaultStyleHelper,
            headerTitleStyle : defaultTitleStyle,
            headerTruncatedBackTitle : "Retour",
            headerBackTitleStyle : backTitleStyle,
        }
    }
});

const AppMenu = createDrawerNavigator({
    Meals : {
        screen : MealsTabNavigator,
        navigationOptions : {
            drawerLabel : "All the meals",
            drawerIcon : () => {
                <Ionicons name="restaurant" size={22} color={Colors.primary} />
            }
        }
    },
    Filter : {
        screen : FilterStack,
        navigationOptions : {
            drawerLabel : "Preferences",
            headerStyle : defaultStyleHelper,
            headerTitleStyle : defaultTitleStyle,
            headerTruncatedBackTitle : "Retour",
            headerBackTitleStyle : backTitleStyle, 
        }
    }
},{
    //drawerBackgroundColor : Platform.OS === "ios" ? "transparent" : Colors.primary,
    contentOptions : {
        activeTintColor : Colors.accent,
        labelStyle : {
            fontFamily : "myfont-bold",
        }
    }
});





const TheMealsAppNavigator = createAppContainer(AppMenu);
export default TheMealsAppNavigator;