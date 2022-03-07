import React from "react";
import { TouchableOpacity, View, Text, StyleSheet} from "react-native";

const CategoryGridTile = props => {

	return (
		<TouchableOpacity
			style={style.categoryItem}
			onPress={() => {
				props.navigation.navigate({
				routeName: "CategoryMeals",
				params: {
					categoryId: props.id,
				},
			});
		}}>
			<View style={{...style.grid,...{backgroundColor : props.color}}}>
				<Text style={style.title} numberOfLines={2}>{props.title}</Text>
			</View>
		</TouchableOpacity>
 	);
};

const style = StyleSheet.create({
	categoryItem : {
        flex : 1,
        margin : 15,
        height : 150
    },
	grid : {
		flex : 1,
		borderRadius : 10,
		shadowColor : "black",
		shadowOffset : { width : 2, height: 1},
		shadowOpacity : 0.25,
		shadowRadius : 3,
		elevation : 3,
		padding : 10,
		justifyContent : "flex-end",
		alignItems : "flex-end",
		textAlign : "right"

	},
	title : {
		fontFamily : "myfont-bold",
		fontSize : 20,
	}
});

export default CategoryGridTile;