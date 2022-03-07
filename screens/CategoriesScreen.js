import { View, FlatList, StyleSheet, StatusBar, Platform } from "react-native";
import {CATEGORIES} from "../data/dummy-data";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import React from "react";
import Colors from "../constants/Colors";
import CategoryGridTile from "../components/CategoryGridTile";
import CustomHeaderButton from "../components/CustomHeaderButton";

const CategoriesScreen = props => {

    const categoriesHandler = items => {
        return(
            <CategoryGridTile
                title={items.item.title} 
                id={items.item.id}
                color={items.item.color}
                navigation={props.navigation}
            />
        );
    }
    
    return (
        <View style={styles.catView}>
            <StatusBar barStyle={Platform.OS === "android" ? "light-content" : "dark-content"} backgroundColor={Platform.OS === "android" ? Colors.primary : "transparent"} />
            <FlatList 
                numColumns={2} 
                data={CATEGORIES}
                renderItem={categoriesHandler}
            />
        </View>
    );
}

CategoriesScreen.navigationOptions = navigationData => {
    return (
        {
            headerTitle : "Home-Categories",
            headerLeft : () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item iconName="ios-menu" onPress={() => {
                            navigationData.navigation.toggleDrawer();
                        }}/>
                    </HeaderButtons>
                );
            },
        }
    );
}


const styles = StyleSheet.create({
    screen : {
        flex : 1,
        justifyContent: "center",
        alignItems : "center",
    },
    catView : {
        backgroundColor : "white",
    }
});

export default CategoriesScreen;