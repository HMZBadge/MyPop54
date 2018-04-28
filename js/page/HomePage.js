import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Text,
    Navigator,
    Image,
    DeviceEventEmitter
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Toast, { DURATION } from "react-native-easy-toast";

export const ACTION_HOME = {
    A_SHOW_TOAST: 'showToast', A_RESTART: 'restart', A_THEME: 'theme',
    A_HOME_TAB_SELECT: 'home_tab_select'
};
export const FLAG_TAB = {
    flag_popularTab: 'tb_popular',
    flag_trendingTab: 'tb_trending',
    flag_favoriteTab: 'tb_favorite',
    flag_my: 'tb_my'
};
export const EVENT_TYPE_HOME_TAB_SELECT = "home_tab_select";

import ThemeFactory, { ThemeFlags } from '../../res/styles/ThemeFactory';
import BaseComponent from './BaseComponent';
import NavigatorUtil from '../util/NavigatorUtil';
import SafeAreaViewPlus from '../Common/SafeAreaViewPlus'
import PopularPage from './PopularPage';
import TrendingPage from './TrendingPage';
import FavoritePage from './FavoritePage';
import MyPage from './my/MyPage';

export default class HomePage extends BaseComponent {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        let selectedTab = this.params.selectedTab ? this.params.selectedTab : FLAG_TAB.flag_popularTab;
        this.state = {
            selectedTab: selectedTab,
            theme: this.params.theme || ThemeFactory.createTheme(ThemeFlags.Default)
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this.listener = DeviceEventEmitter.addListener('ACTION_HOME', (action, params) => this.onBaseAction(action, params));
    }

    /**
     * 通知回调事件处理
     */
    onAction(action, params) {
        if (ACTION_HOME.A_RESTART === action) {
            this.onRestart(params);
        } else if (ACTION_HOME.A_SHOW_TOAST === action) {
            this.toast.show(params.text, DURATION.LENGTH_LONG);
        }
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        if (this.listener) {
            this.listener.remove();
        }
    }


    /**
     * 重启首页
     */
    onRestart(jumpToTab) {
        NavigatorUtil.resetToHomePage({
            ...this.params,
            selectedTab: jumpToTab,
            navigation: this.props.navigation
        })
    }

    
    _renderTab(Component, selectedTab, title, renderIcon) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                selectedTitleStyle={this.state.theme.styles.selectedTitleStyle}
                title={title}
                renderIcon={() => <Image style={styles.image}
                                         source={renderIcon}/>}
                renderSelectedIcon={() => <Image style={[styles.image, this.state.theme.styles.tabBarSelectedIcon]}
                                                 source={renderIcon}/>}
                onPress={() => this.onTabClick(this.state.selectedTab, selectedTab)}
            >
                <Component {...this.props} theme={this.state.theme}/>
            </TabNavigator.Item>
        )
    }


    render() {
        const Root = <SafeAreaViewPlus
            topColor={this.state.theme.themeColor}
            bottomInset={false}
        >
            <TabNavigator>
                {this._renderTab(PopularPage, FLAG_TAB.flag_popularTab, '最热', require('../../res/images/ic_polular.png'))}
                {this._renderTab(TrendingPage, FLAG_TAB.flag_trendingTab, '趋势', require('../../res/images/ic_trending.png'))}
                {this._renderTab(FavoritePage, FLAG_TAB.flag_favoriteTab, '收藏', require('../../res/images/ic_favorite.png'))}
                {this._renderTab(MyPage, FLAG_TAB.flag_my, '我的', require('../../res/images/ic_my.png'))}
            </TabNavigator>
            <Toast ref={(toast) => this.toast = toast} />
        </SafeAreaViewPlus>
        return Root;
    }

    onTabClick(from, to) {
        this.setState({selectedTab: to})
        DeviceEventEmitter.emit(EVENT_TYPE_HOME_TAB_SELECT, from, to);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: 26,
        width: 26,
    }
});
