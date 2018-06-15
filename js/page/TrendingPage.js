import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Text,
    Navigator,
    Image,
    TouchableOpacity,
    FaltList
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import LanguageDao, { FLAG_LANGUAGE } from '../expand/dao/LanguageDao';
import { FLAG_TAB } from './HomePage';
import NavigationBar from '../Common/NavigationBar';
import ViewUtils from '../util/ViewUtils';

import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import BaseComponent from './BaseComponent';

export default class TrendingPage extends Component {
    constructor(props) {
        super(props);
        this.languagesDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
        this.state = {
            languages: [],
            inVisible: false,
            //timeSpan: timeSpan[0],
            theme: this.props.theme
        }
        this.loadLanguage();
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        //console.debug("这是在哪打印呢....");
        this.timer && clearTimeout(this.timer);
    }

    loadLanguage() {
        this.languagesDao.fetch().then((languages) => {
            if (languages) {
                console.log(languages);
                this.setState({
                    languages: languages,
                })
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    renderMoreView() {
        let params = { ...this.props, fromPage: FLAG_TAB.flag_popularTab }
        //return <MoreView>
    }

    renderTitleView() {
        return <View>
            <TouchableOpacity
                ref='button'
                underlayColor='transparent'
                onPress={() => this.showPopover()}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: 'red', fontWeight: '400' }}>
                        趋势{/*  {this.state.timeSpan.showText} */}
                    </Text>
                    <Image
                        style={{ width: 12, height: 12, marginLeft: 5 }}
                        source={require('../../res/images/ic_spinner_triangle.png')}
                    />
                </View>

            </TouchableOpacity>
        </View>
    }

    render() {
        var statusBar = {
            backgroundColor: this.state.theme.themeColor
        }
        let navigationBar =
            <NavigationBar
                titleView={this.renderTitleView()}
                statusBar={statusBar}
                style={this.state.theme.styles.navBar}
                rightButton={ViewUtils.getMoreButton(() => this.refs.moreMenu.open())}
            />;
        let timeSpanView = null;

        let content = null;
        if (this.state.languages.length > 0) {
            content = <ScrollableTabView
                tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                tabBarInactiveTextColor='mintcream'
                tabBarActiveTextColor='white'
                ref='scrollableTabView'
                tabBarBackgroundColor={this.state.theme.themeColor}
                initialPage={0}
                renderTabBar={ ()=> <ScrollableTabBar 
                    style={{height:40, borderWidth: 0, elevation: 2}}
                    tabStyle={{height:39}}/>
                }
            >
                {this.state.languages.map((result, i, arr) => {
                    let language = arr[i];
                    return language.checked ? <Text style={{backgroundColor: 'red'}}>{language.name}</Text> : null;

                })}
            </ScrollableTabView>
        }

        return (<View style={styles.container}>
            {navigationBar}
            {content}
            <Text style={styles.tips}>欢迎~~~~这是发展趋势2</Text>
            {timeSpanView}
            
        </View>);
    }

}

class TrendingTab extends BaseComponent {
    constructor(props) {
        super(props);
        this.isFavoriteChanged = false;
        this.state = {
            projectModels: [],
            isLoading: false,
            favoriteKeys:[]
        }
    }





    render() {
        return <View style={styles.container} >
            <FaltList 
                data={this.state.projectModels}
                renderItem={(data)=> this.renderRow(data)}
                keyExtractor={item => ""+(item.item.id || item.item.fullName)}
                refreshControl={
                    <RefreshControl 
                        title='Loading...'
                        titleColor={this.props.theme.themeColor}
                        colors={[this.props.theme.themeColor]}
                        refreshing={this.state.isLoading}
                        onRefresh={()=> this.onRefresh()}
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
        fontSize: 29,
        fontStyle: 'normal',
    }
})