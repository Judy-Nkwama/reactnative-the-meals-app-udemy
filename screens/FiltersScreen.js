import React, {useEffect, useState, useCallback} from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import Colors from "../constants/Colors";
import { createMealsFilterAction } from "../store/actions/mealsActions";
import { useDispatch } from "react-redux";

const SwitchBut = props => {
    return(
        <View style={styles.filterContainer}>
            <Text>{props.title}</Text>
            <Switch thumbColor={ Platform.OS === "android" ? Colors.primary : "#968fa8"} trackColor={{true : Colors.primary, false: "#8c8b8f"}} value={props.value} onValueChange={props.onValueChange} />
        </View>
    );
};

const FiltersScreen = props => {
    const { navigation } = props;
    const [ isGlutenFree, setIsGlutenFree ] = useState(false);
    const [ isLactoseFree, setIsLactoseFree ] = useState(false);
    const [ isVegan, setIsVegan ] = useState(false);
    const [ isVegeterian, setIsvegetarian ] = useState(false);

    const myDispatcher = useDispatch();

    const saveFilter = useCallback(
        () => {
            const filterCapture = {
                glutenFree : isGlutenFree,
                lactoseFree : isLactoseFree,
                vegan :isVegan,
                vegeterian : isVegeterian
            };
            myDispatcher(createMealsFilterAction(filterCapture));
            //console.log(filterCapture);
        },[isGlutenFree, isLactoseFree, isVegan, isVegeterian, myDispatcher]
    );

    useEffect( () => {
        props.navigation.setParams({save : saveFilter});
    }, [saveFilter]);


    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters</Text>
            <SwitchBut title="Gluten-Free" value={isGlutenFree} onValueChange={()=>{setIsGlutenFree(!isGlutenFree)}} />
            <SwitchBut title="Lactose-Free" value={isLactoseFree} onValueChange={()=>{setIsLactoseFree(!isLactoseFree)}} />
            <SwitchBut title="Vegan" value={isVegan} onValueChange={()=>{setIsVegan(!isVegan)}} />
            <SwitchBut title="vegetarian" value={isVegeterian} onValueChange={()=>{setIsvegetarian(!isVegeterian)}} />
        </View>
    );
} 

FiltersScreen.navigationOptions = navigationData => {
    return(
        {   
            headerTintColor : Platform.OS === "android" ? "white" : Colors.primary,
            headerLeft : () =>  <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                <Item iconName="ios-menu" onPress={() => {navigationData.navigation.toggleDrawer();}}/>
            </HeaderButtons>,
            headerRight : () =>  <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                <Item iconName="ios-save" onPress={() => {
                    navigationData.navigation.getParam("save")();
                }}/>
            </HeaderButtons>,
        }
    );
}

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        paddingHorizontal : "10%"
    },
    title : {
        fontFamily : "myfont-bold",
        textAlign: "center",
        fontSize: 22,
        margin: 20
    },
    filterContainer : {
        flexDirection: "row",
        justifyContent :"space-between",
        alignItems: "center",
        marginVertical : Platform.OS === "ios" ? 5 : 0,
    }
});

export default FiltersScreen;