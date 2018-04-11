import { StackNavigator } from "react-navigation";
import HomePage from '../pages/HomePage';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import Page3 from "../pages/Page3";

import React from 'react';
import Button from 'react-native';

export const AppStackNavigator = StackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            title: 'HomePage',
        }
    },
    Page1: {
        screen: Page1,
        
        navigationOptions:{
            title: 'Page1'
            //header: null
        }
    },
    Page2: {
        screen: Page2,
        navigationOptions: {
            title: 'Page2'
        }
    },
    Page3: {
        screen: Page3,
        navigationOptions: (props)=> {
            const {navigation}=props;
            const {state, setParams}=navigation;
            const {params}=state;
            return {
                title:params.title ? params.title : 'This is Page3',
                headerRight: (
                    <Button 
                       
                    />
                )
            }
        }

    }
    


}

);