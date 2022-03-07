import { View, Text, StyleSheet, TouchableOpacity, ImageBackground} from "react-native";

const Meal = props => {
    return (
        <View style={style.container}>
            <TouchableOpacity onPress={props.onSelect}>
                <View>
                    <View style={{...style.mealRow, ...style.mealHeader}}>
                        <ImageBackground 
                            source={{uri : props.meal.imageUrl}} resizeMode="cover" style={style.bgImage}
                        >
                            <View style={style.titleContainer}>
                                <Text style={style.title} numberOfLines={2}>{props.meal.title}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{...style.mealRow, ...style.mealDetails}}>
                        <Text>{props.meal.duration}min</Text>
                        <Text>{props.meal.affordability.toUpperCase()}</Text>
                        <Text>{props.meal.complexity.toUpperCase()}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    container : {
        height : 200,
        width : "100%",
        backgroundColor : "#e0deee",
        marginBottom : 10,
        overflow : "hidden",
        borderRadius : 7
    },
    mealRow : {
        flexDirection : "row"
    },
    mealHeader : {
        height : "85%"
    },
    bgImage : {
        width : "100%",
        height : "100%",
        justifyContent : "flex-end"
    },
    titleContainer : {
        paddingVertical : 3,
        paddingHorizontal : 7,
        backgroundColor : "rgba(0,0,0,0.5),"
    },
    title : {
        fontFamily : "myfont-bold",
		fontSize : 20,
        color : "white",
        textAlign : "right",
        marginBottom : 5
    },
    mealDetails : {
        height: "15%",
        justifyContent : "space-between",
        paddingHorizontal : 5,
        alignItems : "center"
    }
});



export default Meal;