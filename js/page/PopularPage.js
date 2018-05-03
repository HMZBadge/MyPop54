import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Text,
    Navigator,
    Image,
    DeviceEventEmitter,
    TouchableOpacity,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import BaseComponent from './BaseComponent';
import NavigationBar from '../Common/NavigationBar'
import NavigatorUtil from '../util/NavigatorUtil';
import ViewUtil from '../util/ViewUtils'
import { FLAG_TAB } from './HomePage';
import LanguageDao, { FLAG_LANGUAGE } from '../expand/dao/LanguageDao';

export default class PopularPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE, flag_key);
        this.state = {
            languages: [],
            theme: this.props.theme,
            customThemeViewVisible: false,
        }
        this.loadLanguage();
        //LanguageDao
    }

    loadLanguage() {
        this.languageDao.fatch().then((languages) => {
            if (languages) {
                this.setState({
                    languages: languages,
                });
            }
        }).catch((error) => {

        });
    }

    renderRightButton() {
        return <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
                onPress={() => {
                    NavigatorUtil.goToSearchPage(this.props);
                }}
            >
                <View>
                    <Image
                        style={{ width: 24, height: 24 }}
                        source={require('../../res/images/ic_search_white_48pt.png')}
                    />
                </View>
            </TouchableOpacity>
            {ViewUtil.getMoreButton(() => {
                //TODO
                //this.refs.moreMenu.open()
                console.log('哈哈');
            })}
        </View>
    }

    // renderMoreView() {
    //     let params = { ...this.props, fromPage: FLAG_TAB.flag_favoriteTab }
    //     return <moreMenu
    // }

    render() {
        var statusBar = {
            backgroundColor: this.state.theme.themeColor,
            barStyle: 'light-content',
        }
        var navigationBar =
            <NavigationBar
                title={'最热'}
                statusBar={statusBar}
                style={this.state.theme.styles.navBar}
                rightButton={this.renderRightButton()}
            />
        let content = this.state.languages.length > 0 ?
            <ScrollableTabView
                tabBarUnderlineStyle={{ backgroundColor: '#e7e7e7', height: 2 }}
                tabBarInactiveTextColor='mintcream'
                tabBarActiveTextColor='white'
                ref="scrollableTabView"
                tabBarBackgroundColor={this.state.theme.themeColor}
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar style={{ height: 40, borderWidth: 0, elevation: 2 }} tabStyle={{ height: 39 }} />}
            ></ScrollableTabView> : null;

        return (<View style={styles.container}>
            {navigationBar}
            {content}
            <Text style={styles.tips}>欢迎~~~~这是最热页</Text>
        </View>);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tips: {
        fontSize: 20,
        fontStyle: 'normal',
        marginLeft: 10,
        marginTop: 10,
    }
})