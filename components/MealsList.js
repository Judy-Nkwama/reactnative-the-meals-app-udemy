import React from "react";
import { StyleSheet, View, Text, FlatList} from "react-native";
import Meal from "../components/Meal";
import { Ionicons } from "@expo/vector-icons";

const MealsList = (props) => {

    const ListEmpty = () => {
        return(
            <View style={style.emptyList}>
                <Ionicons name="md-cloud-download-outline" size={40} color="black" />
                <Text>Nothing to show for the moment</Text>
            </View>
        );
    }

    const renderMeals = meal => {
        return (
           <Meal 
            meal={meal.item} 
            onSelect={() => {
                props.navigation.navigate({routeName : "MealDetails", params : {mealId : meal.item.id} });
            }} 
           />
        );
    }

    return (
        <View style={style.list}>
            <FlatList 
                data={props.data}
                keyExtractor={ (item, index) => item.id}
                renderItem={renderMeals}
                style={{width : "100%", padding : 10}}
                ListEmptyComponent={ListEmpty}
                contentContainerStyle={style.forFlexFlatlisf}
            />
        </View>
    );
}

const style = StyleSheet.create({
    list : {
        flex : 1,
        paddingVertical : 3,
        backgroundColor: "white",
        height : "100%",
    },
    forFlexFlatlisf : {
        flex : 1,
    },
    emptyList : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center"
    },
    message : {
        fontFamily : "myfont-regular",
    }
});

export default MealsList;