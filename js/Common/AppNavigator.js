import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";
import HomePage from '../pages/HomePage';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import Page3 from "../pages/Page3";

import React from 'react';
import {Component} from 'react-native';


import Ionicons from 'react-native-vector-icons/Ionicons';

class TabBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime()
        };
    }
    render() {
        
        const {routes, index} = this.props.navigationState;
        //console.log('routes'+routes);
        const {theme} = routes[index].params;
        if (theme&&theme.updateTime>this.theme.updateTime) {
            this.theme = theme;
        }
        return <TabBarBottom 
            { ...this.props }
            activeTintColor={this.theme.tintColor||this.props.activeTintColor}
        />
    }
}

export const AppTabNavigator = TabNavigator({
    Page1:{
        screen: Page1,
        navigationOptions:{
            tabBarLabel:'Page1',
            tabBarIcon:({tintColor, focused})=>(
                <Ionicons 
                    name={focused ? 'ios-home' : 'ios-home-outline'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        }
    },
    Page2:{
        screen: Page2,
        navigationOptions:{
            tabBarLabel:'Page2',
            tabBarIcon:({tintColor, focused})=>(
                <Ionicons 
                    name={focused ? 'ios-people' : 'ios-people-outline'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        }
    },
    Page3:{
        screen: Page3,
        navigationOptions:{
            tabBarLabel:'Page3',
            tabBarIcon:({tintColor, focused})=>(
                <Ionicons 
                    name={focused ? 'ios-chatboxes' : 'ios-chatboxes-outline'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        }
    }
    

}, {
    tabBarComponent: TabBarComponent,
});

export const AppStackNavigator = StackNavigator  ({
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
            }
        }
    },
    TabNav:{
        screen: AppTabNavigator,
        navigationOptions:{
            title: 'this is a TabNavigator'
        }
    }
}, {
    navigationOptions: {

    }
});