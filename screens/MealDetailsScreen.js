import { View, Text, StyleSheet, ScrollView, Image, Platform} from "react-native";
import { HeaderButtons, Item, OverflowMenu, HiddenItem} from "react-navigation-header-buttons";
import {Feather} from "@expo/vector-icons";
import { useSelector } from "react-redux";

import React, { useCallback, useEffect } from "react";
import CustomHeaderButton from "../components/CustomHeaderButton";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { createMakeFavAction } from "../store/actions/mealsActions";

const ListItem = props => 
<View style={styles.listItems}>
   {props.children}
</View>;

const MealDetailsScreen = props => {

    const availableMeals = useSelector( state => state.meals.filteredMeals);
    const meal = availableMeals.find( meal => meal.id === props.navigation.getParam("mealId"));
    
    const favMeal = useSelector( state => state.meals.favoritesMeals);
    const mealIsFav = favMeal.some(meal => meal.id === props.navigation.getParam("mealId"));

    const mydispatcher = useDispatch();
    const favDispatchHandler = useCallback(
        () => {
            mydispatcher(createMakeFavAction(meal.id));
        },[mydispatcher, meal]
    );

    useEffect(()=>{
        props.navigation.setParams({title : meal.title});
    },[meal, favMeal]);

    useEffect(()=>{ props.navigation.setParams({dispatcher : favDispatchHandler})},[favDispatchHandler]);
    useEffect(()=>{ props.navigation.setParams({favMeal : favMeal })},[favMeal]);
    useEffect(()=>{ props.navigation.setParams({isFav : mealIsFav})},[mealIsFav]);


    return (
        <ScrollView style={styles.screen}>
            <Image source={{uri : meal.imageUrl}} style={styles.image}/>
            <View>
                <View style={{...styles.mealRow, ...styles.mealDetails}}>
                    <Text>{meal.duration}min</Text>
                    <Text>{meal.affordability.toUpperCase()}</Text>
                    <Text>{meal.complexity.toUpperCase()}</Text>
                </View>
            </View>

            <Text style={styles.ListTitle}>Ingrediens</Text>
            {meal.indrediens.map( indredien => <ListItem key={meal.indrediens.findIndex( ingre => ingre === indredien)}><Text style={{fontFamily: "myfont-regular"}}>{meal.indrediens.findIndex( ingre => ingre === indredien) + 1}: {indredien}</Text></ListItem>)}
            
            <Text style={styles.ListTitle}>Steps</Text>
            {meal.steps.map( step => <ListItem key={meal.steps.findIndex( stp => stp === step)}><Text style={{fontFamily: "myfont-regular"}}>{meal.steps.findIndex( stp => stp === step) + 1}: {step}</Text></ListItem>)}
        </ScrollView>
        
    );
}

MealDetailsScreen.navigationOptions = navigationData => {

const mealTitle = navigationData.navigation.getParam("title");
const dispatch = navigationData.navigation.getParam("dispatcher");
const isFav = navigationData.navigation.getParam("isFav");
    
return({
        headerTitle : mealTitle,
        headerRight : () => (
            <HeaderButtons
                HeaderButtonComponent={CustomHeaderButton}
            >
                <Item title="Favorite" iconName={isFav ? "ios-star" : "ios-star-outline"} onPress={dispatch}/>
                <OverflowMenu 
                    style={{marginLeft:-5}}
                    titleStyle={{color : Colors.accent}}
                    OverflowIcon={<Feather name="more-vertical" size={21} color={Platform.OS === "android" ? "white" : Colors.primary}/>}
                >
                    <HiddenItem title="Category's Meals" onPress={() => {navigationData.navigation.goBack()}} /> 
                    <HiddenItem title="Open Menu" onPress={() => {navigationData.navigation.openDrawer()}} />
                </OverflowMenu>
            </HeaderButtons>
        ),
    });
};

const styles = StyleSheet.create({
    screen : {
        flex : 1, 
        backgroundColor: "white",
    },
    mealRow : {
        flexDirection : "row"
    },
    mealDetails : {
        paddingVertical: 10,
        justifyContent : "space-between",
        paddingHorizontal : 5,
        alignItems : "center"
    },
    image : {
        width: "100%",
        height : 200, 
    },
    ListTitle : {
        fontFamily : "myfont-bold",
        textAlign: "center",
        fontSize: 22
    },
    listItems : {
        padding : 5,
        borderWidth : 1,
        borderColor : "orange",
        marginVertical : 7,
        marginHorizontal : 10,
    }
});

export default MealDetailsScreen;