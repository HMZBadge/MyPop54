import React from 'react';
import {StackNavigator} from 'react-navigation';

import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import CustomKeyPage from '../page/my/CustomKeyPage';
import MyPage from '../page/my/MyPage';
import AppTableView from '../pages/AppTableView';
import HomePageTest from '../pages/HomePageTest';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import Page3 from '../pages/Page3';
import FlatListDemo from '../pages/tableView/FlatListDemo';
import SwipeableFlatListDemo from '../pages/tableView/SwipeableFlatListDemo';
import SectionListDemo from '../pages/tableView/SectionListDemo';
import { AppTabNavigator } from '../Common/AppNavigator';
import FavoritePage from '../page/FavoritePage';


export default AppNavigator = StackNavigator({
    WelcomePage: {
        screen: WelcomePage,
    },
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null
        }
    },
    MyPage: {
        screen: MyPage,
    },
    FavoritePage: {
        screen: FavoritePage
    },
    CustomKeyPage: {
        screen: CustomKeyPage,
        navigationOptions: {
            backgroundColor: 'red',
        }
    },
    HomePageTest: {
        screen: HomePageTest,
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




}, {
    navigationOptions: {
        
    }
})