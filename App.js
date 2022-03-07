import React, {useState} from "react";
import TheMealsAppNavigator from "./navigation/TheMealsAppNavigator";
import {OverflowMenuProvider} from "react-navigation-header-buttons";
import { createStore, combineReducers } from "redux";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";

import * as Fonts from "expo-font";
import AppLoading from 'expo-app-loading';
import mealsReducer from "./store/reducers/mealsReducer";

const reducersRoot = combineReducers({
    meals : mealsReducer
});

const store = createStore(reducersRoot);


enableScreens();
const loadFonts = () => {
    return Fonts.loadAsync(
        {
            "myfont-bold" : require("./assets/fonts/OpenSans-Bold.ttf"),
            "myfont-regular" : require("./assets/fonts/OpenSans-Regular.ttf")
        }
    );
}
export default function App() {
    
    const [fontsLoaded, setFontsLoaded] = useState(false);

    if(!fontsLoaded){
        return <AppLoading startAsync={loadFonts} onFinish={ () => { setFontsLoaded(true)}} onError={ () => {alert("error");} } />;
    }else{ 
        return (
       <Provider store={store}>
            <OverflowMenuProvider><TheMealsAppNavigator /></OverflowMenuProvider>
       </Provider>
        );
    }

}