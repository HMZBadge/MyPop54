import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";
import HomePage from '../pages/HomePage';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import Page3 from "../pages/Page3";
import FlatListDemo from "../pages/tableView/FlatListDemo"

import React from 'react';
import {Component} from 'react-native';


import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AppTableView from "../pages/AppTableView";
import SwipeableFlatListDemo from "../pages/tableView/SwipeableFlatListDemo";
import SectionListDemo from "../pages/tableView/SectionListDemo";

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
    tabBarOptions: {
        //activeTintColor: Platform.OS === 'ios' ? '#e91e61' : '#fff'
    }
});


export const AppStackNavigator = StackNavigator({
    HomePage: {
        screen: HomePage,
    },
    Page1: {
        screen: Page1,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.name}页面名`
        })
    },
    Page2: {
        screen: Page2,
        navigationOptions: {
            title: "Page3"
        }
    },
    Page3: {
        screen: Page3,
        navigationOptions: (props) => {
            const {navigation} = props;
            const {state, setParams} = navigation;
            const {params} = state;
            return {
                title: params.title ? params.title : 'This is Page3',
                headerRight: (
                    <Button
                        title={params.mode === 'edit' ? '保存' : '编辑'}
                        onPress={() => {
                            setParams({mode: params.mode === 'edit' ? "" : "edit"})
                        }}
                    />
                )
            }
        }
    },
    TabNav: {
        screen: AppTabNavigator,
        navigationOptions: {
            title: "This is TabNavigator"
        }
    },
    AppTableView: {
        screen: AppTableView,
        navigationOptions: {
            title: "this is test tableView"
        }
    },
    FlatListDemo: {
        screen: FlatListDemo,
        navigationOptions: {
            title: "this is FlatListDemo"
        }
    },
    SwipeableFlatListDemo: {
        screen: SwipeableFlatListDemo,
        navigationOptions: {
            title: "SwipeableFlatListDemo"
        }
    },
    SectionListDemo: {
        screen: SectionListDemo,
        navigationOptions: {
            title: "SectionListDemo"
        }
    }

    // DrawerNav: {
    //     screen: DrawerNav,
    //     navigationOptions: {
    //         title: "This is DrawerNavigator"
    //     }
    // },
}, {
    navigationOptions: {
        // header: null
    }
});