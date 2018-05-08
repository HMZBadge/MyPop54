import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Text,
    Navigator,
    Image,
    DeviceEventEmitter,
    TouchableOpacity,
    FlatList,
    RefreshControl
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import BaseComponent from './BaseComponent';
import NavigationBar from '../Common/NavigationBar'
import NavigatorUtil from '../util/NavigatorUtil';
import ViewUtil from '../util/ViewUtils'
import { FLAG_TAB } from './HomePage';
import LanguageDao, { FLAG_LANGUAGE } from '../expand/dao/LanguageDao';

import RepositoryCell from '../Common/RepositoryCell';
import DataRepository, { FLAG_STORAGE } from '../expand/dao/DataRepository';
import FavoriteDao from '../expand/dao/FavoriteDao';
import ProjectModel from '../model/ProjectModel';
import Utils from '../util/Utils';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
var favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
var dataRepository = new DataRepository(FLAG_STORAGE.flag_popular);

export default class PopularPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
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
                renderTabBar={() => <ScrollableTabBar style={{ height: 40, borderWidth: 1, elevation: 2 }} tabStyle={{ height: 39 }} />}
            >
                {this.state.languages.map((result, i, arr) => {
                    let language = arr[i];
                    return language.checked ? <PopularTab key={i} tabLabel={language.name} {...this.props} /> : null;
                })}

            </ScrollableTabView> : null;

        return (<View style={styles.container}>
            {navigationBar}
            {content}
        </View>);
    }
}


class PopularTab extends BaseComponent {
    constructor(props) {
        super(props);
        this.isFavoriteChanged = false;
        this.state = {
            projectModels: [],
            isLoading: false,
            favoriteKeys: [],
            theme: this.props.theme
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this.listener = DeviceEventEmitter.addListener('favoriteChanged_popular', () => {
            this.isFavoriteChanged = true;
        });
        this.loadData();
    }

    /**
     * 更新ProjectItem的Favorite状态
     */
    flushFavoriteState() {
        let projectModels = [];
        let items = this.items;
        for (let i = 0, len = items.length; i < len; i++) {
            projectModels.push(new ProjectModel(items[i], Utils.checkFavorite(items[i], this.state.favoriteKeys)));
        }
        this.updateState({
            isLoading: false,
            isLoadingFail: false,
            projectModels: projectModels,
        });
    }

    getFavoriteKeys() {
        favoriteDao.getFavoriteKeys().then((keys) => {
            if (keys) {
                this.updateState({ favoriteKeys: keys });
            }
            this.flushFavoriteState();
        }).catch((error) => {
            this.flushFavoriteState();
            console.error(error);
        })
    }

    updateState(dic) {
        if (!this) return;
        this.setState(dic);
    }

    loadData() {
        this.updateState({
            isLoading: true,
        })
        let url = this.genFetchUrl(this.props.tabLabel);
        dataRepository.fetchRepository(url).then(result => {
            this.items = result && result.items ? result.items : result ? result : [];
            this.getFavoriteKeys();
            if (result && result.update_date && !Utils.checkDate(result.update_date)) return
            dataRepository.fetchNetReponsitory(url);

        }).then((items) => {
            if (!items || items.length === 0) return;
            this.items = items;
            //this.getFa
        }).catch(error => {
            console.error(error);
            this.updateState({
                isLoading: false
            })
        })
    }

    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }

    renderRow(data) {
        const projectModel = data.item;
        return <RepositoryCell
            key={projectModel.item.id}
            projectModel={projectModel}
            theme={this.props.theme}
            // onSelect={()=> ActionUtils.onSelectRepository({
            //     projectModel: projectModel,
            //     flag: FLAG_STORANGE.flag_popular,
            //     ...this.props,
            //     onUpdateFavorite: () => this.onUpdateFavorite(),
            // })}
            onFavorite={(item, isFavorite) => ActionUtils.onFavorite(favoriteDao, item, isFavorite)}
        />
    }

    render() {
        return <View style={styles.container}>
            <FlatList
                data={this.state.projectModels}
                renderItem={(data) => this.renderRow(data)}
                keyExtractor={item => "" + item.item.id}
                refreshControl={
                    <RefreshControl
                        title='Loading...'
                        titleColor={this.props.theme.themeColor}
                        colors={[this.props.theme.themeColor]}
                        refreshing={this.state.isLoading}
                        onRefresh={() => this.loadData()}
                        tintColor={this.props.theme.themeColor}
                    />
                }
            />
        </View>
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