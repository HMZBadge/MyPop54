import { TabNavigator, TabBarBottom } from "react-navigation";

import React from 'react';
import { Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AppStackNavigator, AppStackNavigator2, AppStackNavigator3 } from "./AppNavigator";

// import HomePage from '../pages/HomePage';
// import Page1 from '../pages/Page1';
// import Page2 from '../pages/Page2';
// import Page3 from "../pages/Page3";





class TabBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime()
        };
    }

    render() {

        const { routes, index } = this.props.navigationState;
        let params = routes[index]['params'];
        var theme = '';
        if (params) {
            theme = params.theme;
        } else {
            theme = 'gray';
        }
        //const {theme} = routes[index].params;
        if (theme && theme.updateTime > this.theme.updateTime) {
            this.theme = theme;
        }
        return <TabBarBottom
            {...this.props}
            activeTintColor={this.theme.tintColor || this.props.activeTintColor}
        />
    }
}

export const AppMainTabbar = TabNavigator({
    Page1: {
        screen: AppStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Page1',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={focused ? 'ios-home' : 'ios-home-outline'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        }
    },
    Page2: {
        screen: AppStackNavigator2,
        navigationOptions: {
            tabBarLabel: 'Page2',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={focused ? 'ios-people' : 'ios-people-outline'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        }
    },
    Page3: {
        screen: AppStackNavigator3,
        navigationOptions: {
            tabBarLabel: 'Page3',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={focused ? 'ios-chatboxes' : 'ios-chatboxes-outline'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        }
    }


}, {
        tabBarComponent: TabBarComponent,
        tabBarOptions: {
            //activeTintColor: Platform.OS === 'ios' ? '#e91e61' : '#fff'
        }
    });

